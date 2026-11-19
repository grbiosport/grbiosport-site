const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Menu, ArrowDown, ShieldCheck } from "lucide-react";
import Logo from "@/components/gr/Logo";

const HERO_IMG = "https://media.db.com/images/public/6ab565b5433bf108faf0843d/c566fe01b_generated_image.png";

export default function Hero({ onOpenMenu }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[hsl(var(--theme-background-background-2))]">
      {/* Parallax academy */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Academia de Jiu-Jitsu com tatames higienizados"
          fittingType="fill"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,hsl(var(--theme-background-background-2))_100%,transparent)] via-[#1A1A1A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,hsl(var(--theme-background-background-2))_100%,transparent)] via-transparent to-[#1A1A1A]/70" />
      </motion.div>

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="scan-line absolute left-0 right-0 h-px trace-line" />
      </div>

      {/* Ghost data overlays */}
      <div className="pointer-events-none absolute top-24 left-6 hidden md:block">
        <p className="ghost-data">LAT -22.9988</p>
        <p className="ghost-data">BARRA DA TIJUCA</p>
      </div>
      <div className="pointer-events-none absolute top-24 right-6 hidden md:block text-right">
        <p className="ghost-data">TATAME 100%</p>
        <p className="ghost-data">SEL0701 // AUDITÁVEL</p>
      </div>

      {/* Top bar */}
      <motion.header style={{ opacity }} className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <Logo withText />
        <button
          onClick={onOpenMenu}
          className="flex items-center gap-2 text-white/80 hover:text-[hsl(var(--theme-accent-text-1))] transition-colors group"
        >
          <span className="ghost-data hidden sm:inline">MENU</span>
          <Menu className="w-5 h-5" />
        </button>
      </motion.header>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-7xl"
      >
        <div className="fade-up flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--theme-accent-background-1))] blink" />
          <span className="ghost-data">BIOSSEGURANÇA ESPORTIVA</span>
        </div>

        <h1
          className="fade-up font-display font-black uppercase leading-[0.85] tracking-tight text-white whitespace-nowrap"
          style={{ fontSize: "clamp(2.1rem, 9.5vw, 13vw)" }}
        >
          Biossegurança<br />
          <span className="kinetic-text">para o</span> tatame
        </h1>

        <p className="fade-up mt-8 max-w-xl text-white/70 text-lg leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Programa sanitário profissional e auditável para academias de Jiu-Jitsu.
          Higienização profunda, selo de certificação e proteção contínua — com a
          autoridade técnica de quem treina no tatame.
        </p>

        <div className="fade-up mt-10 flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.4s" }}>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 bg-[hsl(var(--theme-primary-background-1))] text-white px-8 py-4 font-semibold tracking-wide hover:bg-[hsl(var(--theme-accent-background-1))] hover:shadow-[0_0_30px_rgba(77,124,51,0.5)] transition-all"
          >
            ENTRAR EM CONTATO
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#threat"
            className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-medium tracking-wide hover:border-[hsl(var(--theme-accent-border-1))] hover:text-[hsl(var(--theme-accent-text-1))] transition-all"
          >
            ENTENDA O RISCO
          </a>
        </div>

        <div className="fade-up mt-10 flex items-center gap-3 text-white/50" style={{ animationDelay: "0.5s" }}>
          <ShieldCheck className="w-4 h-4 text-[hsl(var(--theme-accent-text-1))]" />
          <span className="text-sm">Selo de Certificação auditável para sua academia</span>
        </div>
      </motion.div>

      {/* Bottom scroll cue */}
      <a
        href="#contact"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 group"
      >
        <ArrowDown className="w-3 h-3 text-[hsl(var(--theme-accent-text-1))] group-hover:translate-y-0.5 transition-transform" />
        <span className="ghost-data group-hover:text-[hsl(var(--theme-accent-text-1))] transition-colors">ENTRE EM CONTATO</span>
      </a>
    </section>
  );
}