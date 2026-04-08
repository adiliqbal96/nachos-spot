"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useRef, useEffect, useState } from "react";

const TAGS = ["Firmafest", "Bryllup", "Privatfest", "Koncert", "Babyshower", "Bridalshower polter", "Fødselsdag", "Studentergilde"];

const PHOTOS = [
  { src: img("/images/event-setup-stand.jpg"), alt: "Event stand" },
  { src: img("/images/warmer.jpg"),            alt: "Warmer"      },
  { src: img("/images/food-cheese-pour.jpg"),  alt: "Cheese pour" },
  { src: img("/images/cart.jpg"),              alt: "Nachos cart" },
];

export default function Events() {
  const containerRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Dot sync
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onScroll = () => {
      const cardW = slider.firstElementChild
        ? (slider.firstElementChild as HTMLElement).offsetWidth + 14
        : slider.offsetWidth;
      const idx = Math.round(slider.scrollLeft / cardW);
      dotsRef.current.forEach((d, i) => d?.classList.toggle("active", i === idx));
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-slide
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let current = 0;
    autoSlideRef.current = setInterval(() => {
      current = (current + 1) % PHOTOS.length;
      const cardW = slider.firstElementChild
        ? (slider.firstElementChild as HTMLElement).offsetWidth + 14
        : slider.offsetWidth;
      slider.scrollTo({ left: current * cardW, behavior: "smooth" });
    }, 4000);
    return () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current); };
  }, []);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative min-h-screen py-20 lg:py-32 px-[5vw] overflow-hidden bg-[#050404] scroll-mt-20"
    >
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "10%", width: "60%", height: "80%", background: "radial-gradient(ellipse at 40% 50%, rgba(180,70,0,0.18) 0%, transparent 65%)", filter: "blur(50px)" }} />

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden relative">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA221]/10 rounded-full blur-[80px]" />
        </div>

        {/* Header */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 0.15, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            className="absolute -top-10 -left-6 text-[120px] font-['Bangers'] text-white select-none pointer-events-none transition-transform"
          >
            FEST
          </motion.div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="text-[clamp(48px,14vw,72px)] leading-[0.85] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-bangers)", textShadow: "4px 4px 0 #1a0a00" }}
              >
                <span className="text-[#DDA221] block">NACHOS</span>
                <span className="text-white">TIL EVENTS</span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[16px] text-[#8A8582] font-light leading-relaxed max-w-[85%]"
            >
              Firmafest, bryllup eller babyshower? Vi ruller ind, osten smelter, og gæsterne glemmer det aldrig.
            </motion.p>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-[#DDA221]/20 blur-2xl rounded-full" />
          <a
            href="#booking"
            className="relative block w-full text-center py-6 bg-[#DDA221] text-[#050404] font-['Bangers'] text-2xl tracking-[2px] uppercase group overflow-hidden"
            style={{ animation: "border-pulse 2s ease-in-out infinite" }}
          >
            <span className="relative z-10">SÆT OS PÅ DIT EVENT →</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Asymmetric Image Collage (Mobile Slider) */}
        <div className="relative -mx-[5vw] px-[5vw] mb-12">
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory" ref={sliderRef}>
            {PHOTOS.map((p, i) => (
              <motion.div
                key={i}
                onClick={() => setSelectedPhoto(i)}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0.5, scale: 0.9 }}
                viewport={{ once: false, amount: 0.5 }}
                className="relative shrink-0 w-[80vw] aspect-[4/5] snap-center overflow-hidden border border-white/5 cursor-pointer"
              >
                <Image src={p.src} alt={p.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] tracking-[3px] text-[#DDA221] font-['Oswald'] uppercase">NACHOS SPOT / 00{i+1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 pt-4 border-t border-white/10"
        >
          {TAGS.map((t, i) => (
            <span key={i} className="px-3 py-1 text-[10px] tracking-[2px] uppercase font-['Oswald'] text-[#8A8582] border border-white/5 bg-white/[0.03]">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:flex relative z-10 max-w-7xl mx-auto flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex-1 relative" style={{ minHeight: 700 }}>
          <motion.div style={{ y: yA, width: "62%", aspectRatio: "3/4", top: 0, left: 0, zIndex: 1 }} className="absolute">
            <motion.div onClick={() => setSelectedPhoto(0)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-3deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8)" }}>
              <Image src={img("/images/event-setup-stand.jpg")} alt="Event stand" fill className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "46%", aspectRatio: "3/4", top: 30, right: 0, zIndex: 3 }} className="absolute">
            <motion.div onClick={() => setSelectedPhoto(1)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "2.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8)" }}>
              <Image src={img("/images/warmer.jpg")} alt="Warmer" fill className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yA, width: "48%", aspectRatio: "3/4", bottom: 0, left: "10%", zIndex: 4 }} className="absolute">
            <motion.div onClick={() => setSelectedPhoto(2)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.28, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "1.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.9)" }}>
              <Image src={img("/images/food-cheese-pour.jpg")} alt="Cheese pour" fill className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "40%", aspectRatio: "3/4", bottom: 20, right: "2%", zIndex: 5 }} className="absolute">
            <motion.div onClick={() => setSelectedPhoto(3)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.38, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-2deg", boxShadow: "0 30px 80px rgba(0,0,0,0.9)" }}>
              <Image src={img("/images/cart.jpg")} alt="Nachos cart" fill className="object-cover" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex-1 lg:pl-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="kicker">
            OUTDOOR & INDOOR
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-6">
            {[
              { text: "DIT EVENT",   color: "#DDA221" },
              { text: "FORTJENER",   color: "#ffffff" },
              { text: "SMELTET OST", color: "#DDA221" },
            ].map((line, i) => (
              <div key={i} className="text-[clamp(38px,5.5vw,76px)] leading-[0.9] tracking-wide" style={{ fontFamily: "var(--font-bangers)", color: line.color, textShadow: "3px 3px 0 #1a0a00" }}>
                {line.text}
              </div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[clamp(15px,1.7vw,20px)] text-[#8A8582] font-light max-w-sm mb-8 leading-relaxed">
            Babyshower, bryllup, studentergilde eller privatfest — vognen ruller, osten smelter, og festen huskes længe efter.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-2 mb-8">
            {TAGS.map((t, i) => (
              <span key={i} className="px-3 py-1.5 text-[10px] tracking-[3px] uppercase font-['Oswald'] text-[#DDA221]/50 border border-[#DDA221]/15">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="#booking"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="inline-block px-12 py-5 border border-[#DDA221] text-[#DDA221] font-['Oswald'] text-sm tracking-[3px] uppercase hover:bg-[#DDA221] hover:text-[#050404] transition-all"
          >
            BOOK OS TIL DIT EVENT →
          </motion.a>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[200] bg-[#050404]/98 flex items-center justify-center p-[5vw] cursor-zoom-out"
          >
            {/* BIG CLOSE BUTTON */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[210] flex items-center gap-4 group cursor-pointer"
            >
              <span className="hidden md:block text-white font-['Oswald'] tracking-[4px] uppercase text-lg group-hover:text-[#DDA221] transition-colors">LUK GALLERI</span>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-[#DDA221] group-hover:border-[#DDA221] transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white group-hover:text-black transition-colors">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full h-[85vh] md:w-[90vw] md:h-[95vh] pointer-events-none"
            >
              <Image
                src={PHOTOS[selectedPhoto].src}
                alt={PHOTOS[selectedPhoto].alt}
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
