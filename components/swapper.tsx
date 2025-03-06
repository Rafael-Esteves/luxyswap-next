"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Coin } from "@/types/Coin";
import coinMetadata from "@/public/coin-icons/metadata.json";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Input } from "./ui/input";
import { useSwapStore } from "@/store/use-swap-store";
import { usePairData } from "@/hooks/use-pair-data";

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
  const [openAddress, setOpenAddress] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinIcons, setCoinIcons] = useState<{
    [key: string]: { content: string; isSvg: boolean };
  }>({});
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [fromSearchTerm, setFromSearchTerm] = useState("");

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
  const { pairData, isLoading } = usePairData(fromCoinName, toCoinName);

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
  };

  const handleToFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (toValue === "0.00") {
      setToCoin(toCoinName, "");
    }
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

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumericInput(e.target.value);
    setFromCoin(fromCoinName, formatted);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumericInput(e.target.value);
    setToCoin(toCoinName, formatted);
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
            <div className="w-full text-xs text-white/70 px-2">
              <span>Min: {pairData.min} {fromCoinName}</span>
              <span className="float-right">Max: {pairData.max} {fromCoinName}</span>
            </div>
          )}
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
              <div className="flex justify-end px-4">
                <span className="font-medium text-sm font-gravesend">
                  TAXAS: 5%
                </span>
              </div>
              <div className="bg-[#D9D9D94D] rounded-full w-full p-2 flex items-center justify-between">
                <Input
                  placeholder={`YOUR ${toCoinName} ADDRESS`}
                  value={ethAddress}
                  onChange={(e) => setEthAddress(e.target.value)}
                  className="font-medium bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 font-scandia uppercase text-base tracking-tighter select-none text-white"
                />
                <Link href="/swap">
                  <Image
                    src="/icons/arrow-btn-purple.svg"
                    className="cursor-pointer"
                    alt=""
                    width={87}
                    height={49}
                  />
                </Link>
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
              onClick={() => setOpenAddress(true)}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-transparent rounded-full h-16 w-2/3 mt-2"
              )}
            >
              <span className="text-xl lg:text-2xl font-gravesend font-bold">
                SWAP
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
