"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        height: "100vh", minHeight: 600,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "flex-end",
      }}
    >
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(11,6,3,0.7) 100%),
          radial-gradient(ellipse 80% 60% at 55% 35%, rgba(210,90,0,0.35) 0%, transparent 65%),
          radial-gradient(ellipse 100% 50% at 50% 100%, rgba(11,6,3,0.9) 0%, transparent 60%),
          #1c0d04`,
      }} />

      {/* Parallax food image */}
      <motion.div
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          height: "100%", width: "55vw",
          y,
        }}
      >
        <Image
          src="/hero.png"
          alt="Nachos Spot"
          fill
          priority
          quality={90}
          sizes="55vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 28%, black 52%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 28%, black 52%)",
          }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ position: "relative", zIndex: 2, padding: "0 5vw 7vh", width: "100%", opacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontSize: "clamp(13px,1.4vw,17px)",
            letterSpacing: "0.1em",
            color: "var(--y)",
            marginBottom: 12,
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <span style={{ width: 40, height: 1, background: "var(--y)", display: "inline-block" }} />
          Nachosvogn til events
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(68px,14vw,200px)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          MELT<br />
          <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)", color: "transparent" }}>EVERY</span><br />
          <span style={{ color: "var(--y)" }}>NIGHT</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginTop: 24,
          }}
        >
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontSize: "clamp(15px,1.8vw,22px)",
            color: "rgba(240,230,208,0.5)",
            letterSpacing: "0.06em",
            maxWidth: 400, lineHeight: 1.45,
          }}>
            Vi ruller ind. Osten smelter. Festen starter.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <a
              href="#booking"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(14px,1.4vw,18px)",
                letterSpacing: "0.15em", textTransform: "uppercase",
                background: "var(--y)", color: "var(--ink)",
                padding: "14px 36px", textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = "var(--hot)";
                el.style.color = "#fff";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = "var(--y)";
                el.style.color = "var(--ink)";
                el.style.transform = "none";
              }}
            >
              Book en dato →
            </a>
            <a
              href="#menu"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(240,230,208,0.3)", textDecoration: "none",
                borderBottom: "1px solid rgba(240,230,208,0.15)", paddingBottom: 1,
              }}
            >
              Hvad vi laver
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <div style={{
        position: "absolute", bottom: 0, left: "5vw",
        width: 1, height: 80,
        background: "linear-gradient(to bottom, transparent, rgba(245,194,0,0.5))",
        zIndex: 2,
      }} />
    </section>
  );
}
