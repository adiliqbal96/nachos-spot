"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function FoodBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      style={{
        width: "100%",
        height: "clamp(260px,35vw,520px)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
      }}
    >
      <motion.div style={{ position: "absolute", inset: 0, scale }}>
        <Image
          src="/warmer.jpg"
          alt="Nachos på stedet"
          fill
          style={{
            objectFit: "cover", objectPosition: "center 30%",
            opacity: 0.4, filter: "saturate(1.3)",
          }}
        />
      </motion.div>

      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to right, rgba(11,6,3,0.85) 0%, transparent 35%, transparent 65%, rgba(11,6,3,0.85) 100%),
          linear-gradient(to bottom, rgba(11,6,3,0.4) 0%, transparent 30%, transparent 70%, rgba(11,6,3,0.6) 100%)`,
      }} />

      <div style={{ position: "relative", zIndex: 2, padding: "0 5vw" }}>
        <strong style={{
          display: "block",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(13px,1.5vw,20px)",
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "var(--y)", fontWeight: 400,
          marginBottom: 16,
        }}>
          Altid frisklavet på stedet
        </strong>
        <p style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(52px,10vw,140px)",
          lineHeight: 0.9, letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.06)",
        }}>
          INGEN KOMPROMISER
        </p>
      </div>
    </motion.div>
  );
}
