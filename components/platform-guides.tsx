"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PlatformGuides() {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap gap-10 items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex cursor-pointer flex-col lg:h-[507px] lg:w-[400px] h-[407px] w-[295px] "
      >
        <div className="bg-[#6432B4] h-[405px] lg:h-[337px] w-full rounded-t-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
          <Image
            width={229}
            height={311}
            src="/icons/lamp-purple.svg"
            className="absolute right-4 w-[134px] h-[181px] lg:w-[229px] lg:h-[311px]"
            alt=""
          />
          <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
            <span className="font-gravesend font-bold text-lg lg:text-xl lg:leading-6 text-[#BB91FF]">
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
            className="font-gravesend max-w-[165px] lg:max-w-[309px] mb-10 font-bold lg:text-[40px] uppercase lg:leading-[40px] text-2xl leading-6 text-left text-white"
          >
            O seu <span className="text-[#000A4C]">guia</span> definitivo está
            aqui
          </h2>
        </div>

        <div className="bg-white flex items-center justify-center w-full h-[130px] lg:h-[170px] rounded-b-[36px]">
          <Image height={29} width={29} src="/icons/play.svg" alt="" />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }} className="bg-[#6F00FF] cursor-pointer lg:h-[507px] lg:w-[400px] h-[407px] w-[295px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
        <Image
          height={367}
          width={256}
          src="/icons/lock-big.svg"
          className="absolute left-4 bottom-5 w-[194px] h-[279px] lg:w-[256px] lg:h-[367px]"
          alt=""
        />
        <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
          <span className="font-gravesend font-bold text-lg lg:text-xl leading-6 text-[#BB91FF]">
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
          className="font-gravesend max-w-[309px] mb-10 font-bold text-2xl leading-6 lg:text-[40px] uppercase lg:leading-[40px] text-left text-white"
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
        transition={{ duration: 0.3, ease: "easeInOut" }} className="bg-[#9900FF]  cursor-pointer lg:h-[507px] lg:w-[400px] h-[407px] w-[295px] rounded-[36px] p-4 gap-10 flex flex-col items-start justify-start relative">
        <Image
          width={256}
          height={304}
          src="/icons/security-purple.svg"
          className="absolute right-4 top-5 w-[194px] h-[233px] lg:w-[256px] lg:h-[304px]"
          alt=""
        />
        <div className="flex items-center justify-center gap-5 bg-[#050C4F] rounded-full h-[57px] px-5">
          <span className="font-gravesend font-bold text-lg lg:text-xl leading-6 text-[#BB91FF]">
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
          className="font-gravesend max-w-[251px] lg:max-w-[352px] mb-10 font-bold lg:text-[40px] uppercase lg:leading-[40px] text-2xl leading-6 text-left text-white"
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
