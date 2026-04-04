"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(ease * to));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString("da-DK")}{suffix}</span>;
}

const TICKER = [
  "FIRMAFESTER", "BRYLLUPPER", "FESTIVALER", "STUDENTERFESTER",
  "KONCERTER", "PRIVATFESTER", "MARKEDER", "TEAMBUILDING",
];

export default function Stats() {
  return (
    <section className="relative border-y border-[#DDA221]/15 bg-[#050404] overflow-hidden">
      <div className="py-16 px-[5vw] max-w-7xl mx-auto grid grid-cols-3 divide-x divide-[#DDA221]/10">
        {[
          { to: 847,   suffix: "+", label: "EVENTS SERVERET" },
          { to: 14000, suffix: "+", label: "GÆSTER MÆTTE"   },
          { to: 0,     suffix: "",  label: "KOMPROMISER"     },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="text-center py-4"
          >
            <div
              className="text-[clamp(52px,7vw,100px)] leading-none text-[#DDA221] mb-3"
              style={{
                fontFamily: "var(--font-bangers)",
                filter: "drop-shadow(0 0 22px rgba(221,162,33,0.6))",
              }}
            >
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <p className="text-[11px] tracking-[5px] text-[#8A8582] font-['Oswald']">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Marquee ticker */}
      <div className="border-t border-[#DDA221]/10 py-3 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8 text-[10px] tracking-[5px] text-[#DDA221]/40 font-['Oswald'] uppercase"
            >
              {item}
              <span className="text-[#DDA221]/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
