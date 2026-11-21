export const CONTATOS = [
  { nome: "Gustavo", telefone: "5521997943603", formatado: "+55 21 99794-3603" },
  { nome: "Raphael", telefone: "5521980788008", formatado: "+55 21 98078-8008" },
];

export function whatsappLink(contato, message = "") {
  const phone = typeof contato === "string" ? contato : contato?.telefone || "5521997943603";
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone}${query}`;
}

export default CONTATOS;
