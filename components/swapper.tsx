"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";

export function Swapper() {
  const [fromValue, setFromValue] = useState("0.00");
  const [toValue, setToValue] = useState("0.00");

  const [openAddress, setOpenAddress] = useState(false);
  return (
    <div className="select-none flex flex-col gap-2 items-center">
      <div className="bg-[#D9D9D9]/15 flex flex-col items-start justify-start gap-4 py-5 lg:pb-20 lg:px-12 px-5 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px]">
        <span className="font-scandia text-xs lg:text-xl">De</span>
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
              <Image
                width={80}
                height={80}
                className="size-10 lg:size-20"
                src="/icons/btc.svg"
                alt=""
              />
              <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                BTC
              </span>
              <ChevronDown className="size-4 lg:size-8 mt-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 lg:px-12 px-5 rounded-3xl  max-w-72 lg:max-w-[590px]">
              <DropdownMenuLabel className="flex items-center cursor-pointer justify-center gap-2">
                <Image
                  width={80}
                  height={80}
                  className="size-10 lg:size-20"
                  src="/icons/btc.svg"
                  alt=""
                />
                <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                  BTC
                </span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white"
          />
        </div>
      </div>
      <div
        className="bg-purple-gradient flex flex-col items-start justify-start gap-4 rounded-3xl lg:rounded-[50px] max-w-72 lg:max-w-[509px] px-5 pb-5"
      >
        <div className={cn("py-5 lg:px-12 px-5 flex flex-col items-start gap-4", openAddress ? 'lg:pb-10' : 'lg:pb-20')}>
          <span className="font-scandia text-xs lg:text-xl">Para</span>
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
                <Image
                  width={80}
                  height={80}
                  className="size-10 lg:size-20"
                  src="/icons/eth.svg"
                  alt=""
                />
                <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                  ETH
                </span>
                <ChevronDown className="size-4 lg:size-8 mt-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 lg:px-12 px-5 rounded-3xl lg:rounded-[50px]">
                <DropdownMenuLabel className="flex items-center cursor-pointer justify-center gap-2">
                  <Image
                    width={80}
                    height={80}
                    className="size-10 lg:size-20"
                    src="/icons/eth.svg"
                    alt=""
                  />
                  <span className="font-bold font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                    ETH
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="font-bold w-[30%] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 font-gravesend text-xl lg:text-5xl tracking-tighter select-none text-white"
            />
          </div>
        </div>
        {openAddress && (
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: openAddress ? 1 : 0, y: openAddress ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col gap-2 items-end justify-end w-full"
        >
            <span className="font-medium text-sm font-gravesend mr-10">
              TAXAS: 5%
            </span>
            <div className="bg-[#D9D9D94D] rounded-full w-full p-2 flex items-center justify-between">
              <Input
                placeholder="YOUR ETH ADRESS"
                className="font-medium bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 font-scandia uppercase text-base tracking-tighter select-none text-white"
              />

              <Image
                src="/icons/arrow-btn-purple.svg"
                className="cursor-pointer"
                alt=""
                width={87}
                height={49}
              />
            </div>
            </motion.div>
        )}
       </div>
      {!openAddress && (
        <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: openAddress ? 0 : 1, y: openAddress ? 50 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full"
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
    </div>
  );
}
