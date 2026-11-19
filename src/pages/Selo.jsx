const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getHygieneStatus } from "@/components/selo/hygieneStatus";
import SealInfoDialog from "@/components/selo/SealInfoDialog";
import {
  ShieldCheck, ShieldAlert, MapPin, CalendarClock, FlaskConical,
  UserCheck, Leaf, AlertTriangle, Loader2, ArrowLeft,
} from "lucide-react";

function formatDate(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d)) return "—";
  return d.toLocaleString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function SealBadge({ inactive, status }) {
  const expired = inactive || status?.key === "vencida";
  const warn = !expired && status?.key === "atencao";
  const ring = expired ? "#7a2f2f" : warn ? "#8a6d1f" : "#4D7C33";
  const glow = expired ? "rgba(180,40,40,0.4)" : warn ? "rgba(224,184,74,0.4)" : "rgba(77,124,51,0.45)";
  const accent = expired ? "#d97171" : warn ? "#E0B84A" : "#6FA84A";
  const badgeStyle = expired
    ? { background: "rgba(180,40,40,0.12)", borderColor: "rgba(217,113,113,0.4)" }
    : warn
    ? { background: "rgba(224,184,74,0.12)", borderColor: "rgba(224,184,74,0.4)" }
    : { background: "rgba(77,124,51,0.15)", borderColor: "rgba(111,168,74,0.4)" };
  const badgeLabel = inactive ? "Selo Inativo" : status?.label || "Tatame Protegido";
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setInfoOpen(true)}
      aria-label="Saiba o que o selo GR Biosport garante"
      className="relative flex flex-col items-center mx-auto cursor-pointer transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6FA84A] rounded-3xl p-2"
    >
      <div
        className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center"
        style={{
          background: "radial-gradient(circle at 50% 30%, #0B1F3A, #05080C)",
          boxShadow: `0 0 0 2px ${ring}, 0 0 30px ${glow}`,
        }}
      >
        <Leaf className="w-6 h-6 mb-1" style={{ color: accent }} />
        <span className="text-white font-bold text-xl tracking-tight leading-none">GR</span>
        <span
          className="text-[10px] font-semibold tracking-[0.2em]"
          style={{ color: accent }}
        >
          BIOSPORT
        </span>
      </div>
      <div
        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full border"
        style={badgeStyle}
      >
        {expired || warn ? (
          <ShieldAlert className="w-4 h-4" style={{ color: accent }} />
        ) : (
          <ShieldCheck className="w-4 h-4 text-[#6FA84A]" />
        )}
        <span className="text-white text-xs font-semibold tracking-wide">{badgeLabel}</span>
      </div>
      <span className="mt-2 text-[11px] text-white/40 underline underline-offset-2">O que isto garante?</span>
      <SealInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
    </button>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
      <div className="w-9 h-9 rounded-lg bg-[#4D7C33]/15 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#6FA84A]" />
      </div>
      <div className="min-w-0">
        <p className="text-white/40 text-[11px] uppercase tracking-wider">{label}</p>
        <p className="text-white text-sm font-medium mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

function ActiveSeal({ academia }) {
  const status = getHygieneStatus(academia.ultima_higienizacao, academia.frequencia_dias);
  const rows = [
    { icon: MapPin, label: "Endereço", value: `${academia.endereco || "—"} · ${academia.bairro || "—"}` },
    { icon: CalendarClock, label: "Última Higienização", value: formatDate(academia.ultima_higienizacao) },
    { icon: CalendarClock, label: "Vencimento do Plano", value: formatDate(status.vencimento) },
    { icon: FlaskConical, label: "Protocolo Técnico", value: academia.protocolo_utilizado || "Quaternário 5ª Geração e Vapor 100°C Kärcher" },
    { icon: UserCheck, label: "Responsável Técnico", value: academia.responsavel_tecnico || "—" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <SealBadge status={status} />
      <div className="mt-8 text-center">
        <p className="ghost-data mb-2" style={{ color: status.color }}>Academia Certificada</p>
        <h1 className="text-white text-3xl font-light tracking-tight leading-tight">{academia.nome}</h1>
      </div>
      <div
        className="mt-6 rounded-xl border px-4 py-3 text-center text-sm"
        style={{ background: status.bg, borderColor: status.border, color: status.color }}
      >
        {status.detail}
      </div>
      <div className="mt-8 rounded-2xl border border-[#3A3A3C]/60 bg-[#0B1F3A]/40 backdrop-blur p-5 divide-y divide-[#3A3A3C]/40">
        {rows.map((r) => (
          <DetailRow key={r.label} {...r} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-white/50 text-xs">
        <ShieldCheck className="w-4 h-4 text-[#6FA84A]" />
        Selo verificado em {new Date().toLocaleDateString("pt-BR")}
      </div>
    </motion.div>
  );
}

function InactiveSeal({ academia }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <SealBadge inactive />
      <div className="mt-8">
        <p className="ghost-data text-[#d97171]/70 mb-2">Validação Interrompida</p>
        <h1 className="text-white text-3xl font-light tracking-tight">{academia.nome}</h1>
      </div>
      <div className="mt-8 rounded-2xl border border-[#7a2f2f]/50 bg-[#2a1212]/40 p-6 flex flex-col items-center">
        <AlertTriangle className="w-8 h-8 text-[#d97171] mb-3" />
        <p className="text-white/70 text-sm max-w-sm">
          O selo de biossegurança desta academia está <span className="font-semibold text-white">inativo</span>.
          A higienização pode estar desatualizada. Para retomar a certificação,
          agende uma nova auditoria com a GR BioSport.
        </p>
      </div>
    </motion.div>
  );
}

function NotFoundSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-20"
    >
      <AlertTriangle className="w-10 h-10 text-[#d97171] mx-auto mb-4" />
      <h1 className="text-white text-2xl font-light">Selo não encontrado</h1>
      <p className="text-white/50 text-sm mt-3 max-w-sm mx-auto">
        Este QR Code não corresponde a uma academia certificada ativa.
        Verifique o link ou fale com a equipe GR Biosport.
      </p>
    </motion.div>
  );
}

export default function Selo() {
  const { slug } = useParams();
  const [academia, setAcademia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const { items } = await db.entities.Academias.filter(
          { slug },
          { limit: 1, fields: ["nome", "slug", "bairro", "endereco", "ultima_higienizacao", "responsavel_tecnico", "protocolo_utilizado", "frequencia_dias", "status_selo"] }
        );
        if (active) setAcademia(items[0] || null);
      } catch {
        if (active) setAcademia(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(180deg, #05080C 0%, #0B1F3A 60%, #05080C 100%)" }}
    >
      <header className="px-5 pt-6 max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />Voltar
        </Link>
        <span className="ghost-data text-[#6FA84A]/70">Validação Oficial</span>
      </header>

      <main className="px-5 max-w-2xl mx-auto pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-[#6FA84A] animate-spin" />
            <p className="text-white/50 text-sm mt-4">Validando selo...</p>
          </div>
        ) : !academia ? (
          <NotFoundSeal />
        ) : academia.status_selo !== "Ativo" ? (
          <InactiveSeal academia={academia} />
        ) : (
          <ActiveSeal academia={academia} />
        )}

      </main>
    </div>
  );
}