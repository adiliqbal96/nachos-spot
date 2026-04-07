"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useRef, useEffect } from "react";

const TAGS = ["Firmafest", "Bryllup", "Festival", "Privatfest", "Koncert", "Marked"];

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
      <div className="lg:hidden relative z-10 flex flex-col gap-5">

        {/* Headline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(36px,10vw,54px)] leading-[0.92] tracking-wide mb-2"
            style={{ fontFamily: "var(--font-bangers)", textShadow: "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00" }}
          >
            <span style={{ color: "#DDA221" }}>NACHOS</span>
            <br />
            <span className="text-white">TIL EVENTS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[14px] text-[#8A8582] font-light leading-snug"
          >
            Perfekt til festivaler, firmaevents og private arrangementer.
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <a
            href="#booking"
            className="block w-full text-center py-[18px] bg-[#DDA221] text-[#050404] font-['Oswald'] text-sm tracking-[3px] uppercase font-semibold"
          >
            BOOK OS TIL DIT EVENT →
          </a>
          <p className="text-center text-[11px] text-[#8A8582] tracking-[2px] uppercase font-['Oswald'] mt-2">
            Svar inden for 24 timer
          </p>
        </motion.div>

        {/* Value props */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex flex-col gap-2"
        >
          {["Altid frisklavet", "Hurtig servering", "Perfekt til alle typer events"].map((v, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DDA221] shrink-0" style={{ boxShadow: "0 0 8px rgba(221,162,33,0.7)" }} />
              <span className="text-[13px] text-[#8A8582] font-['Oswald'] tracking-[1px] uppercase">{v}</span>
            </div>
          ))}
        </motion.div>

        {/* Image slider */}
        <div>
          <div
            ref={sliderRef}
            className="events-mobile-slider"
            onTouchStart={() => { if (autoSlideRef.current) { clearInterval(autoSlideRef.current); autoSlideRef.current = null; } }}
          >
            {PHOTOS.map((p, i) => (
              <div key={i} className="events-slide relative overflow-hidden shrink-0">
                <Image src={p.src} alt={p.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 to-transparent" />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {PHOTOS.map((_, i) => (
              <span
                key={i}
                ref={el => { if (el) dotsRef.current[i] = el; }}
                className={`events-dot${i === 0 ? " active" : ""}`}
                onClick={() => {
                  const slider = sliderRef.current;
                  if (!slider) return;
                  const cardW = (slider.firstElementChild as HTMLElement)?.offsetWidth + 14;
                  slider.scrollTo({ left: i * cardW, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>

        {/* Event type tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-[11px] text-[#DDA221]/60 tracking-[3px] uppercase font-['Oswald'] mb-2">
            Vi dækker alle typer events:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {TAGS.map((t, i) => (
              <span key={i} className="shrink-0 px-3 py-2 text-[10px] tracking-[2px] uppercase font-['Oswald'] text-[#DDA221]/60 border border-[#DDA221]/20 whitespace-nowrap">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP layout (unchanged) ── */}
      <div className="hidden lg:flex relative z-10 max-w-7xl mx-auto flex-col lg:flex-row gap-10 lg:gap-20 items-center">

        {/* Scattered collage */}
        <div className="flex-1 relative" style={{ minHeight: 700 }}>
          <motion.div style={{ y: yA, width: "62%", aspectRatio: "3/4", top: 0, left: 0, zIndex: 1 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-3deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8)" }}>
              <Image src={img("/images/event-setup-stand.jpg")} alt="Event stand" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "46%", aspectRatio: "3/4", top: 30, right: 0, zIndex: 3 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "2.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(221,162,33,0.1)" }}>
              <Image src={img("/images/warmer.jpg")} alt="Warmer" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yA, width: "48%", aspectRatio: "3/4", bottom: 0, left: "10%", zIndex: 4 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.28, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "1.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.9), 0 0 0 1px rgba(221,162,33,0.15)" }}>
              <Image src={img("/images/food-cheese-pour.jpg")} alt="Cheese pour" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 via-transparent to-transparent" />
              <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(221,162,33,0.2)" }} />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "40%", aspectRatio: "3/4", bottom: 20, right: "2%", zIndex: 5 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.38, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-2deg", boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(221,162,33,0.12)" }}>
              <Image src={img("/images/cart.jpg")} alt="Nachos cart" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 via-transparent to-transparent" />
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
              <div key={i} className="text-[clamp(38px,5.5vw,76px)] leading-[0.9] tracking-wide" style={{ fontFamily: "var(--font-bangers)", color: line.color, textShadow: "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00, 3px -3px 0 #1a0a00, -3px -3px 0 #1a0a00" }}>
                {line.text}
              </div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[clamp(15px,1.7vw,20px)] text-[#8A8582] font-light max-w-sm mb-8 leading-relaxed">
            Firmafest, bryllup, festival eller privatfest — vognen ruller, osten smelter, og festen huskes længe efter.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-2 mb-8">
            {TAGS.map((t, i) => (
              <motion.span key={i} whileHover={{ borderColor: "rgba(221,162,33,0.55)", color: "rgba(221,162,33,1)", backgroundColor: "rgba(221,162,33,0.08)", y: -3, transition: { duration: 0.18 } }} className="px-3 py-1.5 text-[10px] tracking-[3px] uppercase font-['Oswald'] text-[#DDA221]/50 border border-[#DDA221]/15 cursor-default select-none">
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.a
            href="#booking"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ backgroundColor: "#DDA221", color: "#050404", y: -4, boxShadow: "0 12px 40px rgba(221,162,33,0.35)", transition: { duration: 0.22 } }}
            className="inline-block px-8 md:px-12 py-4 md:py-5 border border-[#DDA221] text-[#DDA221] font-['Oswald'] text-sm tracking-[3px] uppercase"
            style={{ animation: "border-pulse 3s ease-in-out infinite" }}
          >
            BOOK OS TIL DIT EVENT →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
