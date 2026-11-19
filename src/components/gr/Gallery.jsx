const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/05ef270db_1001389978.png",
    alt: "Luz UV revelando colónias de bactérias no tatame",
  },
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/3ae2652fe_1001389979.png",
    alt: "Jovem com lesão de pele por micose no vestiário",
  },
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/e689d57fc_1001392183.jpg",
    alt: "Criança deitada no tatame suado",
  },
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/0e7fa2e60_1001392182.jpg",
    alt: "Contaminação invisível no tatame",
  },
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/06caf1341_1001392178.jpg",
    alt: "Pano com desinfetante espalhando bactérias",
  },
  {
    src: "https://media.db.com/images/public/6ab565b5433bf108faf0843d/6934efeed_1001392177.jpg",
    alt: "Dojo blindado com tatame higienizado e crianças treinando",
  },
];

export default function Gallery() {
  const trackRef = useRef(null);

  const scrollByCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#1A1A1A] py-24 md:py-32 overflow-hidden border-t border-[#3A3A3C]/30">
      <div className="relative px-6 md:px-12 max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="ghost-data">Galeria // O Perigo é Real</span>
          <div className="h-px w-16 trace-line" />
        </div>
        <h2 className="text-white font-display font-light tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          O que a <span className="text-[#6FA84A] font-medium">ciência revela</span> no tatame
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
          Imagens que mostram o que o olho nu não vê — e o padrão que a GR Biosport
          está a trazer para o seu dojo.
        </p>
      </div>

      {/* Carousel controls (desktop) */}
      <div className="hidden md:flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => scrollByCards(-1)}
          className="w-11 h-11 border border-[#3A3A3C]/70 flex items-center justify-center text-white/70 hover:border-[#6FA84A] hover:text-[#6FA84A] transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollByCards(1)}
          className="w-11 h-11 border border-[#3A3A3C]/70 flex items-center justify-center text-white/70 hover:border-[#6FA84A] hover:text-[#6FA84A] transition-all"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-4 scroll-smooth"
      >
        {IMAGES.map((img, i) => (
          <motion.article
            key={img.src}
            data-card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="snap-start shrink-0 w-[82vw] sm:w-[420px] md:w-[360px] group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0e1721] border border-[#3A3A3C]/60 group-hover:border-[#4D7C33]/50 transition-colors">
              <Image
                src={img.src}
                alt={img.alt}
                fittingType="fit"
                className="w-full h-full"
              />
            </div>
          </motion.article>
        ))}
      </div>

      <p className="ghost-data text-center mt-6">Arraste para ver mais →</p>
    </section>
  );
}