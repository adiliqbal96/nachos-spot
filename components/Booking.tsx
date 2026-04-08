"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useState } from "react";

export default function Booking() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/send_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj)
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  return (
    <section
      id="booking"
      className="relative min-h-screen py-24 px-[5vw] overflow-hidden flex items-center bg-[#050404] scroll-mt-20"
    >
      {/* Background — warmer cart photo */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={img("/images/cart.jpg")}
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
        <div className="flex-1 w-full bg-[#050404]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 md:p-12 relative overflow-hidden rounded-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA221]/15 rounded-full blur-[90px] pointer-events-none" />
          
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
            >
              <div className="w-20 h-20 bg-[#DDA221]/20 rounded-full flex items-center justify-center mb-6 border border-[#DDA221]/30 shadow-[0_0_30px_rgba(221,162,33,0.3)]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DDA221" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-3xl text-white font-['Bangers'] tracking-widest mb-4">TAK FOR DIN FORESPØRGSEL!</h3>
              <p className="text-[#8A8582] font-light max-w-sm">Vi har modtaget din besked og vender tilbage til dig inden for 24 timer med et festligt tilbud.</p>
              <button onClick={() => setStatus("idle")} className="mt-8 text-[#DDA221] font-['Oswald'] text-sm tracking-[3px] uppercase hover:text-white transition-colors">
                Send en ny besked
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-8 w-full max-w-md ml-auto relative z-10"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="source" value="one-com" />

              {[
                { name: "navn", label: "Dit Navn", type: "text" },
                { name: "email", label: "E-mail", type: "email" },
                { name: "event", label: "Event Type (Firma, Bryllup etc.)", type: "text" },
                { name: "guests", label: "Estimeret antal gæster", type: "text" },
                { name: "dato", label: "Dato og Lokation", type: "text" },
              ].map((field, i) => (
                <div key={i} className="relative z-0 w-full group">
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    className="block py-3 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-[#DDA221] peer transition-colors font-medium relative z-10"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute text-sm font-['Oswald'] tracking-[3px] uppercase text-white/70 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:left-0 peer-focus:text-[#DDA221] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7"
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              <div className="relative z-0 w-full group mt-2">
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  className="block py-3 px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-[#DDA221] peer transition-colors resize-none font-medium relative z-10"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute text-sm font-['Oswald'] tracking-[3px] uppercase text-white/70 duration-300 transform -translate-y-6 scale-75 top-3 z-0 origin-[0] peer-focus:left-0 peer-focus:text-[#DDA221] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-7"
                >
                  Ekstra besked eller særlige ønsker
                </label>
              </div>

              {status === "error" && (
                <div className="text-red-500 font-['Oswald'] tracking-wider text-xs">
                  Der opstod en fejl. Prøv venligst igen, eller skriv til os direkte.
                </div>
              )}

              <div className="flex flex-col gap-4 mt-6">
                <motion.button
                  whileHover={{ backgroundColor: "#DDA221", color: "#050404" }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-5 border border-[#DDA221] text-[#DDA221] font-['Oswald'] text-sm tracking-[3px] uppercase transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-[#DDA221]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      SENDER...
                    </span>
                  ) : "SEND FORESPØRGSEL"}
                </motion.button>
                <div className="text-white/40 text-[10px] tracking-[2px] uppercase font-['Oswald'] text-center">
                  Eller skriv direkte til <a href="mailto:Nachosspott@gmail.com" className="text-[#DDA221] hover:underline">Nachosspott@gmail.com</a>
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
