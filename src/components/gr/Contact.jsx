const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | calculating | submitting | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Informe seu email.");
      return;
    }
    setStatus("calculating");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("submitting");
    try {
      await db.entities.Lead.create({ name: email.trim(), email: email.trim(), interest: "teaser" });
      setStatus("success");
    } catch (err) {
      setError(err?.message || "Erro ao processar. Tente novamente.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-[#1A1A1A] py-24 md:py-36 overflow-hidden border-t border-[#3A3A3C]/30">
      {/* Ghost grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#4D7C33 1px, transparent 1px), linear-gradient(90deg, #4D7C33 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(77,124,51,0.35), transparent 60%)" }}
      />

      <div className="relative px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#6FA84A] blink" />
          <span className="ghost-data">Auditoria Técnica Sem Compromisso</span>
        </div>

        <h2 className="text-white font-display font-light tracking-tight leading-[0.95] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          O padrão do seu tatame reflete o <span className="text-[#6FA84A] font-medium">padrão da sua graduação</span>.
        </h2>
        <p className="max-w-xl mx-auto text-white/60 text-lg leading-relaxed mb-12">
          Descubra se o seu dojo está verdadeiramente seguro ou apenas perfumado.
          Solicite uma avaliação diagnóstica com a nossa equipa especializada em
          biossegurança desportiva.
        </p>

        {/* Teaser signup */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#4D7C33]/50 bg-[#4D7C33]/[0.07] p-10 max-w-md mx-auto flex flex-col items-center text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#6FA84A] mb-6" />
              <h3 className="text-white text-xl font-light mb-3">Diagnóstico solicitado!</h3>
              <p className="text-white/60">
                A nossa equipa especializada entrará em contato para agendar a
                auditoria do seu tatame.
              </p>
              <button
                onClick={() => { setStatus("idle"); setEmail(""); }}
                className="mt-8 text-[#6FA84A] text-sm tracking-wide hover:underline"
              >
                Cadastrar outro email
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-transparent border border-[#3A3A3C]/70 text-white px-5 py-4 placeholder:text-white/30 focus:outline-none focus:border-[#6FA84A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "calculating" || status === "submitting"}
                  className="bg-[#4D7C33] text-white px-7 py-4 font-semibold tracking-wide hover:bg-[#6FA84A] disabled:cursor-wait transition-all"
                >
                  {status === "calculating" && <span className="calc-pulse">CALCULANDO...</span>}
                  {status === "submitting" && <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />...</span>}
                  {(status === "idle" || status === "error") && "SOLICITAR DIAGNÓSTICO DO MEU TATAME"}
                </button>
              </div>
              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
              <p className="text-white/50 text-sm mt-5">Atendimento direto por especialistas • Resposta rápida pelo WhatsApp</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}