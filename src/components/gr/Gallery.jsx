import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  {
    src: "/images/05ef270db_1001389978.png",
    alt: "Luz UV revelando colônias de bactérias no tatame",
  },
  {
    src: "/images/3ae2652fe_1001389979.png",
    alt: "Jovem com lesão de pele por micose no vestiário",
  },
  {
    src: "/images/e689d57fc_1001392183.jpg",
    alt: "Criança deitada no tatame suado",
  },
  {
    src: "/images/0e7fa2e60_1001392182.jpg",
    alt: "Contaminação invisível no tatame",
  },
  {
    src: "/images/06caf1341_1001392178.jpg",
    alt: "Pano com desinfetante espalhando bactérias",
  },
  {
    src: "/images/6934efeed_1001392177.jpg",
    alt: "Dojo blindado com tatame higienizado e crianças treinando",
  },
];

export default function Gallery() {
  const trackRef = useRef(null);

  const scrollCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#1A1A1A] py-24 md:py-32 overflow-hidden border-t border-[#3A3A3C]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-mono text-[#6FA84A]/70 tracking-[0.15em] text-xs uppercase">
            Galeria // O Perigo é Real
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#4D7C33] to-transparent" />
        </div>

        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-none text-white">
          O que a <span className="text-[#6FA84A] font-medium">ciência revela</span>{" "}
          no tatame
        </h2>

        <p className="max-w-xl mx-auto mt-6 text-white/60 text-lg leading-relaxed">
          Imagens que mostram o que o olho nu não vê — e o padrão que a GR
          Biosport está a trazer para o seu dojo.
        </p>
      </div>

      <div className="hidden md:flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => scrollCards(-1)}
          aria-label="Anterior"
          className="w-11 h-11 border border-[#3A3A3C]/70 text-white/70 hover:border-[#6FA84A] hover:text-[#6FA84A] flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollCards(1)}
          aria-label="Próximo"
          className="w-11 h-11 border border-[#3A3A3C]/70 text-white/70 hover:border-[#6FA84A] hover:text-[#6FA84A] flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {IMAGES.map((img) => (
          <article
            key={img.src}
            className="flex-none w-[82vw] sm:w-[420px] md:w-[360px] snap-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0e1721] border border-[#3A3A3C]/60 hover:border-[#4D7C33]/50 transition-colors">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          </article>
        ))}
      </div>

      <p className="text-center mt-6 font-mono text-[#6FA84A]/55 tracking-[0.15em] text-[11px] uppercase">
        Arraste para ver mais →
      </p>
    </section>
  );
}
