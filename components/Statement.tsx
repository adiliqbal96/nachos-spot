"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { img } from "@/lib/basePath";

export default function Statement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="statement"
      className="relative min-h-screen py-24 px-[5vw] overflow-hidden bg-[#050404]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#DDA221]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-center"
        >
          {/* Left Column - Text & Image */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="font-['Oswald'] text-[10px] tracking-[4px] uppercase text-[#DDA221] mb-6">
              Hvem vi er & hvad vi gør
            </div>
            
            <h2 className="font-['Bangers'] text-[clamp(48px,8vw,90px)] leading-[0.9] tracking-widest text-white mb-6" style={{ textShadow: "3px 3px 0 #1a0a00" }}>
              IKKE EN<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}>RESTAURANT</span>.<br />
              <span className="text-[#DDA221]">VI FINDER DIG.</span>
            </h2>

            <p className="font-['Barlow'] font-light text-[16px] md:text-[18px] text-[#8A8582] leading-relaxed mb-10 max-w-md">
              Nachos Spot ruller direkte til din dør. Fester, firmafejringer, markeder og festivaler. Vi samler folk omkring den perfekte sprøde knas og den varme smeltede ost.
            </p>

            {/* Overlapping Image Placeholder */}
            <div className="relative w-full max-w-[300px] aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[#DDA221]/10 animate-pulse z-0" /> {/* Fallback loading pulse */}
              <img 
                src={img("/images/om-os-billede.jpg")} 
                alt="Om os" 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if(parent && !parent.querySelector('.fallback-text')) {
                    const div = document.createElement('div');
                    div.className = 'fallback-text absolute inset-0 flex items-center justify-center text-[#DDA221] font-["Oswald"] tracking-widest text-sm text-center px-4 bg-[#111]';
                    div.innerHTML = 'INDSÆT BILLEDE<br><span class="text-[10px] text-white/50 mt-2 block">public/images/om-os-billede.jpg</span>';
                    parent.appendChild(div);
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column - Video Placeholder */}
          <div className="lg:col-span-7 relative">
            <div className="w-full aspect-video md:aspect-[16/10] bg-[#111] border border-white/5 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
              <video 
                src={img("/videos/om-os-video.mp4")} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if(parent && !parent.querySelector('.fallback-text')) {
                    const div = document.createElement('div');
                    div.className = 'fallback-text absolute inset-0 flex items-center justify-center text-[#DDA221] font-["Oswald"] tracking-widest text-xl bg-[#111] border border-white/5';
                    div.innerHTML = 'INDSÆT VIDEO<br><span class="text-[12px] text-white/50 mt-2 block font-["Barlow"]">Gem videoen som public/videos/om-os-video.mp4</span>';
                    parent.appendChild(div);
                  }
                }}
              />
            </div>

            {/* Cinematic overlay element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#DDA221]/10 rounded-full blur-[60px] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
