"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useRef } from "react";

const USPS = [
  {
    title: "ALTID INKLUDERET",
    body: "Sprøde tortillachips overdænget med vores hemmelige, varme cheddar-sauce.",
  },
  {
    title: "DU BESTEMMER VARMEN",
    body: "Frisk chunky salsa og jalapeños — gæsterne topper selv, præcis som de vil have det.",
  },
];

const STEAM = [
  { x: "32%", delay: 0,   dur: 4, drift: -20 },
  { x: "48%", delay: 1.5, dur: 4.5, drift: 15  },
  { x: "65%", delay: 0.8, dur: 3.8, drift: -10 },
];

export default function FoodBreak() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0.1, 0.6], [1.15, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-20 isolate min-h-screen py-20 md:py-32 px-0 overflow-hidden bg-[#050404]"
    >
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(221,162,33,0.12)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[5vw]">
        {/* ── HEADER BLOCK ── */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <p className="text-[11px] md:text-13px tracking-[5px] text-[#DDA221] uppercase mb-4 font-['Oswald']">
            SIMPELT. SINDSSYGT GODT.
          </p>
          <div className="relative inline-block">
            <h2 
              className="text-[clamp(44px,12vw,96px)] leading-[0.85] tracking-tight text-white font-['Bangers']"
              style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.8)" }}
            >
              DEN PERFEKTE<br />
              <span className="text-[#DDA221]">NACHOS BAKKE</span>
            </h2>
          </div>
        </motion.div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* IMAGE & STEAM (Now primary on all devices) */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#DDA221]/20 to-transparent blur opacity-25" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] md:aspect-[4/3] w-full overflow-hidden border border-white/5 shadow-2xl"
              >
                <motion.div style={{ scale: imgScale }} className="absolute inset-0 w-full h-full">
                  <Image 
                    src={img("/images/food-cheese-pour.jpg")} 
                    alt="Melted Cheese Over Nachos" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Steam Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  {STEAM.map((s, i) => (
                    <motion.div 
                      key={i} 
                      className="absolute bottom-[10%] opacity-0" 
                      style={{ left: s.x, width: 40, height: 120 }} 
                      animate={{ 
                        y: [0, -120], 
                        x: [0, s.drift], 
                        opacity: [0, 0.4, 0], 
                        scaleX: [0.8, 1.5],
                        scaleY: [1, 1.2]
                      }} 
                      transition={{ 
                        duration: s.dur, 
                        delay: s.delay, 
                        repeat: Infinity, 
                        ease: "easeOut" 
                      }}
                    >
                      <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at 50% 80%, rgba(255,220,150,0.3) 0%, transparent 75%)", filter: "blur(8px)", borderRadius: "50%" }} />
                    </motion.div>
                  ))}
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent opacity-60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#DDA221]/10 via-transparent to-transparent z-10 pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* TEXT & USPS */}
          <div className="flex-1 w-full order-2 lg:order-1 flex flex-col gap-8 md:gap-12">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(16px,2vw,22px)] text-[#8A8582] font-light leading-relaxed max-w-xl"
            >
              Uden dikkedarer og bøvlede menukort. Vi ruller ind, osten smelter, og gæsterne får noget, de rent faktisk husker. Det er sprødt, det er varmt, og det er præcis som det skal være.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-10">
              {USPS.map((usp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  className="flex gap-5 items-start bg-white/[0.02] border border-white/5 p-6 rounded-sm hover:border-[#DDA221]/30 transition-colors group"
                >
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#DDA221] group-hover:scale-150 transition-transform shadow-[0_0_12px_rgba(221,162,33,0.8)]" />
                  <div>
                    <h3 className="text-xl tracking-wide mb-2 text-white font-['Oswald'] uppercase font-medium group-hover:text-[#DDA221] transition-colors">{usp.title}</h3>
                    <p className="text-[14px] md:text-base text-[#8A8582] font-light leading-snug">{usp.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
