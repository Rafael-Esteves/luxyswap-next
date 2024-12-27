"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PlatformGuides() {
  return (
    <div className="flex flex-wrap gap-10 items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex cursor-pointer flex-col w-[400px]"
      >
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
            O seu <span className="text-[#000A4C]">guia</span> definitivo está
            aqui
          </h2>
        </div>

        <div className="bg-white flex items-center justify-center w-full h-[170px] rounded-b-[36px]">
          <Image height={29} width={29} src="/icons/play.svg" alt="" />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }} className="bg-[#6F00FF]  cursor-pointer h-[507px] w-[400px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
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
          <Image
            width={24}
            height={32}
            src="/icons/lock.svg"
            className="w-6 h-8"
            alt=""
          />
        </div>

        <h2
          style={{ letterSpacing: "-2%" }}
          className="font-gravesend max-w-[309px] mb-10 font-bold text-[40px] uppercase leading-[40px] text-left text-white"
        >
          Mantendo a <span className="text-[#000A4C]">privacidade</span> em
          transações
        </h2>

        <Image
          height={40}
          width={88}
          src="/icons/arrow-btn.svg"
          className="absolute w-[88px] h-10 right-4 bottom-4"
          alt=""
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }} className="bg-[#9900FF]  cursor-pointer h-[507px] w-[400px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
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
          <span className="text-[#000A4C]">integridade</span> dos seus ativos
        </h2>

        <Image
          height={40}
          width={88}
          src="/icons/arrow-btn.svg"
          className="absolute w-[88px] h-10 right-4 bottom-4"
          alt=""
        />
      </motion.div>
    </div>
  );
}
