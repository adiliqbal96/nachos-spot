"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const cells = [
  { src: "/cart.jpg", span: "tall", label: "Instagram →" },
  { src: "/cheese.jpg", label: "→" },
  { src: "/warmer.jpg", label: "→" },
  { src: null, label: "→" },
  { src: null, label: "→" },
];

export default function Social() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="social" style={{ padding: "0 0 clamp(60px,8vw,100px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{
          padding: "0 5vw clamp(24px,3vw,36px)",
          display: "flex", alignItems: "baseline",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}
      >
        <span style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(13px,1.3vw,17px)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(240,230,208,0.3)", fontWeight: 400,
        }}>
          Følg med på
        </span>
        <a
          href="https://instagram.com/nachosspot"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(28px,4vw,52px)",
            letterSpacing: "-0.01em", textTransform: "uppercase",
            color: "#fff", textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--y)")}
          onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
        >
          <span style={{ color: "var(--y)" }}>@</span>nachosspot
        </a>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
        gridTemplateRows: "200px 200px",
        gap: 3,
      }}>
        {/* Tall cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.6 }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: "#170a01",
            position: "relative", overflow: "hidden",
            cursor: "pointer", gridRow: "span 2",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            transform: hovered === 0 ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}>
            <Image src="/cart.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
          <div style={{
            position: "absolute", inset: 0,
            background: hovered === 0 ? "rgba(11,6,3,0.5)" : "rgba(11,6,3,0)",
            transition: "background 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2,
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#fff", opacity: hovered === 0 ? 1 : 0, transition: "opacity 0.3s",
            }}>
              Instagram →
            </span>
          </div>
        </motion.div>

        {[
          { src: "/cheese.jpg", pos: "center 30%", delay: 0.1 },
          { src: "/warmer.jpg", pos: "center 20%", delay: 0.2 },
        ].map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: cell.delay, duration: 0.6 }}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}
            style={{ background: "#170a01", position: "relative", overflow: "hidden", cursor: "pointer" }}
          >
            <div style={{
              position: "absolute", inset: 0,
              transform: hovered === i + 1 ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}>
              <Image src={cell.src} alt="" fill style={{ objectFit: "cover", objectPosition: cell.pos }} />
            </div>
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: hovered === i + 1 ? "rgba(11,6,3,0.5)" : "rgba(11,6,3,0)",
              transition: "background 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12, letterSpacing: "0.2em",
                color: "#fff", opacity: hovered === i + 1 ? 1 : 0, transition: "opacity 0.3s",
              }}>→</span>
            </div>
          </motion.div>
        ))}

        {/* SVG nachos cells */}
        {[
          {
            bg: "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(200,80,0,0.4), #140b02 70%)",
            delay: 0.3,
          },
          {
            bg: "radial-gradient(ellipse 60% 70% at 40% 50%, rgba(160,100,0,0.35), #120903 70%)",
            delay: 0.4,
          },
        ].map((cell, i) => (
          <motion.div
            key={i + 3}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: cell.delay, duration: 0.6 }}
            onMouseEnter={() => setHovered(i + 3)}
            onMouseLeave={() => setHovered(null)}
            style={{ background: cell.bg, position: "relative", overflow: "hidden", cursor: "pointer" }}
          >
            <div style={{
              position: "absolute", inset: 0,
              transform: hovered === i + 3 ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="90%" height="90%" viewBox="0 0 200 200" fill="none">
                <path d="M30 170 L100 40 L170 170Z" fill="#D97000" opacity="0.7" />
                <path d="M60 170 Q80 130 68 100" stroke="#F5C200" strokeWidth="13" strokeLinecap="round" fill="none" opacity="0.75" />
                <ellipse cx="95" cy="162" rx="55" ry="20" fill="#F5C200" opacity="0.65" />
                <ellipse cx="75" cy="148" rx="13" ry="7.5" fill="#1a6600" opacity="0.85" transform="rotate(-15)" />
                <ellipse cx="120" cy="140" rx="12" ry="7" fill="#206600" opacity="0.8" transform="rotate(10)" />
              </svg>
            </div>
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: hovered === i + 3 ? "rgba(11,6,3,0.5)" : "rgba(11,6,3,0)",
              transition: "background 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12, letterSpacing: "0.2em",
                color: "#fff", opacity: hovered === i + 3 ? 1 : 0, transition: "opacity 0.3s",
              }}>→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
