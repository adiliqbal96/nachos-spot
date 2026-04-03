"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const items = [
  { num: "01", name: "LOADED NACHOS", desc: "Smeltet ost · jalapeños · salsa · creme fraiche", badge: "Klassiker" },
  { num: "02", name: "SPICY CHICKEN", desc: "Krydret kylling · chipotle · frisk koriander", badge: "Hot" },
  { num: "03", name: "GUAC DELUXE", desc: "Hjemmelavet guac · dobbelt ost · pico de gallo", badge: "Fan fav" },
  { num: "04", name: "THE SPOT BOX", desc: "Alt på én bakke – til dem der ikke kan vælge", badge: "Signature" },
];

function MenuItem({ item, index }: { item: typeof items[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        alignItems: "center",
        padding: "0 5vw",
        borderTop: "1px solid rgba(240,230,208,0.06)",
        gap: 0,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        minHeight: 100,
        background: hovered ? "rgba(245,194,0,0.04)" : "transparent",
        transition: "background 0.3s",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: "var(--y)",
          transformOrigin: "bottom",
        }}
      />

      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 11, letterSpacing: "0.15em",
        color: "rgba(240,230,208,0.2)",
        padding: "28px 0",
      }}>
        {item.num}
      </div>

      <div style={{ padding: "28px 24px 28px 0" }}>
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(28px,4.5vw,60px)",
          lineHeight: 0.95, letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: hovered ? "var(--y)" : "#fff",
          transition: "color 0.25s",
        }}>
          {item.name}
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontStyle: "italic",
          fontSize: "clamp(12px,1.2vw,15px)",
          color: "rgba(240,230,208,0.35)",
          letterSpacing: "0.06em",
          marginTop: 5,
        }}>
          {item.desc}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "28px 0" }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
          border: "1px solid rgba(245,194,0,0.3)", color: "var(--y)",
          padding: "4px 10px",
        }}>
          {item.badge}
        </span>
        <span style={{
          fontSize: 22,
          color: hovered ? "var(--y)" : "rgba(240,230,208,0.15)",
          transform: hovered ? "translateX(5px)" : "none",
          transition: "color 0.2s, transform 0.2s",
        }}>→</span>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" style={{ padding: "0 0 clamp(60px,8vw,120px)", position: "relative", overflow: "hidden" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          padding: "clamp(40px,6vw,80px) 5vw 40px",
          display: "flex", alignItems: "center", gap: 20,
        }}
      >
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(42px,7vw,100px)",
          lineHeight: 1, letterSpacing: "-0.01em",
          textTransform: "uppercase", color: "#fff",
          whiteSpace: "nowrap",
        }}>
          SPOT <span style={{ color: "var(--y)" }}>MENU</span>
        </h2>
        <div style={{ flex: 1, height: 1, background: "rgba(240,230,208,0.07)" }} />
      </motion.div>

      {items.map((item, i) => (
        <MenuItem key={item.num} item={item} index={i} />
      ))}
      <div style={{ borderBottom: "1px solid rgba(240,230,208,0.06)" }} />
    </section>
  );
}
