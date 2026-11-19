import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function QrCodeDialog({ academia, onClose }) {
  if (!academia) return null;
  const url = `${window.location.origin}/selo/${academia.slug}`;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=20&data=${encodeURIComponent(url)}`;

  const download = async () => {
    const blob = await (await fetch(qr)).blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `qrcode-${academia.slug}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <Dialog open={!!academia} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-[#0B1F3A] border-[#3A3A3C]/60 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white font-light">QR Code · {academia.nome}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img src={qr} alt={`QR Code do selo de ${academia.nome}`} className="w-64 h-64 rounded-lg bg-white" />
          <p className="text-white/40 text-xs font-mono break-all text-center">{url}</p>
          <Button onClick={download} className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white w-full">
            <Download className="w-4 h-4 mr-2" />Baixar PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}