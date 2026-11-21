import React from "react";

export default function Logo({ size = 44 }) {
  return (
    <img
      src="/images/d41f1ef5d_grok_1790269213216.jpg"
      alt="GR Biosport — Biossegurança e Higienização Esportiva"
      style={{ width: size, height: size }}
      className="object-contain rounded-sm"
    />
  );
}
