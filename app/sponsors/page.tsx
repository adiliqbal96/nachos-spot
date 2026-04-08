"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { img } from "@/lib/basePath";

export default function Sponsors() {
  return (
    <main className="relative bg-[#050404] min-h-screen flex flex-col pt-32 p-10 overflow-hidden">
      <Nav />
      
      <div className="relative z-10 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-[#DDA221] font-['Oswald'] tracking-[5px] uppercase text-sm">VORES PARTNERE</span>
          <h1 className="text-white font-['Bangers'] text-7xl md:text-8xl mt-4 tracking-wider" style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.8)" }}>
            SPONSORER
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative w-full aspect-video bg-white p-8 border border-white/10 hover:border-[#DDA221]/50 transition-all shadow-xl group-hover:scale-105">
              <Image 
                src={img("/images/sponsors/vogue.png")} 
                alt="Vogue" 
                fill 
                className="object-contain p-10 grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <span className="mt-6 text-white/50 font-['Oswald'] tracking-[3px] uppercase text-xs">OFFICIEL PARTNER</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative w-full aspect-video bg-white p-8 border border-white/10 hover:border-[#DDA221]/50 transition-all shadow-xl group-hover:scale-105">
              <Image 
                src={img("/images/sponsors/londonbooth.png")} 
                alt="Londonbooth" 
                fill 
                className="object-contain p-12 grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <span className="mt-6 text-white/50 font-['Oswald'] tracking-[3px] uppercase text-xs">STRATEGISK SAMARBEJDE</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <a 
            href="/" 
            className="text-[#DDA221] font-['Oswald'] tracking-[4px] uppercase text-sm border-b border-[#DDA221]/30 pb-2 hover:text-white transition-all"
          >
            ← Tilbage til Forsiden
          </a>
        </motion.div>
      </div>

      <Footer />

      {/* Background Decorative */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(221,162,33,0.05)_0%,transparent_70%)]" />
      </div>
    </main>
  );
}
