import { Navbar } from "@/components/navbar";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full bg-swap-gradient bg-cover bg-no-repeat">
      <div className="w-full bg-swap relative bg-cover bg-no-repeat min-h-screen">
        <AnimatedContainer className="w-full flex items-center justify-center flex-col">
          <Navbar />

          <div className="w-[80%] flex flex-col rounded-[50px] gap-20 bg-[#D9D9D91A] px-10 my-20 py-8">
            <div className="flex items-center justify-between w-full font-scandia text-xl tracking-tighter">
              <span>Pedido: #4845484sdfde</span>
              <span>Criado em 03/12/2024 21:30</span>
            </div>

            <div className="flex items-center justify-between gap-20">
              <div className="max-w-[427px] flex flex-col">
                <h1 className="font-gravesend font-bold text-6xl leading-[56px] tracking-tighter uppercase">
                  Swaps rápidos,{" "}
                  <span className="font-scandia font-light text-[58px] leading-[60px]">
                    com privacidade
                  </span>
                </h1>

                <div className="flex items-center justify-end">
                  <Button
                    variant="outline"
                    className="font-scandia bg-transparent rounded-full font-normal w-[230px] flex items-center justify-center h-12 text-xl tracking-tighter"
                  >
                    Trocar novamente
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-10 w-full items-center justify-center">
                <div className="flex items-center justify-center gap-5">
                  <div className="text-end flex flex-col font-scandia tracking-tighter">
                    <span className="font-normal">Enviado</span>
                    <span className="font-bold text-2xl">1,00</span>
                  </div>

                  <Image src='/icons/btc.svg' height={140} width={140} alt="" />

                  <ArrowLeftRight size={28} />

                  <Image src='/icons/eth.svg' height={140} width={140} alt="" />

                  <div className="text-end flex flex-col font-scandia tracking-tighter">
                    <span className="font-normal">Recebido</span>
                    <span className="font-bold text-2xl">26,34</span>
                  </div>
                </div>

                <Link href="/" className="font-scandia font-normal tracking-tighter underline">
                Ver transação
                </Link>

                <div className="border-t w-full border-t-white pt-5 px-6 gap-4 flex flex-col font-scandia text-2xl tracking-tighter">
                  <div className="w-full flex items-center justify-between">
                    <span>Rate (1 BTC)</span>
                    <span>26,36 ETH</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>Taxa de rede</span>
                    <span>Sem taxas</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>Tempo de operação</span>
                    <span>12 segundos</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span>Endereço de recebimento</span>
                    <div className="flex items-center justify-center gap-1">
                      <span>ijkl...wasd</span>
                      <Copy size={26} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full font-scandia text-xl font-normal">
              <div className="flex flex-col gap-2">
                <span>Algo deu errado?</span>
                <Link href='/problem' className="underline">Resolver problema</Link>
              </div>

              <Link
                    href='/dashboard'
                    className={cn(buttonVariants({ variant: "outline" }),"font-scandia bg-transparent rounded-full font-normal w-[230px] flex items-center justify-center h-12 text-xl tracking-tighter")}
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
