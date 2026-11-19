import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import seloHtml from "@/lib/standalone/selo-gr-biosport.html?raw";

export default function ExportarSelo() {
  const [copied, setCopied] = useState(false);

  const baixar = () => {
    const blob = new Blob([seloHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selo-gr-biosport.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(seloHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1218] text-white">
      <header className="border-b border-[#3A3A3C]/40 bg-[#0B1F3A]/40">
        <div className="max-w-4xl mx-auto px-5 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs mb-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />Voltar ao site
            </Link>
            <h1 className="text-lg font-light tracking-tight">HTML da página do selo</h1>
            <p className="text-white/40 text-xs">Arquivo único, sem dependências — abre em qualquer navegador.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={copiar} className="border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
              {copied ? <Check className="w-4 h-4 mr-2 text-[#6FA84A]" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copiado" : "Copiar código"}
            </Button>
            <Button onClick={baixar} className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white">
              <Download className="w-4 h-4 mr-2" />Baixar .html
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-6">
        <pre className="rounded-xl border border-[#3A3A3C]/60 bg-[#05080C] p-4 text-[11px] leading-relaxed text-[#BDBDBD] overflow-auto max-h-[75vh] whitespace-pre">
          <code>{seloHtml}</code>
        </pre>
        <p className="text-white/30 text-[11px] mt-3">
          Dica: depois de baixar, basta dar dois cliques no arquivo para abrir no navegador.
        </p>
      </main>
    </div>
  );
}