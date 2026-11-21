import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Logo from "@/components/gr/Logo";

const SECTIONS = [
  {
    title: "1. Objetivo",
    text: "Esta política descreve como a GR Biosport executa e comprova a higienização de tatames e ambientes esportivos, garantindo que cada intervenção seja rastreável e verificável pelo aluno por meio do Selo de Biossegurança.",
  },
  {
    title: "2. Protocolo de higienização",
    text: "A intervenção é feita em fases clínicas: remoção da carga orgânica, aplicação de desinfetante quaternário de 5ª geração com efeito residual e finalização com vapor a 100°C. Os produtos e equipementos são escolhidos para não degradar a borracha dos tatames.",
  },
  {
    title: "3. Validade do selo",
    text: "O selo exibe a data da última higienização e é considerado em dia dentro do prazo do plano de higienização contratado pela academia. A frequência é definida conforme o fluxo de treinos de cada unidade. Após esse prazo, o status passa a Vencido na página pública até que uma nova intervenção seja registrada.",
  },
  {
    title: "4. Rastreabilidade",
    text: "Cada higienização registra a data, o responsável técnico e o protocolo aplicado. Essas informações ficam disponíveis publicamente ao escanear o QR Code da academia.",
  },
  {
    title: "5. Dúvidas e contestações",
    text: "Caso identifique alguma divergência entre o selo e a condição real do ambiente, entre em contato com o nosso suporte técnico para que a unidade seja verificada.",
  },
];

export default function PoliticaBiosseguranca() {
  useEffect(() => {
    document.body.classList.add("gr-biosport");
    return () => document.body.classList.remove("gr-biosport");
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10">
          <ArrowLeft className="w-4 h-4" />Voltar ao site
        </Link>
        <Logo size={56} />
        <div className="flex items-center gap-2 mt-10 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#6FA84A]" />
          <span className="ghost-data">Documento oficial</span>
        </div>
        <h1 className="text-white text-4xl font-light tracking-tight mb-10">Política de Biossegurança</h1>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-white text-lg font-medium mb-2">{s.title}</h2>
              <p className="text-white/60 leading-relaxed">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}