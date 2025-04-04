import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full font-gravesend font-medium text-xs tracking-tighter lg:text-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como faço um swap de criptomoedas?</AccordionTrigger>
        <AccordionContent>
          Sim. Ele adere ao padrão de design WAI-ARIA.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como funcionam as taxas?</AccordionTrigger>
        <AccordionContent>
          Sim. Ele vem com estilos padrão que combinam com a estética dos outros componentes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>O que é o Depix?</AccordionTrigger>
        <AccordionContent>
          Sim. Ele é animado por padrão, mas você pode desativar se preferir.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Posso usar FIAT para comprar criptos?
        </AccordionTrigger>
        <AccordionContent>
          Sim. Ele é animado por padrão, mas você pode desativar se preferir.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Como garantem minha privacidade?</AccordionTrigger>
        <AccordionContent>
          Sim. Ele é animado por padrão, mas você pode desativar se preferir.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
