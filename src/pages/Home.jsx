import React, { useState, useEffect } from "react";
import Hero from "@/components/gr/Hero";
import Framework from "@/components/gr/Framework";
import Threat from "@/components/gr/Threat";
import Gallery from "@/components/gr/Gallery";
import Contact from "@/components/gr/Contact";
import Footer from "@/components/gr/Footer";
import CommandMenu from "@/components/gr/CommandMenu";
import WhatsAppButton from "@/components/gr/WhatsAppButton";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("gr-biosport");
    return () => document.body.classList.remove("gr-biosport");
  }, []);

  return (
    <div className="bg-[hsl(var(--theme-background-background-1))] text-white min-h-screen">
      <Hero onOpenMenu={() => setMenuOpen(true)} />
      <Framework />
      <Threat />
      <Gallery />
      <Contact />
      <Footer />
      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}