import { cn } from "@/lib/utils";
import { MoveDown, MoveUp } from "lucide-react";

interface Props {
  title: string;
  array: {
    name: string;
    img: string;
    isUp: boolean;
    firstValue: string;
    secondValue: string;
  }[];
}

export function GraphCard({ array, title }: Props) {
  return (
    <div className="rounded-[50px] w-full bg-[#000A4C] flex flex-col items-start justify-start px-5 py-8">
      <span className="font-gravesend font-bold mb-6 text-2xl leading-6 uppercase">
        {title}
      </span>
      {array.map((item, i) => (
        <div key={item.img} className={cn("flex w-full items-center justify-between px-5 py-4 rounded-[50px]", i % 2 === 1 ? "bg-[#FFFFFF0F]" : "bg-transparent")}>
          <div className="flex items-center justufy-center gap-2">
            <img src={item.img} className="size-9" alt="" />
            <span className="font-gravesend font-bold text-xl">
              {item.name}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span className="font-gravesend font-light">{item.firstValue}</span>
            <span
              className={cn(
                "font-gravesend font-bold flex items-center",
                item.isUp ? "text-[#16BA75]" : "text-[#B10003]"
              )}
            >
              {item.secondValue}
              {item.isUp ? <MoveUp className="size-3" color="#16BA75" /> : <MoveDown className="size-3" color="#B10003" />}
            </span>
          </div>
        </div>
      ))}

      <div className="w-full flex items-center justify-end mt-5">
        <span className="font-gravesend font-bold text-lg tracking-tighter">ÚLTIMAS <span className="text-2xl">24h</span></span>
      </div>
    </div>
  );
}
