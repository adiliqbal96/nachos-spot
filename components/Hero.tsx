"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const mouseX = useMotionValue(960);
  const mouseY = useMotionValue(540);
  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 20 });
  const rotateY = useTransform(smoothX, [0, 1920], [-4, 4]);
  const rotateX = useTransform(smoothY, [0, 1080], [2.5, -2.5]);

  const btnX = useSpring(0, { stiffness: 280, damping: 22 });
  const btnY = useSpring(0, { stiffness: 280, damping: 22 });

  function onSectionMouseMove(e: React.MouseEvent<HTMLElement>) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  function onBtnMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - r.left - r.width / 2) * 0.45);
    btnY.set((e.clientY - r.top - r.height / 2) * 0.45);
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={onSectionMouseMove}
      className="relative min-h-screen flex items-center justify-start overflow-hidden px-[5vw] pt-24 scroll-mt-0"
    >
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120vh]">
        <Image
          src="/images/hero-founders.png"
          alt="Nachos Spot Founders"
          fill
          priority
          className="object-contain md:object-cover object-center md:object-[center_20%]"
          style={{ animation: "slowZoom 12s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-[#050404]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: "blur(0.6px)", animation: "heatWave 6s ease-in-out infinite" }} />
      </motion.div>

      {/* Content — full width on mobile, 65% on desktop */}
      <motion.div
        className="relative z-10 w-full max-w-full lg:max-w-[65%]"
        style={{ rotateY, rotateX, transformPerspective: 1400 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="kicker"
        >
          INGEN FRYSERE — BARE SMELTET OST
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-start mb-6 md:mb-10"
        >
          {/* VI SMELTER OST */}
          <div
            className="text-[clamp(48px,10vw,140px)] leading-[0.9] uppercase tracking-wide relative inline-block"
            style={{ fontFamily: "var(--font-bangers)" }}
          >
            <motion.span
              className="text-transparent"
              style={{ WebkitTextStroke: "6px #1a0a00" }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1, delay: 4.2, ease: "easeOut" }}
            >
              VI SMELTER OST
            </motion.span>

            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(-10px -10px -10px -10px)" }}
              transition={{ duration: 3, delay: 1, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-0 left-0 w-full text-[#DDA221]"
              style={{ mixBlendMode: "screen", textShadow: "2px 2px 0 #1a0a00, -2px 2px 0 #1a0a00, 2px -2px 0 #1a0a00, -2px -2px 0 #1a0a00" }}
            >
              VI SMELTER OST
            </motion.div>

            {/* Falling droplets */}
            <div className="absolute top-[100%] left-0 w-full h-[100px] pointer-events-none overflow-hidden">
              {[20, 35, 65, 80].map((left, i) => (
                <motion.div
                  key={i}
                  initial={{ top: "-10px", opacity: 0, scaleY: 0.5 }}
                  animate={{ top: "100%", opacity: [0, 1, 0], scaleY: 1.5 }}
                  transition={{ duration: 1.5 + i * 0.4, repeat: Infinity, delay: 2 + i * 0.7, ease: "easeIn" }}
                  className="absolute w-[5px] h-[16px] bg-[#DDA221] rounded-full drop-shadow-md"
                  style={{ left: `${left}%` }}
                />
              ))}
            </div>
          </div>

          {/* TIL DIN FEST */}
          <div
            className="text-[clamp(32px,6vw,80px)] text-white tracking-wide mt-4 drop-shadow-2xl"
            style={{ fontFamily: "var(--font-bangers)" }}
          >
            TIL DIN FEST
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(16px,2vw,24px)] text-[#8A8582] font-light max-w-2xl mb-8 md:mb-10"
        >
          Vi ruller ind. Osten smelter. Gæsterne glemmer det aldrig.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
          <motion.a
            href="#booking"
            onMouseMove={onBtnMouseMove}
            onMouseLeave={() => { btnX.set(0); btnY.set(0); }}
            style={{
              x: btnX,
              y: btnY,
              fontFamily: "var(--font-bangers)",
              animation: "border-pulse 2.5s ease-in-out infinite",
            }}
            className="inline-block px-8 md:px-12 py-4 md:py-5 border border-[#DDA221] text-[#DDA221] text-lg md:text-xl tracking-[3px] uppercase transition-colors duration-300 hover:bg-[#DDA221] hover:text-[#050404]"
          >
            SÆT OS PÅ DIT EVENT →
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
