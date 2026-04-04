"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";
import { useState } from "react";

const LINKS = [
  { label: "Start",       href: "#hero"       },
  { label: "Nachos",      href: "#experience" },
  { label: "Events",      href: "#events"     },
  { label: "Drinks",      href: "#drinks"     },
  { label: "Forespørgsel", href: "#booking"   },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-[5vw] py-4 flex justify-between items-center z-[100] bg-gradient-to-b from-[#050404]/90 to-transparent"
      >
        {/* Logo */}
        <a href="#hero" className="relative flex items-center" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.1, rotate: [0, -6, 5, -3, 0], transition: { duration: 0.5 } }}
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
          >
            <Image
              src={img("/images/logo-nachos-spot.png")}
              alt="Nachos Spot"
              width={220}
              height={94}
              className="object-contain w-[140px] md:w-[180px] lg:w-[220px] h-auto"
            />
          </motion.div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 z-[110]"
          aria-label="Menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-7 h-[2px] bg-[#DDA221] origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-7 h-[2px] bg-[#DDA221]"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-7 h-[2px] bg-[#DDA221] origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 bg-[#050404]/97"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-[#DDA221] font-['Bangers'] text-4xl tracking-[4px] uppercase"
                style={{ textShadow: "2px 2px 0 #1a0a00, -2px 2px 0 #1a0a00" }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
