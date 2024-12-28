import Image from "next/image";

export function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-4 px-5">
      <Image width={268} height={32} className="w-[154px] h-[18px] lg:w-[268px] lg:h-8" src="/icons/logo.svg" alt="" />
      <Image width={44}  height={44} className="w-6 h-6 lg:w-11 lg:h-11" src="/icons/globe.svg" alt="" />
    </div>
  )
}