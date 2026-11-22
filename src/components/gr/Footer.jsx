import React from "react";
import { Link } from "react-router-dom";
import { Instagram, ShieldCheck, Headset, Handshake, FileText, MessageCircle, Lock } from "lucide-react";
import Logo from "@/components/gr/Logo";
import { CONTATOS, whatsappLink } from "@/components/gr/contatos";

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] overflow-hidden border-t border-[#3A3A3C]/30">
      {/* Abstract emerald grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#4D7C33 1px, transparent 1px), linear-gradient(90deg, #4D7C33 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(77,124,51,0.4), transparent 60%)" }}
      />

      <div className="relative z-10 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Giant wordmark */}
          <h2 className="text-white font-display font-black uppercase tracking-tighter leading-[0.8] mb-16"
            style={{ fontSize: "clamp(3rem, 13vw, 12rem)" }}>
            GR<span className="text-[#6FA84A]">.</span>Biosport
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div>
              <Logo size={56} />
              <p className="text-white/40 text-xs mt-4 max-w-[16rem] leading-relaxed">
                Biossegurança e Higienização Esportiva para academias de Jiu-Jitsu.
              </p>
            </div>
            <div>
              <p className="ghost-data mb-4 flex items-center gap-2"><Headset className="w-3.5 h-3.5" />SUPORTE TÉCNICO</p>
              <a href="mailto:grbiosport@gmail.com?subject=Suporte%20T%C3%A9cnico" className="block text-white/70 hover:text-[#6FA84A] transition-colors text-sm">
                grbiosport@gmail.com
              </a>
              <div className="mt-2 space-y-1.5">
                {CONTATOS.map((c) => (
                  <a
                    key={c.telefone}
                    href={whatsappLink(c)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-white/70 hover:text-[#6FA84A] transition-colors text-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    {c.exibicao}
                    <span className="text-white/40 text-xs">{c.nome} · WhatsApp</span>
                  </a>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-2">Seg a Sáb · 8h às 18h</p>
              <p className="text-white/40 text-xs mt-1">Barra da Tijuca, Rio de Janeiro</p>
            </div>
            <div>
              <p className="ghost-data mb-4 flex items-center gap-2"><Handshake className="w-3.5 h-3.5" />NOVOS PARCEIROS</p>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Tem uma academia e quer o Selo de Biossegurança?
              </p>
              <a href="mailto:grbiosport@gmail.com?subject=Parceria%20GR%20Biosport" className="block text-white/70 hover:text-[#6FA84A] transition-colors text-sm">
              </a>
              <a href={whatsappLink(CONTATOS[0], "Olá! Tenho uma academia e quero ser parceiro da GR Biosport.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#6FA84A] transition-colors text-sm mt-2">
                <MessageCircle className="w-3.5 h-3.5" />Falar no WhatsApp
              </a>
              <a href="#contact" className="block text-[#6FA84A] hover:text-white transition-colors text-sm mt-2">
                Solicitar avaliação →
              </a>
            </div>
            <div>
              <p className="ghost-data mb-4">NAVEGAÇÃO</p>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-white/70 hover:text-[#6FA84A] transition-colors text-sm">Início</a></li>
                <li><a href="#threat" className="text-white/70 hover:text-[#6FA84A] transition-colors text-sm">O Perigo</a></li>
                <li><a href="#framework" className="text-white/70 hover:text-[#6FA84A] transition-colors text-sm">Metodologia</a></li>
                <li><a href="#contact" className="text-white/70 hover:text-[#6FA84A] transition-colors text-sm">Contato</a></li>
                <li>
                  <Link to="/politica-de-biosseguranca" className="text-white/70 hover:text-[#6FA84A] transition-colors text-sm inline-flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#6FA84A]" />Política de Biossegurança
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="ghost-data mb-4">REDES</p>
              <a href="https://instagram.com/grbiosport" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#3A3A3C]/70 flex items-center justify-center text-white/70 hover:border-[#6FA84A] hover:text-[#6FA84A] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <Link to="/login?returnTo=%2Fadmin%2Fselos" className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#6FA84A] transition-colors text-xs mt-6">
                <Lock className="w-3 h-3" />Área do Operador
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[#3A3A3C]/50">
            <p className="ghost-data">© 2026 GR BIOSPORT // BIOSSEGURANÇA E HIGIENIZAÇÃO ESPORTIVA</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6FA84A]" />
              <span className="ghost-data">BIOSSEGURANÇA E HIGIENIZAÇÃO ESPORTIVA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}