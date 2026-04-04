"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { img } from "@/lib/basePath";

const DRINKS = [
  { name: "MEXIJUNGLE", img: img("/images/green-drink-mexijungle.jpg"), glow: "rgba(0,210,100,0.55)",  border: "rgba(0,210,100,0.35)"  },
  { name: "WILDBERRY",  img: img("/images/red-drink-wildberry.jpg"),    glow: "rgba(220,40,80,0.55)",  border: "rgba(220,40,80,0.35)"  },
  { name: "SUNSTRIKE",  img: img("/images/yellow-drink-sunstrike.jpg"), glow: "rgba(255,195,0,0.55)",  border: "rgba(255,195,0,0.35)"  },
];

const ICE = [
  { size: 30, left: "6%",  delay: 0,    dur: 4.8, rot: 15  },
  { size: 18, left: "16%", delay: 1.0,  dur: 3.6, rot: -22 },
  { size: 38, left: "27%", delay: 0.4,  dur: 5.5, rot: 32  },
  { size: 22, left: "38%", delay: 1.6,  dur: 4.1, rot: -12 },
  { size: 14, left: "50%", delay: 0.7,  dur: 3.8, rot: 28  },
  { size: 34, left: "61%", delay: 1.3,  dur: 5.0, rot: -40 },
  { size: 20, left: "72%", delay: 0.2,  dur: 4.4, rot: 20  },
  { size: 26, left: "82%", delay: 1.8,  dur: 4.0, rot: -18 },
  { size: 16, left: "91%", delay: 0.9,  dur: 3.5, rot: 45  },
  { size: 24, left: "12%", delay: 2.2,  dur: 5.2, rot: -30 },
  { size: 12, left: "56%", delay: 2.8,  dur: 3.3, rot: 55  },
];

// Floating bubbles
const BUBBLES = Array.from({ length: 22 }, (_, i) => ({
  size: 2 + (i % 4),
  left: `${((i * 4.7) % 94) + 3}%`,
  duration: 10 + (i % 6) * 2,
  delay: (i * 0.6) % 8,
  opacity: 0.18 + (i % 3) * 0.12,
}));

// Condensation droplets per card
const DROPS = Array.from({ length: 20 }, (_, i) => ({
  w: 1 + (i % 3),
  h: 2 + (i % 4),
  x: `${((i * 7.1) % 86) + 7}%`,
  y: `${((i * 11.3) % 75) + 8}%`,
  opacity: 0.12 + (i % 4) * 0.07,
}));

