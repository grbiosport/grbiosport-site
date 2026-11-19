const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Image } from "@/components/ui/image";

const LOGO_URL = "https://media.db.com/images/public/6ab565b5433bf108faf0843d/d41f1ef5d_grok_1790269213216.jpg";

export default function Logo({ size = 44, withText = false }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: size, height: size }} className="shrink-0">
        <Image
          src={LOGO_URL}
          alt="GR Biosport — Biossegurança e Higienização Esportiva"
          fittingType="fit"
          className="w-full h-full object-contain"
        />
      </div>
      {withText && (
        <div className="leading-none">
          <p className="text-white font-semibold tracking-[0.18em] text-sm">GR BIOSPORT</p>
          <p className="ghost-data mt-1 hidden sm:block">BIOSSEGURANÇA ESPORTIVA</p>
        </div>
      )}
    </div>
  );
}