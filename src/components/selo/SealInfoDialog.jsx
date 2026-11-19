import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck, FlaskConical, Flame, ClipboardCheck, CalendarClock } from "lucide-react";

const GUARANTEES = [
  {
    icon: FlaskConical,
    title: "Desinfecção química profissional",
    text: "Aplicação de quaternário de amônio de 5ª geração, eficaz contra bactérias, fungos e vírus.",
  },
  {
    icon: Flame,
    title: "Vapor a 100°C",
    text: "Higienização térmica com equipamento Kärcher, que alcança microfissuras do tatame.",
  },
  {
    icon: ClipboardCheck,
    title: "Execução assinada",
    text: "Cada intervenção é realizada e registrada por um responsável técnico da GR Biosport.",
  },
  {
    icon: CalendarClock,
    title: "Validade conforme o plano",
    text: "A frequência da higienização é definida pelo fluxo de treinos de cada academia. Quando o prazo do plano termina, o selo passa a vencido até uma nova higienização ser registrada.",
  },
];

export default function SealInfoDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0B1F3A] border-[#3A3A3C]/60 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-11 h-11 rounded-full bg-[#4D7C33]/15 flex items-center justify-center mb-2">
            <ShieldCheck className="w-5 h-5 text-[#6FA84A]" />
          </div>
          <DialogTitle className="text-white font-light text-xl">
            O que o Selo GR Biosport garante
          </DialogTitle>
          <DialogDescription className="text-white/50 text-sm">
            Um tatame com este selo passou por um protocolo clínico de biossegurança, não apenas por uma limpeza comum.
          </DialogDescription>
        </DialogHeader>

        <ul className="grid gap-4 py-2">
          {GUARANTEES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4D7C33]/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#6FA84A]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{title}</p>
                <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}