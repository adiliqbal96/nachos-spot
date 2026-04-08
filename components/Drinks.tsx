"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { img } from "@/lib/basePath";

const DRINKS = [
  { 
    name: "WILDBERRY", 
    img: img("/images/red-drink-wildberry.jpg"),    
    glow: "rgba(220,40,80,0.55)",  
    border: "rgba(220,40,80,0.35)",
    description: "En blend af søde sommerbær og et syrligt touch af lime. Smagen af sol og sommer, serveret iskoldt med masser af knust is. En sikker vinder for alle aldre.",
    ingredients: "Skovbær, Lime, Mynte, Is",
    color: "#DC2850"
  },
  { 
    name: "MEXIJUNGLE", 
    img: img("/images/green-drink-mexijungle.jpg"), 
    glow: "rgba(0,210,100,0.55)",  
    border: "rgba(0,210,100,0.35)",
    description: "Træd ind i junglen med vores signatur-drink. Præcis den rette balance mellem sød kiwi, frisk passionsfrugt og et grønt pift. Eksotisk og intens.",
    ingredients: "Kiwi, Passion, Lime, Is",
    color: "#00D264"
  },
  { 
    name: "SUNSTRIKE",  
    img: img("/images/yellow-drink-sunstrike.jpg"), 
    glow: "rgba(255,195,0,0.55)",  
    border: "rgba(255,195,0,0.35)",
    description: "En solskins-oplevelse i et glas. Friskpresset citrus kombineret med søde ananas-noter. Den perfekte tørstslukker efter en omgang varme nachos.",
    ingredients: "Citrus, Ananas, Mango, Is",
    color: "#FFC300"
  },
];

const ICE_LIME = [
  { type: "ice",  size: 30, left: "6%",  delay: 0,    dur: 5.8, rot: 15 },
  { type: "lime", size: 45, left: "16%", delay: 1.5,  dur: 4.6, rot: -22 },
  { type: "ice",  size: 38, left: "27%", delay: 0.8,  dur: 6.5, rot: 32 },
  { type: "ice",  size: 22, left: "38%", delay: 2.6,  dur: 5.1, rot: -12 },
  { type: "lime", size: 50, left: "50%", delay: 1.2,  dur: 4.8, rot: 28 },
  { type: "ice",  size: 34, left: "61%", delay: 2.3,  dur: 6.0, rot: -40 },
  { type: "lime", size: 40, left: "72%", delay: 1.2,  dur: 5.4, rot: 20 },
  { type: "ice",  size: 26, left: "82%", delay: 2.2,  dur: 5.0, rot: -18 },
  { type: "ice",  size: 16, left: "91%", delay: 1.9,  dur: 4.5, rot: 45 },
];

const BUBBLES = Array.from({ length: 15 }, (_, i) => ({
  size: 2 + (i % 4),
  left: `${((i * 6.7) % 94) + 3}%`,
  duration: 12 + (i % 6) * 3,
  delay: (i * 0.8) % 10,
  opacity: 0.12 + (i % 3) * 0.08,
}));

