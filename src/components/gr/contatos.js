// Contatos oficiais GR Biosport (para o link usamos 55 + DDD + número, só dígitos)
export const CONTATOS = [
  { nome: "Gustavo", telefone: "5521997943603", exibicao: "+55 21 99794-3603" },
  { nome: "Raphael", telefone: "5521980788008", exibicao: "+55 21 98078-8008" },
];

export function whatsappLink(contato, mensagem) {
  const base = `https://wa.me/${contato.telefone}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}