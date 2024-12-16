import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start justify-start">
          <img src="/icons/logo.svg" alt="" />
          <div className="flex items-center gap-2 mt-7">
            <a href="#"><img className="size-14" src="/icons/instagram.svg" alt="" /></a>
            <a href="#"><img className="size-14" src="/icons/github.svg" alt="" /></a>
            <a href="#"><img className="size-14" src="/icons/message.svg" alt="" /></a>
          </div>
        </div>

        <div className="flex flex-col font-scandia">
          <h3 className="font-bold text-2xl mb-7">Precisa de ajuda?</h3>
          <div className="flex flex-col gap-2 justify-end">
            <Link href="#" className="text-lg">Política de Privacidade</Link>
            <Link href="#" className="text-lg">Saiba Mais</Link>
            <Link href="#" className="text-lg">Suporte</Link>
          </div>
        </div>
      </div>

      <div className="border-t-2 mt-16 pb-57 border-t-white pt-6 flex items-center justify-between">
        <span className="font-scandia font-light text-lg">© 2024 Luxy Swap. Todos os direitos reservados.</span>
        <span className="font-scandia font-light text-lg flex items-center justify-center gap-2"><img className="size-6" src="/icons/globe.svg" alt="" /> PT | BRL</span>
      </div>
    </div>
  )
}