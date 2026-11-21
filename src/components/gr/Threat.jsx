import React from "react";

const STATS = [
  {
    value: "+100M",
    unit: "Microrganismos / m²",
    desc: "Sem esterilização com efeito residual, tatames acumulam colónias superiores às encontradas em instalações sanitárias públicas.",
  },
  {
    value: "90%",
    unit: "Falha com produtos comuns",
    desc: "Cloro, sabão em pó e álcool a 70% evaporam em 10 minutos, oxidam a borracha e não quebram o biofilme de estafilococos.",
  },
  {
    value: "82%",
    unit: "Tolerância zero dos pais",
    desc: "Nas turmas infantis, um único caso de micose, impetigo ou infeção dérmica leva ao cancelamento imediato de matrículas pelas famílias.",
  },
  {
    value: "2x",
    unit: "Mais valor percebido",
    desc: "Espaços desportivos certificados por laudos técnicos de biossegurança retêm atletas por mais tempo e justificam mensalidades superiores.",
  },
];

export default function Threat() {
  return (
    <section
      id="threat"
      className="relative bg-[#1A1A1A] py-24 md:py-32 overflow-hidden border-t border-[#3A3A3C]/30"
    >
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/images/d65b8a654_generated_image.png"
          alt="Visualização microscópica de bactérias e vírus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-[#1A1A1A]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-mono text-[#6FA84A]/70 tracking-[0.15em] text-xs uppercase">
            Confronto de Realidade
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#4D7C33] to-transparent" />
        </div>

        <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-none text-white">
          O que está{" "}
          <span className="text-[#6FA84A] font-medium">
            realmente no seu tatame?
          </span>
        </h2>

        <p className="max-w-xl mx-auto mt-6 text-white/60 text-lg leading-relaxed">
          O chão parece limpo e o cheiro parece neutro. Mas a biologia não se
          importa com a aparência: a mistura diária de suor, fricção e sangue
          gera um habitat microscópico que custa alunos à sua academia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-left">
          {STATS.map((stat) => (
            <div
              key={stat.unit}
              className="border border-[#3A3A3C]/60 bg-[#232325]/80 p-6 hover:border-[#4D7C33]/50 transition-colors"
            >
              <div className="w-6 h-6 border border-[#6FA84A] mb-5" />
              <div className="text-4xl font-light tracking-tight text-white">
                {stat.value}
              </div>
              <p className="text-sm font-medium text-white mt-3 mb-2">
                {stat.unit}
              </p>
              <p className="text-white/45 text-sm leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
