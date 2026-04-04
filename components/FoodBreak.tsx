"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useRef } from "react";

const USPS = [
  {
    title: "ALTID INKLUDERET",
    body: "Sprøde tortillachips overdænget med vores hemmelige, varme cheddar-sauce og creme fraiche.",
  },
  {
    title: "GÆSTERNE BESTEMMER VARMEN",
    body: "Frisk chunky salsa og jalapeños — gæsterne topper selv, præcis som de vil have det.",
  },
];

const STEAM = [
  { x: "38%", delay: 0,   dur: 3.8, drift: -18 },
  { x: "55%", delay: 1.2, dur: 4.4, drift: 14  },
];

export default function FoodBreak() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-24 px-[5vw] overflow-hidden scroll-mt-20 flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(180,70,0,0.07) 0%, transparent 65%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-between py-4">

        {/* Text */}
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="kicker"
          >
            SIMPELT. SINDSSYGT GODT.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <div
              className="text-[clamp(36px,6vw,80px)] leading-[0.95] tracking-wide text-[#DDA221]"
              style={{ fontFamily: "var(--font-bangers)", textShadow: "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00, 3px -3px 0 #1a0a00, -3px -3px 0 #1a0a00" }}
            >
              DEN PERFEKTE
            </div>
            <div
              className="text-[clamp(36px,6vw,80px)] leading-[0.95] tracking-wide text-white"
              style={{ fontFamily: "var(--font-bangers)", textShadow: "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00, 3px -3px 0 #1a0a00, -3px -3px 0 #1a0a00" }}
            >
              NACHOS BAKKE
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(15px,1.8vw,22px)] text-[#8A8582] font-light max-w-xl mb-8 leading-relaxed"
          >
            Ingen menukort. Ingen bøvl.
            <br />
            Vi ruller ind, osten smelter, og gæsterne får noget de faktisk husker.
          </motion.p>

          <div className="flex flex-col gap-6 mt-2">
            {USPS.map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-[6px] shrink-0 w-3 h-3 rounded-full bg-[#DDA221]"
                  style={{ boxShadow: "0 0 10px rgba(221,162,33,0.7), 0 0 24px rgba(221,162,33,0.35)" }}
                />
                <div>
                  <h3
                    className="text-[clamp(18px,2vw,28px)] tracking-wide mb-1 text-white"
                    style={{ fontFamily: "var(--font-bangers)", textShadow: "2px 2px 0 #1a0a00, -2px 2px 0 #1a0a00, 2px -2px 0 #1a0a00, -2px -2px 0 #1a0a00" }}
                  >
                    {usp.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#8A8582] font-light leading-snug">{usp.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image — shows below text on mobile, right on desktop */}
        <div className="flex-1 w-full relative">
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(200,90,0,0.32) 0%, rgba(180,60,0,0.12) 40%, transparent 70%)", filter: "blur(32px)", transform: "scale(1.15)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] md:aspect-[4/5] overflow-hidden z-10"
          >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 w-full h-full cinematic-fade-right">
              <Image src={img("/images/food-cheese-pour.jpg")} alt="Melted Cheese Over Nachos" fill className="object-cover" />
            </motion.div>

            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              {STEAM.map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-[18%]"
                  style={{ left: s.x, width: 28, height: 90 }}
                  animate={{ y: [0, -90], x: [0, s.drift], opacity: [0, 0.55, 0], scaleX: [0.7, 1.3] }}
                  transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
                >
                  <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at 50% 80%, rgba(255,200,120,0.45) 0%, transparent 70%)", filter: "blur(6px)", borderRadius: "50%" }} />
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050404]/60 z-10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
