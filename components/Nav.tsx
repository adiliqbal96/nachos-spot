"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full px-[5vw] py-6 flex justify-between items-center z-[100] bg-gradient-to-b from-[#050404]/90 to-transparent"
    >
      {/* Logo */}
      <a href="#hero" className="relative flex items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -6, 5, -3, 0],
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
        >
          <Image
            src="/images/logo-nachos-spot.png"
            alt="Nachos Spot"
            width={220}
            height={94}
            className="object-contain"
          />
        </motion.div>
      </a>

      {/* Nav links */}
      <div className="flex gap-8">
        <a href="#hero" className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">Start</a>
        <a href="#experience" className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">Nachos</a>
        <a href="#events" className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">Events</a>
        <a href="#drinks" className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">Drinks</a>
        <a href="#booking" className="text-white font-['Bangers'] text-xl tracking-[3px] uppercase transition-colors hover:text-[#DDA221]">Forespørgsel</a>
      </div>
    </motion.nav>
  );
}
