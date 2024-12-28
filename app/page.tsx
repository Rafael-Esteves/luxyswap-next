import { AnimatedContainer } from "@/components/ui/animated-container";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import { Swapper } from "@/components/swapper";
import { Faq } from "@/components/faq";
import { GraphCard } from "@/components/graph-card";
import { maioresAltas, maioresBaixas, popularCriptos } from "@/consts";
import { Footer } from "@/components/footer";
import { UpDown } from "@/components/up-down-container";
import Link from "next/link";
import { PlatformGuides } from "@/components/platform-guides";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-general relative bg-cover bg-no-repeat">
      <AnimatedContainer className="w-full abolsute top-0 bg-hero mb-12 pb-20">
        <Navbar />
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
          <div className="mb-12 w-full pb-20 gap-20 lg:pb-0 mt-20 flex flex-col lg:flex-row items-center justify-between text-center">
            <div className="text-center lg:text-left max-w-[372px] lg:max-w-[600px]">
              <h1 className="hidden lg:block font-gravesend font-bold text-4xl leading-8 lg:text-6xl lg:leading-[70px] tracking-tighter uppercase">
                Swaps rápidos,{" "}
                <span className="text-[#627EEA]">com privacidade</span>
              </h1>

              <h1 className="block lg:hidden font-gravesend font-bold text-4xl leading-8 lg:text-6xl lg:leading-[70px] tracking-tighter uppercase">
                Swaps rápidos,<br />
                <span className="text-[#627EEA]">com privacidade</span>
              </h1>
              <span className="hidden lg:flex font-scandia leading-8 text-xl">
                Seja soberano, faça swaps de criptomoedas com privacidade,{" "}
                <b>segurança e transparência</b> em cada transação.
              </span>
            </div>
            <Swapper />
            <span className="block lg:hidden max-w-[300px] font-scandia leading-5 text-sm">
                Seja soberano, faça swaps de criptomoedas com privacidade,{" "}
                <b>segurança e transparência</b> em cada transação.
              </span>
          </div>
        </MaxWidthWrapper>
        <div className="w-full flex items-center justify-center">
          <Link href='#section2'>
            <UpDown />
          </Link>
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer id="section2" className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="flex w-full flex-col items-center justify-center text-center">
            <h2 className="font-gravesend font-bold text-3xl leading-8 lg:text-6xl mb-14 lg:leading-[70px] tracking-tighter uppercase">
              Como a plataforma <br />
              <span className="text-[#9900FF]">funciona</span>
            </h2>

            <PlatformGuides />
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer id="section3" className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper className="flex items-center justify-center">
          <div className="bg-[#D9D9D9]/10 rounded-[50px] gap-10 lg:gap-24 flex flex-col items-center justify-center w-full max-w-[1352px] h-[785px]">
            <h2 className="font-gravesend font-bold text-3xl leading-7 lg:text-6xl max-w-[220px] lg:max-w-[660px] text-center lg:leading-[60px] tracking-tighter uppercase">
              Fazer swaps nunca foi{" "}
              <span className="text-[#9900FF]">tão fácil</span>
            </h2>

            <div className="hidden lg:flex items-center justify-center gap-6">
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

            <div className="flex lg:hidden flex-col">
            <div className="flex items-end w-full justify-start gap-5">
                <span className="font-gravesend font-bold text-[70px] leading-[70px] tracking-tighter">
                  1
                </span>
                <span className="font-gravesend w-[131px] font-bold tracking-tighter">
                  Escolha o par de moedas
                </span>
              </div>

              <div className="flex mt-5 items-start w-full  gap-2 justify-end">
                <Image width={48} height={19} src='/icons/right-arrow-blue.svg' className="mt-1" alt="" />
                <div className="flex items-end">
                <span className="font-gravesend font-bold text-[70px] leading-[70px] tracking-tighter mr-5">
                  2
                </span>
                <span className="font-gravesend w-[100px] font-bold tracking-tighter">
                Insira sua carteira
                </span>
                </div>
              </div>

              <div className="flex justify-end w-full mt-2">
              <Image width={38} height={19} src='/icons/left-arrow-blue.svg' alt="" />
              </div>

              <div className="flex items-end w-full justify-center gap-5">
                <span className="font-gravesend font-bold text-[70px] leading-[70px] tracking-tighter">
                  3
                </span>
                <span className="font-gravesend w-[174px] font-bold tracking-tighter">
                Confirme e finalize a transação

                </span>
              </div>

            </div>

            <span className="lg:w-2/3 px-5 lg:px-0 font-scandia text-sm lg:text-2xl text-center">
              <b>Texto complementar:</b> Em poucos minutos, seu swap será
              concluído com segurança, praticidade e total privacidade. <br />
              <b>Dúvidas? Contate-nos.</b>
            </span>
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer id="section4" className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="flex items-center flex-col lg:flex-row justify-between">
            <h2 className="font-gravesend text-3xl leading-8 font-bold lg:text-6xl mb-14 lg:leading-[70px] tracking-tighter uppercase">
              explore algumas <br />
              <span className="text-[#627EEA]">dúvidas comuns</span>
            </h2>

            <span className="block lg:hidden font-scandia text-sm leading-5">Aqui você encontra respostas para as dúvidas mais comuns sobre o uso da plataforma e sobre as transações. Se precisar de mais informações, nossa equipe está à disposição para ajudar!
            </span>

            <div className="max-w-[320px] lg:max-w-[650px] w-full">
              <Faq />
            </div>
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer id="section5" className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <div className="hidden lg:grid grid-cols-3 justify-center gap-10">
            <GraphCard array={popularCriptos} title="Criptos populares" />
            <GraphCard array={maioresAltas} title="maiores altaS" />
            <GraphCard array={maioresBaixas} title="maiores baixas" />
          </div>

          <div className="flex lg:hidden">
          <GraphCard array={popularCriptos} title="Criptos populares" />
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>

      <AnimatedContainer id="section6" className="w-full mt-20 md:mt-56">
        <MaxWidthWrapper>
          <Footer />
        </MaxWidthWrapper>
      </AnimatedContainer>
    </div>
  );
}
