import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Swapper() {
  return (
    <div className="select-none flex flex-col gap-2 items-center">
      <div className="bg-[#D9D9D9]/15 flex flex-col items-start justify-start gap-4 py-5 pb-20 px-12 rounded-[50px]">
        <span className="font-scandia text-xl">De</span>
        <div className="flex items-center justify-between gap-28">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
              <Image width={80} height={80} className="size-20" src="/icons/btc.svg" alt="" />
              <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                BTC
              </span>
              <ChevronDown className="size-8 mt-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 py-5 px-12 rounded-[50px]">
              <DropdownMenuLabel className="flex items-center cursor-pointer justify-center gap-2">
                <Image width={80} height={80} className="size-20" src="/icons/btc.svg" alt="" />
                <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                  BTC
                </span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white">
            0.00
          </span>
        </div>
      </div>
      <div className="bg-purple-gradient flex flex-col items-start justify-start gap-4 py-5 pb-20 px-12 rounded-[50px]">
        <span className="font-scandia text-xl">Para</span>
        <div className="flex items-center justify-between gap-28">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex items-center justify-center gap-2">
                <Image width={80} height={80} className="size-20" src="/icons/eth.svg" alt="" />
                <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                  ETH
                </span>
              <ChevronDown className="size-8 mt-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#D9D9D9]/20 w-full border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex flex-col items-start justify-start gap-4 py-5 px-12 rounded-[50px]">
              <DropdownMenuLabel className="flex items-center cursor-pointer justify-center gap-2">
                <Image width={80} height={80} className="size-20" src="/icons/eth.svg" alt="" />
                <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                  ETH
                </span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="font-bold font-gravesend text-5xl tracking-[-2%] select-none text-white">
            0.00
          </span>
        </div>
      </div>
      <Link href='/swap' className={cn(buttonVariants({ variant: 'outline' }), "bg-transparent rounded-full h-16 w-2/3 mt-2")}>
        <span className="text-2xl font-gravesend font-bold">SWAP</span>
      </Link>
    </div>
  );
}
