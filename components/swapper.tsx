"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Coin } from "@/types/Coin";
import coinMetadata from '@/public/coin-icons/metadata.json';

export function Swapper() {
  const [fromValue, setFromValue] = useState("0.00");
  const [toValue, setToValue] = useState("0.00");
  const [openAddress, setOpenAddress] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [fromCoin, setFromCoin] = useState({
    coin: "BTC",
    icon: "",
    isSvg: true,
  });
  const [toCoin, setToCoin] = useState({ coin: "ETH", icon: "", isSvg: true });
  const [coinIcons, setCoinIcons] = useState<{
    [key: string]: { content: string; isSvg: boolean };
  }>({});

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
          content: `/coin-icons/${(meta as {fileName: string}).fileName}`,
          isSvg: (meta as {isSvg: boolean}).isSvg
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
        className="size-10 lg:size-20"
      />
    );
  };

  const renderCoinOptions = (onSelect: (coin: string) => void) => {
    return coins.map((coin, index) => (
      <DropdownMenuLabel
        key={`${coin.coin}-${index}`}
        onClick={() => onSelect(coin.coin)}
        className="flex items-center cursor-pointer justify-center gap-2 hover:bg-white/10"
      >
        {renderIcon(coin.coin)}
        <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white">
          {coin.coin}
        </span>
      </DropdownMenuLabel>
    ));
  };

  return (
    <div className="select-none flex flex-col gap-2 items-center relative">
      <div className="bg-[#D9D9D9]/15 flex flex-col items-start justify-start gap-4 py-5 lg:pb-20 lg:px-12 px-5 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px]">
        <span className="font-scandia text-xs lg:text-xl">De</span>
        <div className="flex items-center justify-between">
          <DropdownMenu
            open={fromDropdownOpen}
            onOpenChange={setFromDropdownOpen}
          >
            <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
              {renderIcon(fromCoin.coin)}
              <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white">
                {fromCoin.coin}
              </span>
              <ChevronDown className="size-4 lg:size-8 mt-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 lg:px-12 px-5 rounded-3xl max-w-72 lg:max-w-[590px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {renderCoinOptions((coin) => {
                setFromCoin({
                  coin,
                  icon: coinIcons[coin].content,
                  isSvg: coinIcons[coin].isSvg,
                });
                setFromDropdownOpen(false);
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white"
          />
        </div>
      </div>
      <div className="p-5 rounded-full bg-[#D9D9D9]/15 backdrop-blur-lg absolute top-[35%] z-10">
        <ArrowUpDown className="text-white" />
      </div>

      <div className="bg-purple-gradient flex flex-col items-start justify-start gap-4 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px] px-5 pb-5">
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
                {renderIcon(toCoin.coin)}
                <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white">
                  {toCoin.coin}
                </span>
                <ChevronDown className="size-4 lg:size-8 mt-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 lg:px-12 px-5 rounded-3xl lg:rounded-[50px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {renderCoinOptions((coin) => {
                  setToCoin({
                    coin,
                    icon: coinIcons[coin].content,
                    isSvg: coinIcons[coin].isSvg,
                  });
                  setToDropdownOpen(false);
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
