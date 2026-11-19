import React from "react";

const BAIRROS = [
  { label: "Todas", value: "" },
  { label: "Barra da Tijuca", value: "Barra" },
  { label: "Recreio", value: "Recreio" },
];

export default function BairroFilter({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {BAIRROS.map((b) => {
        const active = value.trim().toLowerCase() === b.value.toLowerCase();
        return (
          <button
            key={b.label}
            type="button"
            onClick={() => onChange(b.value)}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors ${
              active
                ? "bg-[#4D7C33] border-[#6FA84A] text-white"
                : "bg-[#0B1F3A]/60 border-[#3A3A3C]/60 text-white/60 hover:text-white hover:border-[#6FA84A]/50"
            }`}
          >
            {b.label}
          </button>
        );
      })}
    </div>
  );
}