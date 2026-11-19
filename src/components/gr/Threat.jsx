const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Bug, ShieldX, Baby, TrendingUp } from "lucide-react";

const MICROBE_IMG = "https://media.db.com/images/public/6ab565b5433bf108faf0843d/d65b8a654_generated_image.png";

const STATS = [
  {
    icon: Bug,
    value: "+100M",
    unit: "Microrganismos / m²",
    desc: "Sem esterilização com efeito residual, tatames acumulam colónias superiores às encontradas em instalações sanitárias públicas.",
  },
  {
    icon: ShieldX,
    value: "90%",
    unit: "Falha com produtos comuns",
    desc: "Cloro, sabão em pó e álcool a 70% evaporam em 10 minutos, oxidam a borracha e não quebram o biofilme de estafilococos.",
  },
  {
    icon: Baby,
    value: "82%",
    unit: "Tolerância zero dos pais",
    desc: "Nas turmas infantis, um único caso de micose, impetigo ou infeção dérmica leva ao cancelamento imediato de matrículas pelas famílias.",
  },
  {
    icon: TrendingUp,
    value: "2x",
    unit: "Mais valor percebido",
    desc: "Espaços desportivos certificados por laudos técnicos de biossegurança retêm atletas por mais tempo e justificam mensalidades superiores.",
  },
];

export default function Threat() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="threat" ref={ref} className="relative bg-[#1A1A1A] py-24 md:py-32 overflow-hidden border-t border-[#3A3A3C]/30">
      {/* Background microbe image */}
      <motion.div style={{ scale }} className="pointer-events-none absolute inset-0 opacity-15">
        <Image src={MICROBE_IMG} alt="Visualização microscópica de bactérias e vírus" fittingType="fill" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-[#1A1A1A]" />
      </motion.div>

      <div className="relative px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="ghost-data">Confronto de Realidade</span>
          <div className="h-px w-16 trace-line" />
        </div>
        <h2 className="text-white font-display font-light tracking-tight leading-[0.95] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          O que está <span className="text-[#6FA84A] font-medium">realmente no seu tatame?</span>
        </h2>
        <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed mb-16">
          O chão parece limpo e o cheiro parece neutro. Mas a biologia não se
          importa com a aparência: a mistura diária de suor, fricção e sangue
          gera um habitat microscópico que custa alunos à sua academia.
        </p>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-[#3A3A3C]/60 bg-[#232325]/80 backdrop-blur-sm p-6 hover:border-[#4D7C33]/50 transition-colors"
              >
                <Icon className="w-6 h-6 text-[#6FA84A] mb-5" />
                <div className="mb-3">
                  <span className="text-white text-4xl font-light tracking-tight">{s.value}</span>
                </div>
                <p className="text-white text-sm font-medium mb-2">{s.unit}</p>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}