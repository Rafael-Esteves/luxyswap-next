import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button } from "@/components/ui/button";
import { afiliates, historicData, pairCoins } from "@/consts";
import { cn } from "@/lib/utils";
import { Ellipsis, MoveDown, MoveRight, MoveUp, Search } from "lucide-react";
import Image from "next/image";

interface Props {
  fromIcon: string;
  toIcon: string;
  fromText: string;
  toText: string;
}

function IconRow({ fromIcon, toIcon, fromText, toText }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full bg-[#FFFFFF80] py-2 pr-4 pl-3">
      <Image width={32} height={32} src={fromIcon} className="size-5 lg:size-8" alt={`${fromText} icon`} />
      <Image width={32} height={32} src={toIcon} className="size-5 lg:size-8" alt={`${toText} icon`} />
      <span className="font-gravesend font-bold text-sm lg:text-2xl tracking-tighter text-[#000A4C]">
        {fromText}
      </span>
      <MoveRight size={14} color="#000A4C" />
      <span className="font-gravesend font-bold text-sm lg:text-2xl tracking-tighter text-[#000A4C]">
        {toText}
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <div className="w-full bg-swap-gradient bg-cover bg-no-repeat">
      <div className="w-full bg-swap relative bg-cover bg-no-repeat min-h-screen">
        <AnimatedContainer className="w-full flex items-center justify-center flex-col p-2">
          <div className="w-full flex  flex-col py-3 lg:py-4 px-5 lg:px-10 rounded-[30px] lg:rounded-[70px] bg-[#D9D9D91A]">
            <div className="w-full flex items-center justify-between mb-20">
              <Image width={307} height={36} src="/icons/logo.svg" className="hidden lg:flex" alt="" />
              <Image width={140} height={16} src="/icons/logo.svg" className="flex lg:hidden" alt="" />
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center p-2 rounded-full bg-[#627EEA]">
                  <Button className="size-[30px] lg:size-[60px] font-gravesend text-sm lg:text-2xl tracking-tighter text-[#627EEA] flex items-center justify-center rounded-full bg-white">
                    D
                  </Button>
                  <Button className="size-[30px] lg:size-[60px] font-gravesend text-sm lg:text-2xl tracking-tighter flex items-center justify-center rounded-full">
                    S
                  </Button>
                  <Button className="size-[30px] lg:size-[60px] font-gravesend text-sm lg:text-2xl tracking-tighter flex items-center justify-center rounded-full">
                    M
                  </Button>
                  <Button className="size-[30px] lg:size-[60px] font-gravesend text-sm lg:text-2xl tracking-tighter flex items-center justify-center rounded-full">
                    A
                  </Button>
                </div>
                <Button className="size-[30px] lg:size-[70px] flex items-center justify-center rounded-full bg-[#627EEA]">
                  <Search className="size-4 lg:size-6" />
                </Button>
              </div>
            </div>

            <div className="px-5 w-full">
              <div className="flex items-start lg:items-center flex-col lg:flex-row justify-between w-full mb-10 lg:mb-20">
                <h1 className="font-gravesend mb-5 lg:mb-0 font-bold text-[40px] leading-10 lg:text-6xl tracking-tighter uppercase">
                  Luxy <br />
                  <span className="text-[#6F00FF]">dashboard</span>
                </h1>

                <div className="flex items-center justify-center gap-2 lg:gap-5">
                  <div className="flex flex-col items-end justify-between p-2 lg:p-4 bg-[#627EEA] rounded-[20px] lg:rounded-[35px] w-[110px] h-[125px] lg:w-[300px] lg:h-[172px]">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-scandia text-xs lg:text-xl tracking-tighter">
                        Lucro total
                      </span>
                      <span className="text-[10px] text-[#25FFA4] font-scandia font-normal flex items-center justify-center">
                        5% <MoveUp className="size-3 lg:size-5" color="#25FFA4" />
                      </span>
                    </div>

                    <span className="font-gravesend font-bold text-base lg:text-[40px] tracking-tighter">
                      <span className="text-xs lg:text-xl">R$</span> 90.360,44
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between p-2 lg:p-4 bg-[#000A4C] rounded-[20px] lg:rounded-[35px] w-[110px] h-[125px] lg:w-[300px] lg:h-[172px]">
                    <div className="flex items-center gap-5 justify-between w-full">
                      <span className="font-scandia text-xs lg:text-xl tracking-tighter">
                        Swaps concluídos
                      </span>
                      <span className="text-[10px] text-[#25FFA4] font-scandia font-normal flex items-center justify-center">
                        1% <MoveUp className="size-3 lg:size-5" color="#25FFA4" />
                      </span>
                    </div>

                    <span className="font-gravesend font-bold text-end text-base lg:text-[40px] tracking-tighter">
                      235.000
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between p-2 lg:p-4 bg-[#9900FF] rounded-[20px] lg:rounded-[35px] w-[110px] h-[125px] lg:w-[300px] lg:h-[172px]">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-scandia text-xs lg:text-xl tracking-tighter">
                        Volume
                      </span>
                      <span className="text-[10px] text-[#FF0004] font-scandia font-normal flex items-center justify-center">
                        5% <MoveDown className="size-3 lg:size-5" color="#FF0004" />
                      </span>
                    </div>

                    <span className="font-gravesend font-bold text-base lg:text-[40px] tracking-tighter">
                      <span className="text-xs lg:text-xl">R$</span>890.520,23
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-5 flex-col md:flex-row w-full">
                <div className="flex flex-col w-full items-center justify-center gap-5 ">
                  <div className="flex items-center w-full overflow-x-auto justify-between lg:justify-center gap-3 rounded-full bg-[#FFFFFF4D] p-1 lg:p-3">
                    <Button className="px-6 lg:px-12 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      $$$
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      BTC
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      ETH
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      SOL
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      SOL
                    </Button>
                    <Button  className="px-6 lg:px-12 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      <Ellipsis size={20} color="#232365" />
                    </Button>
                  </div>

                  <div className="flex flex-col items-start w-full py-5 lg:py-7 bg-[#000A4C] rounded-[20px] lg:rounded-[40px] gap-5">
                    <h1 className="font-bold font-gravesend text-base lg:text-2xl pl-5 lg:pl-10 mb-4 tracking-tighter">
                      hISTÓRICO COMPLETO
                    </h1>

                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>
                            <div className="flex items-center pl-5 lg:pl-10 justify-start font-gravesend text-xs lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                              DE
                            </div>
                          </th>
                          <th>
                            <div className="flex items-center justify-start font-gravesend text-xs lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                              PARA
                            </div>
                          </th>
                          <th>
                            <div className="flex items-center justify-start font-gravesend text-xs lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                              DATA
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicData.map((item, index) => (
                          <tr
                            key={index}
                            className={cn(
                              "w-full",
                              index % 2 === 0 ? "bg-[#FFFFFF0D]" : ""
                            )}
                          >
                            <td>
                              <div className="flex pl-5 lg:pl-10 py-2 items-center justify-start gap-2">
                                <Image  
                                  height={32}
                                  width={32}
                                  src={item.fromIcon}
                                  className="size-4 lg:size-8"
                                  alt="From Icon"
                                />
                                <span className="font-scandia text-xs lg:text-xl tracking-tighter font-bold">
                                  {item.fromAmount}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center justify-start gap-2">
                                <Image
                                height={32}
                                width={32}
                                  src={item.toIcon}
                                  className="size-4 lg:size-8"
                                  alt="To Icon"
                                />
                                <span className="font-scandia text-xs lg:text-xl tracking-tighter font-bold">
                                  {item.toAmount}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center justify-start gap-2">
                                <span className="font-normal font-gravesend text-xs lg:text-xl">
                                  {item.date}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex items-center justify-center w-full">
                      <Ellipsis size={28} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center w-full overflow-x-auto justify-between lg:justify-center gap-3 rounded-full bg-[#FFFFFF4D] p-1 lg:p-3">
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      BTC
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      ETH
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      SOL
                    </Button>
                    <Button className="px-4 lg:px-7 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      SOL
                    </Button>
                    <Button className="px-6 lg:px-12 font-bold font-gravesend text-xs lg:text-lg text-[#232365] tracking-tighter py-3 h-6 lg:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                      <Ellipsis size={20} color="#232365" />
                    </Button>
                  </div>

                  <div className="flex flex-col mt-2 lg:mt-5 items-start px-3 py-5 lg:py-7 w-full bg-[#D1D1D1] rounded-[20px] lg:rounded-[40px] gap-3 lg:gap-5 lg:px-10">
                    <h1 className="font-bold text-[#000A4C] font-gravesend text-base lg:text-2xl mb-2 lg:mb-4 tracking-tighter">
                      pares de moedas
                    </h1>

                    <div className="flex items-center w-full justify-between gap-5">
                      <div className="flex flex-col gap-2 lg:gap-4">
                        {pairCoins.map((item, index) => (
                          <IconRow
                            key={index}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            fromText={item.fromText}
                            toText={item.toText}
                          />
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 lg:gap-4">
                        {pairCoins.map((item, index) => (
                          <IconRow
                            key={index}
                            fromIcon={item.fromIcon}
                            toIcon={item.toIcon}
                            fromText={item.fromText}
                            toText={item.toText}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col mt-2 lg:mt-5 items-start px-3 py-5 lg:py-7 w-full bg-[#627EEA] rounded-[20px] lg:rounded-[40px] gap-3 lg:gap-5">
                      <h1 className="font-bold font-gravesend text-base lg:text-2xl pl-5 lg:pl-10 mb-4 tracking-tighter">
                        afiliados
                      </h1>

                      <table className="w-full">
                        <thead>
                          <tr>
                            <th>
                              <div className="flex items-center pl-5 lg:pl-10 justify-start font-gravesend text-[8px] lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                                NOME
                              </div>
                            </th>
                            <th>
                              <div className="flex items-center justify-start font-gravesend text-[8px] lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                                SALDO TOTAL
                              </div>
                            </th>
                            <th>
                              <div className="flex items-center justify-start font-gravesend text-[8px] lg:text-sm tracking-tighter font-medium pb-2 lg:pb-4">
                                SALDO PENDENTE
                              </div>
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {afiliates.map((item, index) => (
                            <tr
                              key={index}
                              className={cn(
                                "w-full",
                                index % 2 === 0 ? "bg-[#FFFFFF33]" : ""
                              )}
                            >
                              <td>
                                <div className="flex pl-5 lg:pl-10 py-2 items-center justify-start">
                                  <span className="font-gravesend text-[8px] lg:text-base uppercase tracking-tighter font-bold">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center">
                                  <span className="font-gravesend uppercase text-xs lg:text-base tracking-tighter font-bold">
                                    {item.totalAmount}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center">
                                  <span className="font-gravesend uppercase text-xs lg:text-base tracking-tighter font-bold">
                                    {item.restAmount}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="pr-0 lg:pr-10">
                                <Button
                                  className={cn(
                                    "w-11 lg:w-[88px] h-4 lg:h-7 flex items-center justify-center rounded-full font-gravesend text-[8px] lg:text-xs tracking-tighter font-medium",
                                    index % 2 === 0
                                      ? "bg-[#627EEA]"
                                      : "bg-[#000A4C]"
                                  )}
                                >
                                  ZERAR
                                </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="flex items-center justify-center w-full">
                        <Ellipsis size={28} />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
