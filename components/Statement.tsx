"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Statement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="statement"
      style={{
        padding: "clamp(60px,10vw,140px) 5vw",
        position: "relative",
        borderBottom: "1px solid rgba(240,230,208,0.06)",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 40,
          alignItems: "end",
        }}
      >
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(240,230,208,0.3)",
          paddingBottom: 8,
          borderBottom: "1px solid rgba(240,230,208,0.1)",
          alignSelf: "start", marginTop: 16,
        }}>
          Hvem vi er<br />&amp; hvad vi gør
        </div>
        <div>
          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(36px,6vw,88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#fff",
          }}>
            IKKE<br />
            EN{" "}
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)", color: "transparent" }}>
              RESTAURANT
            </span>.<br />
            VI{" "}
            <span style={{ color: "var(--y)" }}>FINDER DIG.</span>
          </div>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontSize: "clamp(15px,1.5vw,19px)",
            color: "rgba(240,230,208,0.45)",
            lineHeight: 1.55,
            marginTop: 28,
            maxWidth: 480,
          }}>
            Nachos Spot kører nachosvognen til din dør. Fester, firmafejringer, markeder, festivaler.
            Frisklavet på stedet. Altid for meget ost.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
