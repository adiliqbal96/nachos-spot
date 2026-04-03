"use client";
import { motion } from "framer-motion";

const items = [
  "Nachos Spot", "Fester", "Firmaevent", "Festivaler",
  "Vi ruller ind", "Hele Danmark", "Book os nu",
  "Nachos Spot", "Fester", "Firmaevent", "Festivaler",
  "Vi ruller ind", "Hele Danmark", "Book os nu",
];

export default function Ticker() {
  return (
    <div style={{
      background: "var(--y)",
      overflow: "hidden", whiteSpace: "nowrap",
      padding: "10px 0",
      position: "relative", zIndex: 2,
    }}>
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        style={{ display: "inline-flex", width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 17, letterSpacing: "0.1em",
              color: "var(--ink)", padding: "0 28px",
              textTransform: "uppercase",
            }}>
              {item}
            </span>
            <em style={{
              fontStyle: "normal",
              color: "rgba(11,6,3,0.3)",
              fontSize: 8,
            }}>·</em>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
