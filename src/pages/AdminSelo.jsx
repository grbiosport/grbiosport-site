const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QrCodeDialog from "@/components/selo/QrCodeDialog";
import LeadsPanel from "@/components/selo/LeadsPanel";
import {
  Loader2, Plus, RefreshCw, Pencil, ShieldCheck, ShieldOff, Search, Trash2, Leaf, QrCode,
} from "lucide-react";

const PROTOCOLO_DEFAULT = "Quaternário 5ª Geração e Vapor 100°C Kärcher";

function formatDate(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (isNaN(d)) return "—";
  return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInput(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d) ? null : d.toISOString();
}

const EMPTY_FORM = {
  nome: "", slug: "", bairro: "", endereco: "",
  responsavel_tecnico: "", protocolo_utilizado: PROTOCOLO_DEFAULT,
  status_selo: "Ativo", ultima_higienizacao: "", frequencia_dias: 30,
};

export default function AdminSelo() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [qrAcademia, setQrAcademia] = useState(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    const query = {};
    const term = search.trim();
    if (term) {
      query.$or = [
        { bairro: { $regex: term, $options: "i" } },
        { nome: { $regex: term, $options: "i" } },
      ];
    }
    try {
      const { items } = await db.entities.Academias.filter(query, { sort: "-ultima_higienizacao", limit: 100 });
      setList(items);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchList(); }, [fetchList]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setEditing(a);
    setForm({
      nome: a.nome || "",
      slug: a.slug || "",
      bairro: a.bairro || "",
      endereco: a.endereco || "",
      responsavel_tecnico: a.responsavel_tecnico || "",
      protocolo_utilizado: a.protocolo_utilizado || PROTOCOLO_DEFAULT,
      status_selo: a.status_selo || "Ativo",
      ultima_higienizacao: a.ultima_higienizacao ? toLocalInput(a.ultima_higienizacao) : "",
      frequencia_dias: a.frequencia_dias ?? 30,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.nome.trim()) return;
    setSubmitting(true);
    const payload = {
      nome: form.nome.trim(),
      slug: (form.slug.trim() || slugify(form.nome)),
      bairro: form.bairro.trim(),
      endereco: form.endereco.trim(),
      responsavel_tecnico: form.responsavel_tecnico.trim(),
      protocolo_utilizado: form.protocolo_utilizado.trim() || PROTOCOLO_DEFAULT,
      status_selo: form.status_selo,
      ultima_higienizacao: form.ultima_higienizacao ? fromLocalInput(form.ultima_higienizacao) : null,
      frequencia_dias: Number(form.frequencia_dias) > 0 ? Number(form.frequencia_dias) : 30,
    };
    try {
      if (editing?.id) {
        await db.entities.Academias.update(editing.id, payload);
      } else {
        await db.entities.Academias.create(payload);
      }
      setModalOpen(false);
      await fetchList();
    } finally {
      setSubmitting(false);
    }
  };

  const registrar = async (a) => {
    setSaving(a.id);
    try {
      await db.entities.Academias.update(a.id, { ultima_higienizacao: new Date().toISOString(), status_selo: "Ativo" });
      await fetchList();
    } finally {
      setSaving(null);
    }
  };

  const toggleStatus = async (a) => {
    const novo = a.status_selo === "Ativo" ? "Inativo" : "Ativo";
    await db.entities.Academias.update(a.id, { status_selo: novo });
    await fetchList();
  };

  const remover = async (a) => {
    if (!window.confirm(`Excluir a academia "${a.nome}"?`)) return;
    await db.entities.Academias.delete(a.id);
    await fetchList();
  };

  return (
    <div className="min-h-screen bg-[#0B1218] text-white">
      {/* Header */}
      <header className="border-b border-[#3A3A3C]/40 bg-[#0B1F3A]/40">
        <div className="max-w-5xl mx-auto px-5 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4D7C33]/15 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#6FA84A]" />
            </div>
            <div>
              <h1 className="text-lg font-light tracking-tight">Painel do Operador</h1>
              <p className="text-white/40 text-xs">Selos BioSport · GR Jiu-Jitsu</p>
            </div>
          </div>
          <Button onClick={openNew} className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white">
            <Plus className="w-4 h-4 mr-2" />Nova Academia
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou bairro..."
            className="w-full pl-10 pr-4 py-3 bg-[#0B1F3A]/60 border border-[#3A3A3C]/60 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#6FA84A] rounded-lg transition-colors"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 text-[#6FA84A] animate-spin" />
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-white/40 text-sm py-20">Nenhuma academia cadastrada.</p>
        ) : (
          <div className="grid gap-3">
            {list.map((a) => {
              const ativo = a.status_selo === "Ativo";
              return (
                <div
                  key={a.id}
                  className="rounded-xl border border-[#3A3A3C]/60 bg-[#0B1F3A]/40 p-4 md:p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-white font-medium">{a.nome}</h2>
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full border"
                          style={
                            ativo
                              ? { color: "#6FA84A", borderColor: "rgba(111,168,74,0.4)", background: "rgba(77,124,51,0.12)" }
                              : { color: "#d97171", borderColor: "rgba(217,113,113,0.4)", background: "rgba(180,40,40,0.12)" }
                          }
                        >
                          {ativo ? "Ativo" : "Inativo"}
                        </span>
                        <span className="text-white/30 text-xs font-mono">/selo/{a.slug}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-white/50 text-xs">
                        <span>📍 {a.bairro || "—"}</span>
                        <span>🧪 {a.protocolo_utilizado || PROTOCOLO_DEFAULT}</span>
                        <span>👤 {a.responsavel_tecnico || "—"}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-1">
                        Última higienização: <span className="text-white/70">{formatDate(a.ultima_higienizacao)}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        onClick={() => registrar(a)}
                        disabled={saving === a.id}
                        className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white text-sm h-9"
                      >
                        {saving === a.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                        Registrar Higienização
                      </Button>
                      <Button variant="outline" onClick={() => setQrAcademia(a)} title="QR Code" className="h-9 border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" onClick={() => openEdit(a)} className="h-9 border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" onClick={() => toggleStatus(a)} className="h-9 border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#6FA84A]">
                        {ativo ? <ShieldOff className="w-4 h-4 text-[#d97171]" /> : <ShieldCheck className="w-4 h-4 text-[#6FA84A]" />}
                      </Button>
                      <Button variant="outline" onClick={() => remover(a)} className="h-9 border-[#3A3A3C]/70 text-white/80 hover:text-white hover:border-[#d97171]">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <LeadsPanel />

        <div className="mt-8 text-center">
          <Link to="/" className="text-white/40 hover:text-white text-xs">← Voltar ao site</Link>
        </div>
      </main>

      <QrCodeDialog academia={qrAcademia} onClose={() => setQrAcademia(null)} />

      {/* Add / Edit dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[#0B1F3A] border-[#3A3A3C]/60 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-light">
              {editing ? "Editar Academia" : "Nova Academia"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <Field label="Nome *">
              <Input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value, slug: form.slug || slugify(e.target.value) })}
                className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
              />
            </Field>
            <Field label="Slug (URL pública)">
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="gerado automaticamente"
                className="bg-[#0B1218] border-[#3A3A3C]/70 text-white font-mono text-sm"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bairro">
                <Input
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                  className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
                />
              </Field>
              <Field label="Endereço">
                <Input
                  value={form.endereco}
                  onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                  className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
                />
              </Field>
            </div>
            <Field label="Responsável Técnico">
              <Input
                value={form.responsavel_tecnico}
                onChange={(e) => setForm({ ...form, responsavel_tecnico: e.target.value })}
                className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
              />
            </Field>
            <Field label="Protocolo Utilizado">
              <Input
                value={form.protocolo_utilizado}
                onChange={(e) => setForm({ ...form, protocolo_utilizado: e.target.value })}
                className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
              />
            </Field>
            <Field label="Frequência de higienização (dias)">
              <Input
                type="number"
                min="1"
                value={form.frequencia_dias}
                onChange={(e) => setForm({ ...form, frequencia_dias: e.target.value })}
                className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Status do Selo">
                <Select value={form.status_selo} onValueChange={(v) => setForm({ ...form, status_selo: v })}>
                  <SelectTrigger className="bg-[#0B1218] border-[#3A3A3C]/70 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1218] border-[#3A3A3C]/70 text-white">
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Última Higienização">
                <Input
                  type="datetime-local"
                  value={form.ultima_higienizacao}
                  onChange={(e) => setForm({ ...form, ultima_higienizacao: e.target.value })}
                  className="bg-[#0B1218] border-[#3A3A3C]/70 text-white"
                />
              </Field>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)} className="border-[#3A3A3C]/70 text-white/70 hover:text-white">
              Cancelar
            </Button>
            <Button onClick={save} disabled={submitting || !form.nome.trim()} className="bg-[#4D7C33] hover:bg-[#6FA84A] text-white">
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editing ? "Salvar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-white/50 text-xs">{label}</Label>
      {children}
    </div>
  );
}