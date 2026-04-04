"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Booking() {
  return (
    <section
      id="booking"
      className="relative min-h-screen py-24 px-[5vw] overflow-hidden flex items-center bg-[#050404]"
    >
      {/* Background — warmer cart photo */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/cart.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050404] via-[#050404]/60 to-[#050404]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-[#050404]" />
        {/* Warm amber glow left side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 25% 55%, rgba(160,70,0,0.2) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center justify-between">
        {/* Left */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="kicker"
          >
            FÅ ET TILBUD INGEN KAN SLÅ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(40px,6vw,70px)] tracking-wide mb-8 text-[#DDA221]"
            style={{
              fontFamily: "var(--font-bangers)",
              textShadow:
                "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00, 3px -3px 0 #1a0a00, -3px -3px 0 #1a0a00",
            }}
          >
            DIT EVENT.<br />VORES OST.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(17px,1.8vw,22px)] text-[#8A8582] font-light max-w-lg"
          >
            Send en forespørgsel. Vi vender tilbage inden for 24 timer med et tilbud, der får din fest til at smage af mere.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3"
          >
            {["Svar inden for 24 timer", "Ingen binding — gratis tilbud"].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full bg-[#DDA221] shrink-0"
                  style={{ boxShadow: "0 0 8px rgba(221,162,33,0.6)" }}
                />
                <span className="text-sm tracking-[2px] uppercase font-['Oswald'] text-[#8A8582]">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — form */}
        <div className="flex-1 w-full">
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8 w-full max-w-md ml-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              "Dit Navn",
              "E-mail",
              "Event Type (Firma, Bryllup etc.)",
              "Estimeret antal gæster",
              "Dato og Lokation",
            ].map((placeholder, i) => (
              <motion.input
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                type={i === 1 ? "email" : "text"}
                placeholder={placeholder}
                required
                className="w-full bg-transparent border-0 border-b border-white/10 py-4 text-white text-xl font-light font-['Barlow'] outline-none transition-colors duration-300 focus:border-[#DDA221] placeholder:text-white/45 placeholder:font-['Oswald'] placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
              />
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ backgroundColor: "#DDA221", color: "#050404" }}
              type="submit"
              className="mt-6 w-full py-5 border border-[#DDA221] text-[#DDA221] font-['Oswald'] text-sm tracking-[3px] uppercase transition-colors duration-300"
            >
              SEND FORESPØRGSEL
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
