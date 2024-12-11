import { AnimatedContainer } from "@/components/ui/animated-container";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import { Swapper } from "@/components/swapper";

export default function Home() {
  return (
    <>
      <AnimatedContainer className="w-full bg-hero">
      <Navbar />
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
          <div className="mb-12 w-full pb-20 md:pb-0 md:mt-20 flex items-center justify-between text-center">
            <div className="text-left max-w-[600px]">
              <h1 className="font-gravesend font-bold text-6xl leading-[70px] tracking-[-2%] uppercase">Swaps rápidos, <span className="text-[#627EEA]">com privacidade</span></h1>
              <span className="font-scandia leading-8 text-xl">Seja soberano, faça swaps de criptomoedas com privacidade, <b>segurança e transparência</b> em cada transação.
              </span>
            </div>
            <Swapper />
          </div>
        </MaxWidthWrapper>
      </AnimatedContainer>
    </>
  );
}
