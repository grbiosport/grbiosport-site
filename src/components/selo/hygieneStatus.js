export const FREQUENCIA_PADRAO_DIAS = 30;
const AVISO_PROPORCAO = 0.2;

// Retorna { key, label, color, bg, border, detail, vencimento } conforme a última
// higienização e o prazo do plano da academia (em dias).
export function getHygieneStatus(ultima, frequenciaDias) {
  const prazo = Number(frequenciaDias) > 0 ? Number(frequenciaDias) : FREQUENCIA_PADRAO_DIAS;
  const avisoDias = Math.max(1, Math.round(prazo * AVISO_PROPORCAO));
  const d = ultima ? new Date(ultima) : null;
  if (!d || isNaN(d)) {
    return {
      key: "vencida", label: "Higienização vencida", color: "#d97171",
      bg: "rgba(180,40,40,0.12)", border: "rgba(217,113,113,0.4)",
      detail: "Nenhuma higienização registrada.",
      vencimento: null, prazo,
    };
  }
  const vencimento = new Date(d.getTime() + prazo * 86400000);
  const dias = Math.floor((Date.now() - d.getTime()) / 86400000);
  const restantes = prazo - dias;
  if (restantes < 0) {
    return {
      key: "vencida", label: "Higienização vencida", color: "#d97171",
      bg: "rgba(180,40,40,0.12)", border: "rgba(217,113,113,0.4)",
      detail: `Prazo do plano encerrado há ${Math.abs(restantes)} dia(s). Não há garantia de proteção no momento.`,
      vencimento, prazo,
    };
  }
  if (restantes <= avisoDias) {
    return {
      key: "atencao", label: "Vence em breve", color: "#E0B84A",
      bg: "rgba(224,184,74,0.12)", border: "rgba(224,184,74,0.4)",
      detail: `Protegido por mais ${restantes} dia(s) até o fim do prazo do plano.`,
      vencimento, prazo,
    };
  }
  return {
    key: "emdia", label: "Tatame Protegido", color: "#6FA84A",
    bg: "rgba(77,124,51,0.15)", border: "rgba(111,168,74,0.4)",
    detail: `Higienização em dia · válida por mais ${restantes} dia(s) dentro do prazo do plano.`,
    vencimento, prazo,
  };
}