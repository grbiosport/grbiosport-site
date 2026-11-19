import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import siteHtml from "@/lib/standalone/landing-gr-biosport.html?raw";

export default function ExportarSite() {
  const [copied, setCopied] = useState(false);
  const tamanho = `${Math.round(new Blob([siteHtml]).size / 1024)} KB`;

  const baixar = () => {
    const blob = new Blob([siteHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const baixarZip = async () => {
    const zip = new JSZip();
    const pasta = zip.folder("gr-biosport-site");
    pasta.file("index.html", siteHtml);
    pasta.file(
      "LEIA-ME.txt",
      [
        "GR Biosport — site para Cloudflare Pages",
        "",
        "1. Entre em Workers & Pages no painel do Cloudflare e crie um projeto de upload direto.",
        "2. Arraste esta pasta (gr-biosport-site) ou o arquivo index.html.",
        "3. Publique e, depois, aponte seu domínio em Custom domains.",
        "",
        "O formulário do site envia o pedido de diagnóstico direto para o WhatsApp.",
      ].join("\n")
    );
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gr-biosport-site.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(siteHtml);
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
            <h1 className="text-lg font-light tracking-tight">Landing page para migração</h1>
            <p className="text-white/40 text-xs">
              Arquivo único, {tamanho}, sem dependências — pronto para o Cloudflare Pages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={copiar} className="border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
              {copied ? <Check className="w-4 h-4 mr-2 text-[#6FA84A]" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copiado" : "Copiar código"}
            </Button>
            <Button variant="outline" onClick={baixar} className="border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
              <Download className="w-4 h-4 mr-2" />index.html
            </Button>
            <Button onClick={baixarZip} className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white">
              <Download className="w-4 h-4 mr-2" />Baixar .zip
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-6">
        <div className="rounded-xl border border-[#3A3A3C]/60 bg-[#101A20] p-5 mb-5">
          <p className="flex items-center gap-2 text-sm text-white/80 mb-3">
            <Globe className="w-4 h-4 text-[#6FA84A]" />Como publicar no Cloudflare Pages
          </p>
          <ol className="text-white/50 text-xs leading-relaxed space-y-1.5 list-decimal list-inside">
            <li>Baixe o arquivo e renomeie para <span className="text-white/70">index.html</span>.</li>
            <li>No painel do Cloudflare, abra Workers &amp; Pages e crie um projeto de upload direto.</li>
            <li>Arraste o arquivo (ou a pasta que o contém) e publique.</li>
            <li>Depois, aponte seu domínio próprio em Custom domains.</li>
          </ol>
        </div>

        <pre className="rounded-xl border border-[#3A3A3C]/60 bg-[#05080C] p-4 text-[11px] leading-relaxed text-[#BDBDBD] overflow-auto max-h-[65vh] whitespace-pre">
          <code>{siteHtml}</code>
        </pre>
        <p className="text-white/30 text-[11px] mt-3">
          Use o botão "Baixar index.html" acima (o arquivo tem {tamanho}). Não use o "Salvar página" do navegador — isso grava só a tela atual.
          A página /html-selo é apenas o selo; esta é a landing page completa.
        </p>
      </main>
    </div>
  );
}