export default function Drinks() {
  return (
    <section
      id="drinks"
      className="relative py-16 px-[5vw] overflow-hidden min-h-screen scroll-mt-20"
      style={{ background: "#050404" }}
    >
      {/* Background — cold-graded image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={img("/images/drinks-setup.jpg")}
          alt=""
          fill
          className="object-cover"
          style={{ filter: "saturate(0.2) brightness(0.08)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(221,162,33,0.04) 0%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050404] via-transparent to-[#050404]" />
      </div>

      {/* Falling ice cubes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ICE.map((cube, i) => (
          <motion.div
            key={`ice-${i}`}
            className="absolute"
            style={{
              left: cube.left,
              width: cube.size,
              height: cube.size,
              borderRadius: "3px 6px 4px 7px",
              background: "linear-gradient(135deg, rgba(220,242,255,0.22) 0%, rgba(180,215,255,0.06) 55%, rgba(200,230,255,0.14) 100%)",
              border: "1px solid rgba(215,238,255,0.38)",
              boxShadow: "inset 1px 1px 3px rgba(255,255,255,0.28), inset -1px -1px 2px rgba(140,195,255,0.1)",
              rotate: cube.rot,
              overflow: "hidden",
            }}
            animate={{
              y: ["-5vh", "115vh"],
              rotate: [cube.rot, cube.rot + 160],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: cube.dur,
              delay: cube.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.07, 0.93, 1],
            }}
          >
            <div style={{
              position: "absolute",
              top: "8%", left: "8%",
              width: "38%", height: "38%",
              background: "rgba(255,255,255,0.45)",
              borderRadius: "50% 30% 50% 30%",
              filter: "blur(2px)",
            }} />
          </motion.div>
        ))}
      </div>

      {/* Floating bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              bottom: "-8px",
              width: b.size,
              height: b.size,
              background: `rgba(180,228,255,${b.opacity})`,
              boxShadow: `0 0 ${b.size * 3}px rgba(180,228,255,0.25)`,
            }}
            animate={{
              y: [0, "-105vh"],
              x: [0, i % 2 === 0 ? 10 : -10],
              opacity: [0, b.opacity, b.opacity, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.08, 0.92, 1],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="kicker mb-4"
        >
          KOLDT & FRISKT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(36px,6vw,80px)] tracking-wide mb-8 lg:mb-16 text-[#DDA221]"
          style={{
            fontFamily: "var(--font-bangers)",
            textShadow:
              "3px 3px 0 #1a0a00, -3px 3px 0 #1a0a00, 3px -3px 0 #1a0a00, -3px -3px 0 #1a0a00",
          }}
        >
          DRINKS TIL DIN FEST
        </motion.h2>

        <div id="drinks-slider" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DRINKS.map((drink, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover="hover"
              animate="rest"
              variants={{
                rest: {
                  y: 0,
                  scale: 1,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 2px 20px ${drink.glow.replace("0.55", "0.2")}`,
                },
                hover: {
                  y: -14,
                  scale: 1.03,
                  boxShadow: `0 24px 60px ${drink.glow}, 0 8px 40px rgba(0,0,0,0.6)`,
                  transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                },
              }}
              className="relative overflow-hidden cursor-pointer"
              style={{
                background: "rgba(10,8,8,0.85)",
                border: `1px solid ${drink.border}`,
                backdropFilter: "blur(18px)",
              }}
            >
              {/* Drink image — name lives inside */}
              <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 45vh, 520px)" }}>
                {/* Image zoom on hover */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { scale: 1, filter: "brightness(0.9) saturate(1)" },
                    hover: {
                      scale: 1.06,
                      filter: "brightness(1.15) saturate(1.2)",
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Image
                    src={drink.img}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050404] via-transparent to-transparent z-10" />

                {/* Condensation droplets */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {DROPS.map((d, j) => (
                    <div
                      key={j}
                      className="absolute rounded-full"
                      style={{
                        left: d.x,
                        top: d.y,
                        width: d.w,
                        height: d.h,
                        background: `rgba(210,235,255,${d.opacity})`,
                        filter: "blur(0.4px)",
                      }}
                    />
                  ))}
                </div>

                {/* Shimmer sweep — loops every 6s */}
                <motion.div
                  className="absolute inset-0 z-30 pointer-events-none"
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(108deg, transparent 35%, rgba(200,235,255,0.18) 50%, transparent 65%)",
                  }}
                />

                {/* Cold mist on hover */}
                <motion.div
                  className="absolute inset-0 z-30 pointer-events-none"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1, transition: { duration: 0.4 } },
                  }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, rgba(200,235,255,0.14) 0%, transparent 65%)",
                  }}
                />

                {/* Name — inside the image over the fade */}
                <div className="absolute bottom-0 left-0 w-full px-5 pb-5 z-40 pointer-events-none">
                  <h3
                    className="text-[clamp(22px,2.5vw,34px)] text-white tracking-wide"
                    style={{
                      fontFamily: "var(--font-bangers)",
                      textShadow:
                        "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000",
                    }}
                  >
                    {drink.name}
                  </h3>
                </div>

                {/* Color border flash at bottom on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] z-50 pointer-events-none"
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1, transition: { duration: 0.4 } },
                  }}
                  style={{ background: drink.border, transformOrigin: "left" }}
                />
              </div>

              {/* Card border glow on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-[inherit] z-0"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.35 } },
                }}
                style={{
                  boxShadow: `inset 0 0 0 1px ${drink.border}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
