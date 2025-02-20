'use client'

import { Navbar } from "@/components/navbar";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSwapStore } from "@/store/use-swap-store";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { fromCoin, toCoin, ethAddress } = useSwapStore();

  // console.log("Swap Details:", {
  //   fromCoin,
  //   toCoin,
  //   ethAddress,
  // });
  return (
    <div className="w-full bg-swap-gradient bg-cover bg-no-repeat">
      <div className="w-full bg-swap relative bg-cover bg-no-repeat min-h-screen">
        <AnimatedContainer className="w-full flex items-center justify-center flex-col">
          <Navbar />

          <div className="w-[80%] flex flex-col rounded-[50px] gap-10 md:gap-20 bg-[#D9D9D91A] px-4 md:px-10 my-20 py-8">
            <div className="hidden lg:flex items-center justify-between w-full font-scandia text-xl tracking-tighter">
              <span>Pedido: #4845484sdfde</span>
              <span>Criado em 03/12/2024 21:30</span>
            </div>

            <div className="flex flex-col pt-10 md:pt-0 lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
              <div className="max-w-[256px] md:max-w-[427px] flex flex-col">
                <h1 className="font-gravesend font-bold text-2xl md:text-[40px] md:leading-[32px] lg:text-6xl lg:leading-[56px] tracking-tighter uppercase">
                  Swap concluído,{" "}
                  <span className="font-scandia font-light text-xl md:text-3xl lg:text-[58px] lg:leading-[60px]">
                    com sucesso
                  </span>
                </h1>

                <div className="flex items-center mt-5 md:mt-0 justify-center md:justify-start lg:justify-end">
                  <Button
                    variant="outline"
                    className="font-scandia bg-transparent rounded-full font-normal w-[205px] lg:w-[230px] flex items-center justify-center h-10 lg:h-12 text-sm lg:text-xl tracking-tighter"
                  >
                    Trocar novamente
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-5 md:gap-10 w-full items-center justify-center">
                <div className="flex items-center flex-col md:flex-row justify-center gap-5">
                  <div className="text-center md:text-end flex flex-col font-scandia tracking-tighter">
                    <span className="font-normal text-sm md:text-base">Enviado</span>
                    <span className="font-bold text-sm lg:text-2xl">1,00</span>
                  </div>

                  <Image src='/icons/btc.svg' height={140} width={140} alt="" className="size-20 md:size-[100px] lg:size-[140px]" />

                  <ArrowLeftRight size={28} />

                  <Image src='/icons/eth.svg' height={140} width={140} alt="" className="size-20 md:size-[100px] lg:size-[140px]" />

                  <div className="text-center md:text-end flex flex-col font-scandia tracking-tighter">
                    <span className="font-normal text-sm md:text-base">Recebido</span>
                    <span className="font-bold text-sm lg:text-2xl">26,34</span>
                  </div>
                </div>

                <Link href="/" className="font-scandia text-sm md:text-base font-normal tracking-tighter underline">
                  Ver transação
                </Link>

                <div className="border-t w-full border-t-white pt-5 px-6 gap-4 flex flex-col font-scandia text-base lg:text-2xl tracking-tighter">
                  <div className="w-full flex items-center justify-between text-xs md:text-base">
                    <span>Rate (1 BTC)</span>
                    <span>26,36 ETH</span>
                  </div>
                  <div className="w-full flex items-center justify-between text-xs md:text-base">
                    <span>Taxa de rede</span>
                    <span>Sem taxas</span>
                  </div>
                  <div className="w-full flex items-center justify-between text-xs md:text-base">
                    <span>Tempo de operação</span>
                    <span>12 segundos</span>
                  </div>
                  <div className="w-full flex items-center justify-between text-xs md:text-base">
                    <span>Endereço de recebimento</span>
                    <div className="flex items-center justify-center gap-1">
                      <span>ijkl...wasd</span>
                      <Image src='/icons/copy.svg' width={26} height={26} alt="" className="size-3 lg:size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-col lg:flex-row gap-20 justify-between w-full font-scandia text-base lg:text-xl font-normal">
              <div className="flex flex-col gap-2">
                <span>Algo deu errado?</span>
                <Link href='/problem' className="underline">Resolver problema</Link>
              </div>

              <div className="flex lg:hidden items-center flex-col w-full font-scandia text-base lg:text-xl tracking-tighter">
              <span>Pedido: #4845484sdfde</span>
              <span>Criado em 03/12/2024 21:30</span>
            </div>

                <Link
                    href='/dashboard'
                    className={cn(buttonVariants({ variant: "outline" }),"font-scandia bg-transparent rounded-full font-normal w-[205px] md:w-[230px] flex items-center justify-center h-10 md:h-12 text-sm md:text-xl tracking-tighter")}
                  >
                    Voltar ao painel
                  </Link>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
