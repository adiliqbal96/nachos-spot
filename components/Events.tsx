"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const TAGS = ["Firmafest", "Bryllup", "Festival", "Privatfest", "Koncert", "Marked"];

const PHOTOS = [
  { src: "/images/event-setup-stand.jpg", alt: "Event stand" },
  { src: "/images/warmer.jpg",            alt: "Warmer"      },
  { src: "/images/food-cheese-pour.jpg",  alt: "Cheese pour" },
  { src: "/images/cart.jpg",              alt: "Nachos cart" },
];

export default function Events() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative min-h-screen py-20 lg:py-32 px-[5vw] overflow-hidden bg-[#050404]"
    >
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "10%", width: "60%", height: "80%", background: "radial-gradient(ellipse at 40% 50%, rgba(180,70,0,0.18) 0%, transparent 65%)", filter: "blur(50px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">

        {/* ── MOBILE: simple 2×2 grid ── */}
        <div className="grid grid-cols-2 gap-3 w-full lg:hidden">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative w-full aspect-square overflow-hidden"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.7)" }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* ── DESKTOP: scattered collage ── */}
        <div className="hidden lg:block flex-1 relative" style={{ minHeight: 700 }}>
          <motion.div style={{ y: yA, width: "62%", aspectRatio: "3/4", top: 0, left: 0, zIndex: 1 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-3deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8)" }}>
              <Image src="/images/event-setup-stand.jpg" alt="Event stand" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "46%", aspectRatio: "3/4", top: 30, right: 0, zIndex: 3 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "2.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(221,162,33,0.1)" }}>
              <Image src="/images/warmer.jpg" alt="Warmer" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yA, width: "48%", aspectRatio: "3/4", bottom: 0, left: "10%", zIndex: 4 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.28, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "1.5deg", boxShadow: "0 30px 70px rgba(0,0,0,0.9), 0 0 0 1px rgba(221,162,33,0.15)" }}>
              <Image src="/images/food-cheese-pour.jpg" alt="Cheese pour" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 via-transparent to-transparent" />
              <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(221,162,33,0.2)" }} />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yB, width: "40%", aspectRatio: "3/4", bottom: 20, right: "2%", zIndex: 5 }} className="absolute">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.38, ease: [0.25, 1, 0.5, 1] }} whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20, transition: { duration: 0.3 } }} className="relative w-full h-full overflow-hidden cursor-pointer" style={{ rotate: "-2deg", boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(221,162,33,0.12)" }}>
              <Image src="/images/cart.jpg" alt="Nachos cart" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050404]/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Text ── */}
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
