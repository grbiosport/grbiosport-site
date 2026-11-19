import React from "react";
import { MessageCircle } from "lucide-react";
import { CONTATOS, whatsappLink } from "@/components/gr/contatos";

const MESSAGE = "Olá! Quero agendar uma auditoria técnica de biossegurança na minha academia.";

export default function WhatsAppButton() {
  const href = whatsappLink(CONTATOS[0], MESSAGE);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#4D7C33] hover:bg-[#6FA84A] text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-black/40 transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}