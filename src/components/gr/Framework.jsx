import React from "react";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    phase: "FASE 01",
    image: "/images/fase-01-real.jpg",
    alt: "Auditoria e Diagnóstico Sanitário",
    title: "Auditoria & Diagnóstico Sanitário",
    description:
      "Mapeamos as microfissuras de impacto, a porosidade do EVA e as zonas cegas de umidade. Identificamos com precisão onde o biofilme bacteriano resiste aos produtos caseiros.",
    cta: "Prevenção de surtos invisíveis",
  },
  {
    phase: "FASE 02",
    image: "/images/fase-02-real.jpg",
    alt: "Higienização Profunda Quaternária",
    title: "Higienização Profunda Quaternária",
    description:
      "Aplicação mecânica de tensoativos hospitalares de 5ª geração. Quebramos a barreira lipídica de vírus, fungos e bactérias sem ressecar ou desgastar a lona do seu dojo.",
    cta: "Ação residual contínua",
  },
  {
    phase: "FASE 03",
    image: "/images/fase-03-real.jpg",
    alt: "Selo Oficial e Blindagem de Imagem",
    title: "Selo Oficial & Blindagem de Imagem",
    description:
      "O seu espaço recebe a Certificação Física de Biossegurança Ativa e laudo para a recepção. A higiene do seu dojo passa a ser o seu argumento comercial de maior autoridade.",
    cta: "Retenção e valor de marca",
  },
];

export default function Framework() {
  return (
    <section id="framework" className="bg-[#1A1A1A] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-mono text-[#6FA84A]/70 tracking-[0.15em] text-xs uppercase">
            Engenharia de Desinfecção
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#4D7C33] to-transparent" />
        </div>

        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-none text-white">
          A metodologia <span className="text-[#6FA84A] font-medium">Biosport</span>
        </h2>

        <p className="max-w-xl mx-auto mt-6 text-white/60 text-lg leading-relaxed">
          Não fazemos faxina comum. Aplicamos um protocolo de intervenção clínica
          em 3 fases, formulado exclusivamente para a densidade e o atrito dos
          tatames de alta intensidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12 max-w-[90rem] mx-auto">
        {PILLARS.map((pillar) => (
          <article
            key={pillar.phase}
            className="group bg-[#232325] border border-[#3A3A3C]/60 hover:border-[#4D7C33]/50 transition-colors"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <span className="absolute top-5 left-5 z-10 font-mono text-[#6FA84A]/80 tracking-[0.15em] text-xs uppercase">
                {pillar.phase}
              </span>
              <img
                src={pillar.image}
                alt={pillar.alt}
                className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#232325] via-[#1A1A1A]/30 to-transparent" />
            </div>

            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 text-white group-hover:text-[#6FA84A] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-white/55 leading-relaxed mb-8">
                {pillar.description}
              </p>
              <div className="flex items-center gap-2 text-[#6FA84A] text-sm font-medium">
                <span>{pillar.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
