import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { CONTATOS, whatsappLink } from "@/components/gr/contatos";

export default function Contact() {
  const [academia, setAcademia] = useState("");
  const [enviado, setEnviado] = useState(false);

  const mensagemBase = academia.trim()
    ? `Olá! Sou de ${academia.trim()} e quero solicitar um diagnóstico do meu tatame com a GR Biosport.`
    : "Olá! Quero solicitar um diagnóstico do meu tatame com a GR Biosport.";

  const linkWhatsApp = whatsappLink(CONTATOS[0], mensagemBase);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 bg-[#141414] overflow-hidden border-t border-white/5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#4D7C33 1px, transparent 1px), linear-gradient(90deg, #4D7C33 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(77,124,51,0.35), transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#4D7C33] animate-pulse" />
          <span className="font-mono text-[#6FA84A]/70 tracking-[0.15em] text-xs uppercase">
            Auditoria Técnica Sem Compromisso
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] text-white"
        >
          O padrão do seu tatame reflete o{" "}
          <span className="text-[#6FA84A] font-medium">
            padrão da sua graduação
          </span>
          .
        </motion.h2>

        <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base md:text-lg leading-relaxed">
          Descubra se o seu dojo está verdadeiramente seguro ou apenas
          perfumado. Solicite uma avaliação diagnóstica com a nossa equipe
          especializada em biossegurança esportiva.
        </p>

        <div className="mt-12 max-w-md mx-auto">
          {!enviado ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={academia}
                onChange={(e) => setAcademia(e.target.value)}
                placeholder="Nome da sua academia ou dojo (opcional)"
                className="w-full bg-transparent border border-white/15 focus:border-[#6FA84A] text-white placeholder:text-white/35 px-5 py-4 outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#4D7C33] hover:bg-[#6FA84A] text-white font-semibold tracking-wide px-7 py-4 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                SOLICITAR DIAGNÓSTICO DO MEU TATAME
              </button>
            </form>
          ) : (
            <div className="border border-[#4D7C33]/50 bg-[#4D7C33]/10 p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#6FA84A] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                Conversa iniciada no WhatsApp!
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Se o WhatsApp não abriu automaticamente, clique abaixo para falar
                direto com nossa equipe.
              </p>
              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#6FA84A] hover:underline"
              >
                Abrir WhatsApp agora →
              </a>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setAcademia("");
                    setEnviado(false);
                  }}
                  className="text-xs text-white/45 hover:text-white/80 underline"
                >
                  Enviar nova solicitação
                </button>
              </div>
            </div>
          )}

          <p className="mt-5 text-white/50 text-sm">
            Atendimento direto por especialistas • Resposta rápida pelo WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
