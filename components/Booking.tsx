"use client";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

function FormLine({ label, children }: { label: string; children: React.ReactNode }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 0,
        borderBottom: "1px solid rgba(240,230,208,0.1)",
      }}
    >
      <label style={{
        display: "block",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
        color: "rgba(240,230,208,0.3)",
        paddingTop: 18,
      }}>
        {label}
      </label>
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </div>
      <motion.div
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", bottom: -1, left: 0,
          height: 1, background: "var(--y)",
        }}
      />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none", outline: "none",
  fontFamily: "'Oswald', sans-serif",
  fontSize: "clamp(20px,2.5vw,30px)",
  color: "#fff", letterSpacing: "0.02em",
  padding: "6px 0 16px",
};

export default function Booking() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="booking" style={{
      padding: "clamp(70px,10vw,140px) 5vw",
      position: "relative", overflow: "hidden",
    }}>
      {/* Big watermark */}
      <div style={{
        position: "absolute", right: "-3vw", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Oswald', sans-serif",
        fontSize: "32vw", lineHeight: 1,
        letterSpacing: "-0.04em",
        color: "rgba(240,230,208,0.025)",
        pointerEvents: "none", textTransform: "uppercase",
        userSelect: "none",
      }}>
        BOOK
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 0, maxWidth: 1200,
        }}
      >
        {/* Left */}
        <div style={{
          paddingRight: "clamp(30px,5vw,80px)",
          borderRight: "1px solid rgba(240,230,208,0.07)",
          paddingBottom: "clamp(40px,5vw,60px)",
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "var(--y)", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: "var(--y)", display: "block" }} />
            Book Nachos Spot
          </div>

          <div style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(42px,7vw,96px)",
            lineHeight: 0.88, letterSpacing: "-0.02em",
            textTransform: "uppercase", color: "#fff",
            marginBottom: "clamp(20px,3vw,36px)",
          }}>
            HVORNÅR<br />ER{" "}
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}>DU</span><br />
            KLAR?
          </div>

          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontSize: "clamp(15px,1.5vw,19px)",
            color: "rgba(240,230,208,0.4)",
            lineHeight: 1.55, maxWidth: 360,
            marginBottom: "clamp(28px,3vw,44px)",
          }}>
            Udfyld formularen. Vi vender tilbage inden for 24 timer med pris og dato.
          </p>

          <div style={{ borderTop: "1px solid rgba(240,230,208,0.07)" }}>
            {[
              "Kører til hele Danmark",
              "Fra 30 til 2000+ gæster",
              "Vi medbringer alt udstyr",
              "Frisklavet mad på stedet",
            ].map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(240,230,208,0.07)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(14px,1.3vw,17px)",
                  letterSpacing: "0.04em",
                  color: "rgba(240,230,208,0.45)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                {fact}
                <span style={{ color: "rgba(240,230,208,0.15)", fontSize: 14 }}>→</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - form */}
        <div style={{ paddingLeft: "clamp(30px,5vw,80px)", paddingTop: 10 }}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                height: "100%", textAlign: "center", gap: 16,
              }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                border: "2px solid var(--y)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, color: "var(--y)",
              }}>✓</div>
              <div style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(24px,3vw,40px)",
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: "#fff",
              }}>
                SENDT!
              </div>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(15px,1.5vw,18px)",
                color: "rgba(240,230,208,0.5)",
              }}>
                Vi vender tilbage inden for 24 timer →
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ borderTop: "1px solid rgba(240,230,208,0.1)" }}>
                <FormLine label="Navn">
                  <input type="text" placeholder="Hvad hedder du?" required style={inputStyle} />
                </FormLine>
                <FormLine label="Email">
                  <input type="email" placeholder="din@email.dk" required style={inputStyle} />
                </FormLine>
                <FormLine label="Dato">
                  <input type="text" placeholder="Hvornår er dit event?" style={inputStyle} />
                </FormLine>
                <FormLine label="Type event">
                  <select required style={{ ...inputStyle, appearance: "none" }}>
                    <option value="" disabled>Vælg type →</option>
                    <option>Privatfest</option>
                    <option>Firmaevent</option>
                    <option>Festival / marked</option>
                    <option>Andet</option>
                  </select>
                </FormLine>
                <FormLine label="Besked">
                  <textarea
                    placeholder="Antal gæster, sted, ønsker..."
                    style={{ ...inputStyle, resize: "none", height: 72, fontSize: "clamp(16px,2vw,22px)" }}
                  />
                </FormLine>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  marginTop: 28, width: "100%",
                  background: "transparent",
                  border: "1px solid var(--y)",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(18px,2vw,24px)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--y)",
                  padding: 18, cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "var(--y)";
                  el.style.color = "var(--ink)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "transparent";
                  el.style.color = "var(--y)";
                }}
              >
                Send forespørgsel →
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
