import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full pb-5">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start">
          <Image width={414} height={50} src="/icons/logo.svg" className="w-[300px] h-[38px] lg:w-[414px] lg:h-[50px]" alt="" />
          <div className="flex items-center gap-2 mt-7">
            <a href="#"><Image width={56} height={56} className="size-10 lg:size-14" src="/icons/instagram.svg" alt="" /></a>
            <a href="#"><Image width={56} height={56} className="size-10 lg:size-14" src="/icons/github.svg" alt="" /></a>
            <a href="#"><Image width={56} height={56} className="size-10 lg:size-14" src="/icons/message.svg" alt="" /></a>
          </div>
        </div>

        <div className="flex flex-col font-scandia mt-5 lg:mt-0">
          <h3 className="font-bold text-2xl mb-7">Precisa de ajuda?</h3>
          <div className="flex flex-col gap-2 items-center lg:items-start lg:justify-end">
            <Link href="#" className="text-lg">Política de Privacidade</Link>
            <Link href="#" className="text-lg">Saiba Mais</Link>
            <Link href="#" className="text-lg">Suporte</Link>
          </div>
        </div>
      </div>

      <div className="border-t-2 mt-16 pb-57 border-t-white pt-6 flex items-center justify-center lg:justify-between">
        <span className="font-scandia lg:font-light text-xs lg:text-lg">© 2024 Luxy Swap. Todos os direitos reservados.</span>
        <span className="font-scandia hidden font-light text-sm lg:text-lg lg:flex items-center justify-center gap-2"><Image width={24} height={24} className="size-6" src="/icons/globe.svg" alt="" /> PT | BRL</span>
      </div>
    </div>
  )
}