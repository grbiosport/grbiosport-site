import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CommandMenu({ open, onClose }) {

  const links = [
    { label: "Início", href: "#hero", coord: "00.01" },
    { label: "O Perigo", href: "#threat", coord: "00.02" },
    { label: "Metodologia", href: "#framework", coord: "00.03" },
    { label: "Contato", href: "#contact", coord: "00.04" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[hsl(var(--theme-background-background-2))] border-l border-[#3A3A3C]/60 flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#3A3A3C]/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--theme-accent-background-1))] blink" />
              <span className="ghost-data">GR BIOSPORT // BIOSSEGURANÇA</span>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-[hsl(var(--theme-accent-text-1))] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-10 border-b border-[#3A3A3C]/40">
            <p className="ghost-data mb-5">PROTOCOLO ATIVO</p>
            <p className="text-white text-xl font-light leading-snug">
              Um novo conceito em <span className="text-[hsl(var(--theme-accent-text-1))] font-medium">biossegurança e higienização</span> para academias.
            </p>
          </div>

          <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="group flex items-center justify-between py-5 border-b border-[#3A3A3C]/30 hover:pl-2 transition-all duration-300"
              >
                <span className="flex items-center gap-4">
                  <span className="ghost-data">{l.coord}</span>
                  <span className="text-white text-2xl font-light tracking-tight group-hover:text-[hsl(var(--theme-accent-text-1))] transition-colors">
                    {l.label}
                  </span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[hsl(var(--theme-accent-background-1))] transition-colors" />
              </a>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-[#3A3A3C]/40">
            <p className="ghost-data">GR BIOSPORT // 2026</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}