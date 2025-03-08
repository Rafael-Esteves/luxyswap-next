"use client";

import { ArrowUpDown, ChevronDown, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Coin } from "@/types/Coin";
import coinMetadata from "@/public/coin-icons/metadata.json";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Input } from "./ui/input";
import { useSwapStore } from "@/store/use-swap-store";
import { usePairData } from "@/hooks/use-pair-data";
import { useShift } from "@/hooks/use-shift";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import React from "react";

const formatNumericInput = (value: string) => {
  // Remove all characters except numbers and dots
  let formatted = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = formatted.split('.');
  if (parts.length > 2) {
    formatted = parts[0] + '.' + parts.slice(1).join('');
  }
  
  return formatted;
};

export function Swapper() {
  const router = useRouter();
  const [openAddress, setOpenAddress] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinIcons, setCoinIcons] = useState<{
    [key: string]: { content: string; isSvg: boolean };
  }>({});
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [updateDirection, setUpdateDirection] = useState<'from' | 'to'>('from');

  const {
    fromCoin: { coin: fromCoinName, value: fromValue },
    toCoin: { coin: toCoinName, value: toValue },
    ethAddress,
    setFromCoin,
    setToCoin,
    setEthAddress,
  } = useSwapStore();

  const fromFontSize = useDynamicFontSize(fromValue, 4);
  const toFontSize = useDynamicFontSize(toValue, 4);
  
  // Use our enhanced hooks
  const { 
    pairData, 
    isLoading: isPairLoading, 
    error: pairError,
    calculateSettleAmount,
    calculateDepositAmount
  } = usePairData(fromCoinName, toCoinName);
  
  const {
    quote,
    isQuoteLoading,
    quoteError,
    shift,
    isShiftLoading,
    shiftError,
    getQuote,
    createShift
  } = useShift();

  // Fetch coins on initial load
  useEffect(() => {
    const fetchCoins = async () => {
      await fetch("/api/sideshift/coins")
        .then((res) => res.json())
        .then((data) => {
          const mergedCoins: Coin[] = data.flat();
          setCoins(mergedCoins);
        });
    };

    fetchCoins();
  }, []);

  // Load coin icons
  useEffect(() => {
    const loadIcons = async () => {
      const icons: typeof coinIcons = {};
      for (const [coin, meta] of Object.entries(coinMetadata)) {
        icons[coin] = {
          content: `/coin-icons/${(meta as { fileName: string }).fileName}`,
          isSvg: (meta as { isSvg: boolean }).isSvg,
        };
      }
      setCoinIcons(icons);
    };

    loadIcons();
  }, []);

  // First effect: Calculate values based on pair data and user input
  useEffect(() => {
    // Skip if we don't have pair data or no direction is set
    if (!pairData || !updateDirection) return;
    
    // Skip during active quote loading to prevent loops
    if (isQuoteLoading) return;
    
    // Skip empty values or default values
    if (updateDirection === 'from') {
      // Only calculate to value when from value changes and is valid
      if (fromValue && fromValue !== "0.00") {
        const numFromValue = Number(fromValue);
        if (!isNaN(numFromValue) && numFromValue > 0) {
          const calculatedToValue = calculateSettleAmount(fromValue);
          // Only update if different to avoid loops
          if (toValue !== calculatedToValue) {
            setToCoin(toCoinName, calculatedToValue);
          }
        }
      }
    } else if (updateDirection === 'to') {
      // Only calculate from value when to value changes and is valid
      if (toValue && toValue !== "0.00") {
        const numToValue = Number(toValue);
        if (!isNaN(numToValue) && numToValue > 0) {
          const calculatedFromValue = calculateDepositAmount(toValue);
          // Only update if different to avoid loops
          if (fromValue !== calculatedFromValue) {
            setFromCoin(fromCoinName, calculatedFromValue);
          }
        }
      }
    }
  }, [pairData, updateDirection, fromCoinName, toCoinName, fromValue, toValue, calculateSettleAmount, calculateDepositAmount, setFromCoin, setToCoin, toValue, isQuoteLoading]);

  // Second effect: Handle quote fetching with debounce
  useEffect(() => {
    
    // Skip if necessary data is missing
    if (!pairData) return;
    if (!updateDirection) return;
    
    // Only proceed with valid values
    const numFromValue = Number(fromValue);
    const numToValue = Number(toValue);
    
    // Determine if we should get a quote based on the update direction
    const shouldGetQuote = 
      (updateDirection === 'from' && !isNaN(numFromValue) && numFromValue > 0) ||
      (updateDirection === 'to' && !isNaN(numToValue) && numToValue > 0);
    
    if (!shouldGetQuote) return;
    
    console.log(`Preparing to get quote: direction=${updateDirection}, fromValue=${fromValue}, toValue=${toValue}`);
    
    // Setup debounce timer
    const timer = setTimeout(() => {
      console.log(`Fetching quote after debounce: direction=${updateDirection}, fromValue=${fromValue}, toValue=${toValue}`);
      
      if (updateDirection === 'from') {
        // Only request if within limits
        if (numFromValue >= Number(pairData.min) && numFromValue <= Number(pairData.max)) {
          getQuote({
            depositCoin: fromCoinName,
            settleCoin: toCoinName,
            depositAmount: fromValue,
            settleAmount: "",
            depositNetwork: pairData?.depositNetwork || "",
            settleNetwork: pairData?.settleNetwork || ""
          });
        }
      } else if (updateDirection === 'to') {
        getQuote({
          depositCoin: fromCoinName,
          settleCoin: toCoinName,
          depositAmount: "",
          settleAmount: toValue,
          depositNetwork: pairData?.depositNetwork || "",
          settleNetwork: pairData?.settleNetwork || ""
        });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [fromCoinName, toCoinName, fromValue, toValue, updateDirection, pairData, getQuote]);

  // Use separate functions with refs to track last input
  const lastFromValueRef = React.useRef(fromValue);
  const lastToValueRef = React.useRef(toValue);
  
  // Handle input changes with manual update direction tracking
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumericInput(e.target.value);
    // Only update if the value actually changed
    if (formatted !== lastFromValueRef.current) {
      lastFromValueRef.current = formatted;
      setFromCoin(fromCoinName, formatted);
      setUpdateDirection('from');
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumericInput(e.target.value);
    // Only update if the value actually changed
    if (formatted !== lastToValueRef.current) {
      lastToValueRef.current = formatted;
      setToCoin(toCoinName, formatted);
      setUpdateDirection('to');
    }
  };

  // Handle shift creation response
  useEffect(() => {
    if (shift && shift.id) {
      // Redirect to the swap confirmation page
      router.push(`/swap?id=${shift.id}`);
    }
  }, [shift, router]);

  const renderIcon = (coin: string) => {
    return (
      <img
        src={`/coin-icons/${coin.toLowerCase()}.svg`}
        alt={`${coin} icon`}
        className="size-6 lg:size-10"
      />
    );
  };

  const renderCoinOptions = (
    onSelect: (coin: string) => void,
    searchTerm: string = ""
  ) => {
    const filteredCoins = coins.filter((coin) =>
      coin.coin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredCoins.map((coin, index) => (
      <DropdownMenuLabel
        key={`${coin.coin}-${index}`}
        onClick={() => onSelect(coin.coin)}
        className="flex items-center cursor-pointer justify-center gap-2 hover:bg-white/10 py-2"
      >
        {renderIcon(coin.coin)}
        <span className="font-bold font-gravesend text-lg lg:text-3xl tracking-tighter select-none text-white">
          {coin.coin}
        </span>
      </DropdownMenuLabel>
    ));
  };

  const handleFromFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (fromValue === "0.00") {
      setFromCoin(fromCoinName, "");
    }
    setUpdateDirection('from');
  };

  const handleToFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (toValue === "0.00") {
      setToCoin(toCoinName, "");
    }
    setUpdateDirection('to');
  };

  const handleFromBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (fromValue === "") {
      setFromCoin(fromCoinName, "0.00");
    }
  };

  const handleToBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (toValue === "") {
      setToCoin(toCoinName, "0.00");
    }
  };

  const handleSwapClick = () => {
    // First check if we have a valid input amount
    if (fromValue === "0.00" || fromValue === "") {
      // Could add error state/message here about invalid amount
      return;
    }

    // Check if pair data is still loading
    if (isPairLoading) {
      // Could add error state/message about waiting for pair data
      return;
    }

    // Ensure we have valid pair data before proceeding
    if (!pairData) {
      // Could add error state/message about invalid trading pair
      return;
    }
    
    // Safely check min/max range
    const numFromValue = Number(fromValue);
    const minValue = Number(pairData.min);
    const maxValue = Number(pairData.max);

    if (isNaN(numFromValue) || isNaN(minValue) || isNaN(maxValue)) {
      // Could add error state/message about invalid numbers
      return;
    }

    if (numFromValue < minValue || numFromValue > maxValue) {
      // Could add error state/message about amount being outside allowed range
      return;
    }
    
    // Get a fresh quote before showing the address field
    getQuote({
      depositCoin: fromCoinName, 
      settleCoin: toCoinName, 
      depositAmount: fromValue,
      settleAmount: "",
      depositNetwork: pairData.depositNetwork || "",
      settleNetwork: pairData.settleNetwork || ""
    });

    // If all validations pass, show the address field
    setOpenAddress(true);
  };

  const handleArrowClick = async () => {
    if (!ethAddress || ethAddress.trim() === '') {
      // Show error about missing address
      return;
    }
    
    // Create the shift with correctly named parameters
    await createShift({
      depositCoin: fromCoinName,
      settleCoin: toCoinName,
      depositAmount: fromValue,
      settleAddress: ethAddress,
      depositNetwork: pairData?.depositNetwork || "",
      settleNetwork: pairData?.settleNetwork || ""
    });
  };

  const SwapErrorDisplay = () => {
    if (pairError) return <p className="text-red-500 text-xs mt-1">{pairError}</p>;
    if (quoteError) return <p className="text-red-500 text-xs mt-1">{quoteError}</p>;
    if (shiftError) return <p className="text-red-500 text-xs mt-1">{shiftError}</p>;
    return null;
  };

  return (
    <div className="select-none flex flex-col gap-2 items-center relative">
      <div>
        <div className="bg-[#D9D9D9]/15 flex flex-col items-start justify-start gap-4 py-5 lg:pb-20 lg:px-12 px-5 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px]">
          <span className="font-scandia text-xs lg:text-xl">De</span>
          <div className="flex items-center justify-between">
            <DropdownMenu
              open={fromDropdownOpen}
              onOpenChange={setFromDropdownOpen}
            >
              <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
                {renderIcon(fromCoinName)}
                <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white">
                  {fromCoinName}
                </span>
                <ChevronDown className="size-4 lg:size-8 mt-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#000000]/80 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-2 lg:px-8 px-4 rounded-3xl max-w-80 lg:max-w-[650px] max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="sticky top-0 p-2 bg-[#000000]/95 z-10 w-full">
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={fromSearchTerm}
                    onChange={(e) => setFromSearchTerm(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder:text-white/50 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                {renderCoinOptions((coin) => {
                  setFromCoin(coin, fromValue);
                  setFromDropdownOpen(false);
                  setFromSearchTerm("");
                }, fromSearchTerm)}
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              value={fromValue}
              onChange={handleFromChange}
              onFocus={handleFromFocus}
              onBlur={handleFromBlur}
              className={cn(
                "font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 font-gravesend tracking-tighter select-none text-white transition-all duration-200",
                `text-xl lg:text-${fromFontSize}`
              )}
            />
          </div>
          {pairData && (
            <div className="w-full text-xs text-white/70 px-2 flex justify-between">
              <span>Min: {pairData.min} {fromCoinName}</span>
              <span>Max: {pairData.max} {fromCoinName}</span>
            </div>
          )}
          {isPairLoading && <div className="text-xs text-white/70 animate-pulse">Loading pair data...</div>}
          <SwapErrorDisplay />
        </div>
        <div className="justify-center flex items-center relative w-full">
          <div className="p-5 rounded-full bg-[#D9D9D9]/15 backdrop-blur-lg absolute z-10">
            <ArrowUpDown className="text-white h-auto w-auto" />
          </div>
        </div>
      </div>

      <motion.div
        className="bg-purple-gradient flex flex-col items-start justify-start gap-4 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px] px-5 pb-5"
        animate={{
          height: openAddress ? "auto" : "initial",
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <div
          className={cn(
            "py-5 lg:px-12 px-5 flex flex-col items-start gap-4",
            openAddress ? "lg:pb-10" : "lg:pb-20"
          )}
        >
          <span className="font-scandia text-xs lg:text-xl">Para</span>
          <div className="flex items-center justify-between">
            <DropdownMenu
              open={toDropdownOpen}
              onOpenChange={setToDropdownOpen}
            >
              <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
                {renderIcon(toCoinName)}
                <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white">
                  {toCoinName}
                </span>
                <ChevronDown className="size-4 lg:size-8 mt-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#000000]/80 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-2 lg:px-8 px-4 rounded-3xl lg:rounded-[50px] max-h-[400px] max-w-80 lg:max-w-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="sticky top-0 p-2 bg-[#000000]/95 z-10 w-full">
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={toSearchTerm}
                    onChange={(e) => setToSearchTerm(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder:text-white/50 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                {renderCoinOptions((coin) => {
                  setToCoin(coin, toValue);
                  setToDropdownOpen(false);
                  setToSearchTerm("");
                }, toSearchTerm)}
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              value={toValue}
              onChange={handleToChange}
              onFocus={handleToFocus}
              onBlur={handleToBlur}
              className={cn(
                "font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 font-gravesend tracking-tighter select-none text-white transition-all duration-200",
                `text-xl lg:text-${toFontSize}`
              )}
            />
          </div>
        </div>

        <AnimatePresence>
          {openAddress && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full space-y-4 pb-4"
            >
              <div className="flex justify-between px-4 text-sm font-gravesend">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        <span>Rate:</span>
                        <Info className="h-3 w-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exchange rate between currencies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>
                  1 {fromCoinName} = {quote?.rate || pairData?.rate || "..."} {toCoinName}
                </span>
              </div>
              
              <div className="flex justify-between px-4 text-sm font-gravesend">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        <span>Network Fee:</span>
                        <Info className="h-3 w-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Blockchain network transaction fee</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>
                  {pairData?.depositNetworkFee || "Varies"} {fromCoinName}
                </span>
              </div>
              
              <div className="bg-[#D9D9D94D] rounded-full w-full p-2 flex items-center justify-between">
                <Input
                  placeholder={`YOUR ${toCoinName} ADDRESS`}
                  value={ethAddress}
                  onChange={(e) => setEthAddress(e.target.value)}
                  className="font-medium bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 font-scandia uppercase text-base tracking-tighter select-none text-white"
                />
                <Button
                  onClick={handleArrowClick}
                  disabled={isShiftLoading || !ethAddress || ethAddress.trim() === ''}
                  className="bg-transparent border-none p-0 m-0"
                >
                  {isShiftLoading ? (
                    <div className="animate-spin size-6 rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Image
                      src="/icons/arrow-btn-purple.svg"
                      className="cursor-pointer"
                      alt="Create Shift"
                      width={87}
                      height={49}
                    />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {!openAddress && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            <Button
              onClick={handleSwapClick}
              disabled={isQuoteLoading || isPairLoading || fromValue === "0.00"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-transparent rounded-full h-16 w-2/3 mt-2"
              )}
            >
              {isPairLoading || isQuoteLoading ? (
                <div className="animate-spin size-6 rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <span className="text-xl lg:text-2xl font-gravesend font-bold">
                  SWAP
                </span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
