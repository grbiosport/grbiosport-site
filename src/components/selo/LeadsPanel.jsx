const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Loader2, Download, Mail } from "lucide-react";

function formatDate(v) {
  const d = v ? new Date(v) : null;
  if (!d || isNaN(d)) return "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

async function fetchAllLeads() {
  const all = [];
  let cursor;
  do {
    const page = await db.entities.Lead.filter({}, { sort: "-created_date", limit: 500, cursor });
    all.push(...page.items);
    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor);
  return all;
}

export default function LeadsPanel() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    (async () => {
      const [page, count] = await Promise.all([
        db.entities.Lead.filter({}, { sort: "-created_date", limit: 50 }),
        db.entities.Lead.count({}),
      ]);
      setItems(page.items);
      setTotal(count);
      setLoading(false);
    })();
  }, []);

  const exportCsv = async () => {
    setExporting(true);
    try {
      const all = await fetchAllLeads();
      const rows = [["Email", "Interesse", "Data"], ...all.map((l) => [l.email, l.interest || "", formatDate(l.created_date)])];
      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
      const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads-gr-biosport.csv";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#6FA84A]" />
          <h2 className="text-white font-light text-lg">Leads captados</h2>
          <span className="text-white/40 text-xs">({total})</span>
        </div>
        <Button
          variant="outline"
          onClick={exportCsv}
          disabled={exporting || total === 0}
          className="h-9 border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]"
        >
          {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          Exportar CSV
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 text-[#6FA84A] animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-white/40 text-sm py-10 border border-dashed border-[#3A3A3C]/60 rounded-xl">
          Nenhum lead captado ainda.
        </p>
      ) : (
        <div className="rounded-xl border border-[#3A3A3C]/60 bg-[#0B1F3A]/40 divide-y divide-[#3A3A3C]/40">
          {items.map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <a href={`mailto:${l.email}`} className="text-white/80 hover:text-[#6FA84A] text-sm truncate">{l.email}</a>
              <span className="text-white/40 text-xs whitespace-nowrap">{formatDate(l.created_date)}</span>
            </div>
          ))}
        </div>
      )}
      {total > items.length && (
        <p className="text-white/40 text-xs mt-3 text-center">Mostrando os 50 mais recentes. Exporte o CSV para ver todos.</p>
      )}
    </section>
  );
}