export default function Drinks() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [processedAssets, setProcessedAssets] = useState<Record<string, string>>({});

  useEffect(() => {
    const assets = [
      { type: "lime", src: img("/images/lime-slice-cartoon.png") },
      { type: "ice",  src: img("/images/ice-cube-cartoon.png") },
    ];

    const processImage = (src: string): Promise<string> => {
      return new Promise((resolve) => {
        const imgElement = new window.Image();
        imgElement.src = src;
        imgElement.crossOrigin = "anonymous";
        imgElement.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve("");
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            if (r < 40 && g < 40 && b < 40) data[i + 3] = 0;
          }
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        imgElement.onerror = () => {
          console.error("Failed to load: ", src);
          resolve(src);
        };
      });
    };

    Promise.all(assets.map(a => processImage(a.src))).then(results => {
      const mapping: Record<string, string> = {};
      assets.forEach((a, i) => { mapping[a.type] = results[i]; });
      setProcessedAssets(mapping);
    });
  }, []);

  return (
    <section
      id="drinks"
      className="relative py-24 px-[5vw] min-h-screen scroll-mt-20 overflow-hidden"
      style={{ background: "#050404" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={img("/images/drinks-setup.jpg")}
          alt=""
          fill
          className="object-cover"
          style={{ filter: "saturate(0.2) brightness(0.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050404] via-transparent to-[#050404]" />
      </div>

      {/* Atmospheric Effects: Ice, Lime, Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {ICE_LIME.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{
              y: "110vh",
              rotate: item.rot + 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: item.dur,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: item.left, width: item.size, height: item.size }}
          >
            {processedAssets[item.type] && (
              <img 
                src={processedAssets[item.type]} 
                alt="" 
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.4)]"
              />
            )}
          </motion.div>
        ))}

        {BUBBLES.map((b, i) => (
          <motion.div
            key={`b-${i}`}
            className="absolute rounded-full"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              x: [0, 15, -15, 0],
              opacity: [0, b.opacity, b.opacity, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              background: `rgba(200,240,255,${b.opacity})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker mb-4 text-center md:text-left"
        >
          KOLDT & FRISKT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(40px,7vw,90px)] tracking-wide mb-12 lg:mb-20 text-[#DDA221] text-center md:text-left"
          style={{
            fontFamily: "var(--font-bangers)",
            textShadow: "3px 3px 0 #1a0a00",
          }}
        >
          DRINKS TIL DIN FEST
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
          {DRINKS.map((drink, i) => (
            <div key={i} className="relative h-[500px]" style={{ perspective: "1000px" }}>
              {/* Front Side */}
              <motion.div 
                className="absolute inset-0 w-full h-full cursor-pointer"
                initial="rest"
                whileHover={flipped === i ? "rest" : "hover"}
                animate={{ rotateY: flipped === i ? -180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => setFlipped(flipped === i ? null : i)}
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <motion.div 
                  className="relative w-full h-full overflow-hidden border border-white/5 bg-[#0a0808]"
                  variants={{
                    rest: { boxShadow: `0 0 45px ${drink.glow.replace("0.55", "0.35")}` },
                    hover: { boxShadow: `0 0 90px ${drink.glow.replace("0.55", "0.7")}` }
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 z-0"
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image src={drink.img} alt={drink.name} fill className="object-cover" />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-[#050404]/20 to-transparent z-10 pointer-events-none" />
                  
                  {/* Sparkle/Shimmer Effect */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-1/2 z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      transform: "skewX(-20deg)"
                    }}
                    variants={{
                      rest: { left: "-100%", opacity: 0 },
                      hover: { left: "150%", opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 pointer-events-none">
                    <h3 className="text-3xl text-white font-['Bangers'] tracking-widest textShadow-sm">{drink.name}</h3>
                    <p className="text-[10px] tracking-[4px] uppercase text-[#DDA221] font-['Oswald'] mt-2">Tryk for info</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Back Side */}
              <motion.div 
                className="absolute inset-0 w-full h-full cursor-pointer"
                initial={false}
                animate={{ rotateY: flipped === i ? 0 : 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => setFlipped(flipped === i ? null : i)}
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <div 
                  className="w-full h-full bg-[#0a0808] border border-white/10 p-8 flex flex-col items-center justify-center text-center"
                  style={{ boxShadow: `inset 0 0 40px ${drink.glow.replace("0.55", "0.2")}` }}
                >
                  <div className="w-12 h-1.5 mb-6" style={{ background: drink.color }} />
                  <h3 className="text-4xl text-white font-['Bangers'] mb-4 tracking-widest" style={{ color: drink.color }}>{drink.name}</h3>
                  <p className="text-[17px] text-white/95 font-['Barlow'] font-medium leading-relaxed mb-8 max-w-sm drop-shadow-md">
                    {drink.description}
                  </p>
                  <div className="border-t border-white/10 pt-5 w-full">
                    <p className="text-[11px] tracking-[4px] uppercase text-[#DDA221] font-['Oswald'] mb-3 font-semibold">Ingredienser</p>
                    <p className="text-base text-white/90 font-['Oswald'] uppercase tracking-[3px] font-semibold">{drink.ingredients}</p>
                  </div>
                  <button className="mt-10 text-[12px] tracking-[4px] uppercase text-white/60 font-['Oswald'] hover:text-white transition-colors hover:scale-105 active:scale-95 duration-200">
                    Klik for at se billede
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
