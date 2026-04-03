"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "20px 36px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(11,6,3,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,194,0,0.08)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 22, letterSpacing: "0.12em",
          color: "var(--y)", textDecoration: "none", textTransform: "uppercase",
        }}
      >
        Nachos<sup style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 9, letterSpacing: "0.2em",
          color: "rgba(240,230,208,0.4)",
          verticalAlign: "super", marginLeft: 4,
        }}>Spot</sup>
      </a>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a href="#menu" style={linkStyle}>Menu</a>
        <a href="#events" style={linkStyle}>Events</a>
        <a
          href="#booking"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase",
            border: "1px solid var(--y)", color: "var(--y)",
            padding: "8px 20px", textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = "var(--y)";
            (e.target as HTMLElement).style.color = "var(--ink)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.color = "var(--y)";
          }}
        >
          Book os
        </a>
      </div>
    </motion.nav>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  color: "rgba(240,230,208,0.45)", textDecoration: "none",
  transition: "color 0.2s",
};
