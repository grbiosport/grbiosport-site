import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ShieldCheck, Menu } from "lucide-react";
import Logo from "@/components/gr/Logo";

export default function Hero({ onOpenMenu }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[640px] h-screen flex flex-col justify-center overflow-hidden bg-[#1A1A1A]"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute -top-[8%] left-0 right-0 h-[116%] will-change-transform"
      >
        <img
          src="/images/hero-higienizacao.jpg"
          alt="Academia de Jiu-Jitsu com tatames higienizados"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/98 via-transparent to-[#1A1A1A]/70" />
      </motion.div>

      {/* Linha verde de varredura */}
      <div className="gr-scan-line" />

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <div>
            <p className="font-semibold tracking-[0.18em] text-sm leading-none text-white">
              GR BIOSPORT
            </p>
            <p className="hidden sm:block font-mono text-[#6FA84A]/60 tracking-[0.15em] text-[11px] uppercase mt-1.5">
              BIOSSEGURANÇA ESPORTIVA
            </p>
          </div>
        </div>

        <button
          onClick={onOpenMenu}
          aria-label="Abrir menu"
          className="flex items-center gap-2 text-white/80 hover:text-[#6FA84A] transition-colors"
        >
          <span className="hidden sm:inline font-mono text-xs tracking-[0.15em] uppercase">
            MENU
          </span>
          <Menu className="w-5 h-5" />
        </button>
      </header>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#4D7C33] animate-pulse" />
          <span className="font-mono text-[#6FA84A]/70 tracking-[0.15em] text-xs uppercase">
            BIOSSEGURANÇA ESPORTIVA
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.88] tracking-tight text-white">
          Biossegurança
          <br />
          <span className="gr-kinetic-text">para o</span> tatame
        </h1>

        <p className="mt-8 max-w-xl text-white/70 text-base md:text-lg leading-relaxed">
          Programa sanitário profissional e auditável para academias de
          Jiu-Jitsu. Higienização profunda, selo de certificação e proteção
          contínua — com a autoridade técnica de quem treina no tatame.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#4D7C33] hover:bg-[#6FA84A] text-white font-semibold tracking-wide transition-all"
          >
            ENTRAR EM CONTATO
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#threat"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-[#6FA84A] hover:text-[#6FA84A] text-white font-medium transition-colors"
          >
            ENTENDA O RISCO
          </a>
        </div>

        <div className="mt-10 flex items-center gap-3 text-white/50 text-sm">
          <ShieldCheck className="w-4 h-4 text-[#6FA84A] shrink-0" />
          <span>Selo de Certificação auditável para sua academia</span>
        </div>
      </div>
    </section>
  );
}
