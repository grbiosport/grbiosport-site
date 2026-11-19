const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    id: "FASE 01",
    title: "Auditoria & Diagnóstico Sanitário",
    desc: "Mapeamos as microfissuras de impacto, a porosidade do EVA e as zonas cegas de humidade. Identificamos com precisão onde o biofilme bacteriano resiste aos produtos caseiros.",
    img: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/d2697f726_generated_image.png",
    cta: "Prevenção de surtos invisíveis",
  },
  {
    id: "FASE 02",
    title: "Higienização Profunda Quaternária",
    desc: "Aplicação mecânica de tensoativos hospitalares de 5ª geração. Quebramos a barreira lipídica de vírus, fungos e bactérias sem ressecar ou desgastar a lona do seu dojo.",
    img: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/7b6cea0b1_generated_image.png",
    cta: "Ação residual contínua",
  },
  {
    id: "FASE 03",
    title: "Selo Oficial & Blindagem de Imagem",
    desc: "O seu espaço recebe a Certificação Física de Biossegurança Ativa e laudo para a receção. A higiene do seu dojo passa a ser o seu argumento comercial de maior autoridade.",
    img: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/23e5854f3_generated_image.png",
    cta: "Retenção e valor de marca",
  },
];

export default function Framework() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const xShift = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section id="framework" ref={sectionRef} className="relative bg-[hsl(var(--theme-background-background-2))] py-24 md:py-32 overflow-hidden">
      {/* Section header */}
      <motion.div style={{ x: xShift }} className="px-6 md:px-12 mb-16 md:mb-24 max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="ghost-data">Engenharia de Desinfecção</span>
          <div className="h-px w-16 trace-line" />
        </div>
        <h2 className="text-white font-display font-light tracking-tight leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          A metodologia <span className="text-[hsl(var(--theme-accent-text-1))] font-medium">Biosport</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
          Não fazemos faxina comum. Aplicamos um protocolo de intervenção clínica
          em 3 fases, formulado exclusivamente para a densidade e o atrito dos
          tatames de alta intensidade.
        </p>
      </motion.div>

      {/* Dossier cards — stacked on mobile, 3-column grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.id} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full group"
    >
      <div className="relative overflow-hidden bg-[hsl(var(--theme-muted-background-1))] border border-[#3A3A3C]/60 transition-colors duration-500 group-hover:border-[#4D7C33]/50">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={pillar.img}
            alt={pillar.title}
            fittingType="fill"
            className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,hsl(var(--theme-muted-background-1))_100%,transparent)] via-[#1A1A1A]/30 to-transparent" />
          <div className="absolute top-5 left-5 right-5">
            <span className="ghost-data">{pillar.id}</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-4 group-hover:text-[hsl(var(--theme-accent-text-1))] transition-colors">
            {pillar.title}
          </h3>
          <p className="text-white/55 text-base leading-relaxed mb-8">{pillar.desc}</p>
          <div className="flex items-center gap-2 text-[hsl(var(--theme-accent-text-1))] text-sm font-medium tracking-wide">
            {pillar.cta}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}