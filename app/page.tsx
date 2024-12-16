import { AnimatedContainer } from "@/components/ui/animated-container";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import { Swapper } from "@/components/swapper";
import { ChevronDown } from "lucide-react";
import { Faq } from "@/components/faq";
import { GraphCard } from "@/components/graph-card";
import { maioresAltas, maioresBaixas, popularCriptos } from "@/consts";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-general relative bg-cover bg-no-repeat">
      <AnimatedContainer className="w-full abolsute top-0 bg-hero mb-12 pb-20">
        <Navbar />
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
          <div className="mb-12 w-full pb-20 md:pb-0 md:mt-20 flex items-center justify-between text-center">
            <div className="text-left max-w-[600px]">
              <h1 className="font-gravesend font-bold text-6xl leading-[70px] tracking-[-2%] uppercase">
                Swaps rápidos,{" "}
                <span className="text-[#627EEA]">com privacidade</span>
              </h1>
              <span className="font-scandia leading-8 text-xl">
                Seja soberano, faça swaps de criptomoedas com privacidade,{" "}
                <b>segurança e transparência</b> em cada transação.
              </span>
            </div>
            <Swapper />
          </div>
        </MaxWidthWrapper>
        <div className="w-full flex items-center justify-center">
          <ChevronDown className="size-10" />
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="flex w-full flex-col items-center justify-center text-center">
            <h2 className="font-gravesend font-bold text-6xl mb-14 leading-[70px] tracking-[-2%] uppercase">
              Como a plataforma <br />
              <span className="text-[#9900FF]">funciona</span>
            </h2>

            <div className="flex flex-wrap gap-10 items-center">
              <div className="flex flex-col w-[400px]">
                <div className="bg-[#6432B4] h-[337px] w-full rounded-t-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
                  <Image
                    width={229}
                    height={311}
                    src="/icons/lamp-purple.svg"
                    className="absolute right-4"
                    alt=""
                  />
                  <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
                    <span className="font-gravesend font-bold text-xl leading-6 text-[#BB91FF]">
                      COMO USAR?
                    </span>
                    <Image
                    width={24}
                    height={32}
                      src="/icons/lamp-purple-light.svg"
                      className="w-6 h-8"
                      alt=""
                    />
                  </div>

                  <h2
                    style={{ letterSpacing: "-2%" }}
                    className="font-gravesend max-w-[309px] mb-10 font-bold text-[40px] uppercase leading-[40px] text-left text-white"
                  >
                    O seu <span className="text-[#000A4C]">guia</span>{" "}
                    definitivo está aqui
                  </h2>
                </div>

                <div className="bg-white flex items-center justify-center w-full h-[170px] rounded-b-[36px]">
                  <Image height={29} width={29} src="/icons/play.svg" alt="" />
                </div>
              </div>

              <div className="bg-[#6F00FF] h-[507px] w-[400px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
                <Image
                height={367}
                width={256}
                  src="/icons/lock-big.svg"
                  className="absolute left-4 bottom-5"
                  alt=""
                />
                <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
                  <span className="font-gravesend font-bold text-xl leading-6 text-[#BB91FF]">
                    PRIVACIDADE
                  </span>
                  <Image width={24} height={32} src="/icons/lock.svg" className="w-6 h-8" alt="" />
                </div>

                <h2
                  style={{ letterSpacing: "-2%" }}
                  className="font-gravesend max-w-[309px] mb-10 font-bold text-[40px] uppercase leading-[40px] text-left text-white"
                >
                  Mantendo a <span className="text-[#000A4C]">privacidade</span>{" "}
                  em transações
                </h2>

                <Image
                  height={40}
                  width={88}
                  src="/icons/arrow-btn.svg"

                  className="absolute w-[88px] h-10 right-4 bottom-4"
                  alt=""
                />
              </div>

              <div className="bg-[#9900FF] h-[507px] w-[400px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
                <Image
                  width={256}
                  height={304}
                  src="/icons/security-purple.svg"
                  className="absolute right-4 top-5"
                  alt=""
                />
                <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
                  <span className="font-gravesend font-bold text-xl leading-6 text-[#BB91FF]">
                    SEGURANÇA
                  </span>
                  <Image
                    src="/icons/security-purple-light.svg"
                    className="w-6 h-8"
                    width={24}
                    height={32}
                    alt=""
                  />
                </div>

                <h2
                  style={{ letterSpacing: "-2%" }}
                  className="font-gravesend max-w-[352px] mb-10 font-bold text-[40px] uppercase leading-[40px] text-left text-white"
                >
                  Como garantimos <br /> a{" "}
                  <span className="text-[#000A4C]">integridade</span> dos seus
                  ativos
                </h2>

                <Image
                  height={40}
                  width={88}
                  src="/icons/arrow-btn.svg"
                  className="absolute w-[88px] h-10 right-4 bottom-4"
                  alt=""
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper className="flex items-center justify-center">
          <div className="bg-[#D9D9D9]/10 rounded-[50px] gap-24 flex flex-col items-center justify-center w-full max-w-[1352px] h-[785px]">
            <h2 className="font-gravesend font-bold text-6xl  leading-[60px] tracking-[-2%] uppercase">
              Fazer swaps nunca <br /> foi
              <span className="text-[#9900FF]">tão fácil</span>
            </h2>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-end justify-center gap-5">
                <span className="font-gravesend font-bold text-[96px] leading-[90px] tracking-tighter">
                  1
                </span>
                <span className="font-gravesend w-[200px] font-bold text-2xl tracking-tighter">
                  Escolha o par de moedas
                </span>
              </div>

              <div className="flex items-end justify-center gap-5">
                <span className="font-gravesend font-bold text-[96px] leading-[90px] tracking-tighter">
                  2
                </span>
                <span className="font-gravesend w-[200px] font-bold text-2xl tracking-tighter">
                  Insira sua carteira
                </span>
              </div>

              <div className="flex items-end justify-center gap-5">
                <span className="font-gravesend font-bold text-[96px] leading-[90px] tracking-tighter">
                  3
                </span>
                <span className="font-gravesend w-[260px] font-bold text-2xl tracking-tighter">
                  Confirme e finalize a transação
                </span>
              </div>
            </div>

            <span className="w-2/3 font-scandia text-2xl text-center">
              <b>Texto complementar:</b> Em poucos minutos, seu swap será
              concluído com segurança, praticidade e total privacidade. <br />
              <b>Dúvidas? Contate-nos.</b>
            </span>
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h2 className="font-gravesend font-bold text-6xl mb-14 leading-[70px] tracking-[-2%] uppercase">
              explore algumas <br />
              <span className="text-[#627EEA]">dúvidas comuns</span>
            </h2>

            <div className="max-w-[650px] w-full">
              <Faq />
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="grid grid-cols-3 justify-center gap-10">
            <GraphCard array={popularCriptos} title="Criptos populares" />
            <GraphCard array={maioresAltas} title="maiores altaS" />
            <GraphCard array={maioresBaixas} title="maiores baixas" />
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <Footer />
        </MaxWidthWrapper>
      </AnimatedContainer>
    </div>
  );
}
