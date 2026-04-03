"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function EventCell({
  children, className, style, delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function Events() {
  const [hovered, setHovered] = useState<number | null>(null);

  const cellBase: React.CSSProperties = {
    background: "var(--ink)",
    position: "relative", overflow: "hidden",
    display: "flex", flexDirection: "column", justifyContent: "flex-end",
    minHeight: 240,
  };

  const grad: React.CSSProperties = {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(11,6,3,0.95) 0%, rgba(11,6,3,0.2) 50%, transparent 100%)",
  };

  const content: React.CSSProperties = {
    position: "relative", zIndex: 2,
    padding: "clamp(20px,2.5vw,32px)",
  };

  const evType: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
    color: "var(--y)", marginBottom: 8,
  };

  const evName: React.CSSProperties = {
    fontFamily: "'Oswald', sans-serif",
    fontSize: "clamp(22px,3vw,42px)",
    lineHeight: 0.95, letterSpacing: "0.01em",
    textTransform: "uppercase", color: "#fff",
  };

  const evSub: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontStyle: "italic",
    fontSize: "clamp(12px,1vw,14px)",
    color: "rgba(240,230,208,0.4)",
    letterSpacing: "0.05em", marginTop: 6,
  };

  return (
    <section id="events" style={{ padding: "clamp(60px,8vw,120px) 0 0", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "0 5vw clamp(40px,5vw,70px)" }}
      >
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(11px,1.1vw,14px)",
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(240,230,208,0.3)", fontWeight: 400,
          marginBottom: 16,
        }}>
          Til dit event
        </h2>
        <p style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(36px,6vw,80px)",
          lineHeight: 0.92, letterSpacing: "-0.01em",
          textTransform: "uppercase", color: "#fff",
          maxWidth: 700,
        }}>
          VI RYKKER UD.<br />
          DU <span style={{ color: "var(--y)" }}>NYDER</span> DET.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gridTemplateRows: "auto auto",
        gap: 3,
      }}>
        {/* Tall cell - Fester */}
        <EventCell delay={0.1} style={{ ...cellBase, gridRow: "span 2", minHeight: 480 }}>
          <Image
            src="/cart.jpg" alt="Fester og fejringer" fill
            style={{ objectFit: "cover", objectPosition: "center",
              transform: hovered === 0 ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          />
          <div style={grad} />
          <div style={content}>
            <div style={evType}>Privat</div>
            <div style={evName}>FESTER &amp;<br />FEJRINGER</div>
            <div style={evSub}>Fødselsdage · Bryllupper · Dimissioner</div>
          </div>
        </EventCell>

        {/* Firmaevents */}
        <EventCell delay={0.2} style={cellBase}>
          <Image
            src="/setup.jpg" alt="Firmaevents" fill
            style={{ objectFit: "cover", objectPosition: "center bottom",
              transform: hovered === 1 ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          />
          <div style={grad} />
          <div style={content}>
            <div style={evType}>Erhverv</div>
            <div style={evName}>FIRMA&shy;EVENTS</div>
            <div style={evSub}>Glem kaffe og croissanter</div>
          </div>
        </EventCell>

        {/* CTA cell */}
        <EventCell delay={0.3} style={{
          ...cellBase,
          background: "var(--y)",
          justifyContent: "center", alignItems: "flex-start",
          padding: "clamp(28px,3vw,44px)",
        }}>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(28px,4vw,56px)",
            lineHeight: 0.92, letterSpacing: "-0.01em",
            textTransform: "uppercase", color: "var(--ink)",
            marginBottom: 28,
          }}>
            HVORNÅR<br />ER DIT<br />NÆSTE<br />EVENT?
          </div>
          <a
            href="#booking"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: 13, letterSpacing: "0.2em",
              textTransform: "uppercase", textDecoration: "none",
              background: "var(--ink)", color: "var(--y)",
              padding: "12px 28px",
              transition: "background 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--hot)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--y)";
            }}
          >
            Book os nu →
          </a>
        </EventCell>

        {/* Festivaler - wide */}
        <EventCell delay={0.4} style={{ ...cellBase, gridColumn: "span 2" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 50% at 70% 40%, rgba(160,50,0,0.35), transparent 70%), #180d03",
          }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.38 }}
            viewBox="0 0 600 280" fill="none">
            <path d="M60 230 L180 60 L300 230Z" fill="#F5C200" opacity="0.65" />
            <path d="M200 240 L340 50 L480 240Z" fill="#D97000" opacity="0.6" />
            <path d="M400 235 L520 65 L600 235Z" fill="#E07800" opacity="0.55" />
            <path d="M255 190 Q275 155 260 125 Q245 95 260 65" stroke="#FFD700" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.7" />
            <ellipse cx="270" cy="185" rx="70" ry="25" fill="#F5C200" opacity="0.5" />
          </svg>
          <div style={grad} />
          <div style={content}>
            <div style={evType}>Outdoor</div>
            <div style={evName}>MARKEDER &amp; FESTIVALER</div>
            <div style={evSub}>Fra 50 til 5000 gæster · Vi klarer det hele</div>
          </div>
        </EventCell>
      </div>

      {/* Food strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginTop: 3 }}>
        {[
          { label: "Frisklavet", big: "PÅ STEDET", bg: "fc1" },
          { label: "Altid", big: "FOR MEGET OST", bg: "fc2" },
        ].map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
            style={{
              height: "clamp(180px,20vw,280px)",
              position: "relative", overflow: "hidden",
              display: "flex", alignItems: "flex-end",
              background: i === 0
                ? "radial-gradient(ellipse 70% 80% at 40% 50%, rgba(230,100,0,0.5), rgba(11,6,3,0.3) 70%), #1a0d03"
                : "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(190,150,0,0.4), rgba(11,6,3,0.3) 70%), #140a01",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(11,6,3,0.7) 0%, transparent 50%)",
            }} />
            <div style={{ position: "relative", zIndex: 2, padding: "clamp(16px,2vw,28px)" }}>
              <strong style={{
                display: "block",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "var(--y)",
                fontWeight: 400, marginBottom: 6,
              }}>
                {cell.label}
              </strong>
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(32px,5vw,70px)",
                lineHeight: 1, letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.06)",
              }}>
                {cell.big}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
