import Image from "next/image";

export function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-4 px-5">
      <Image width={268} height={32} src="/icons/logo.svg" alt="" />
      <Image width={44}  height={44} src="/icons/globe.svg" alt="" />
    </div>
  )
}