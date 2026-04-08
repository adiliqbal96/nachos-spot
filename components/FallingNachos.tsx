"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { img } from "@/lib/basePath";

interface Element {
  id: number;
  type: "nacho" | "sombrero";
  left: string;
  duration: number;
  delay: number;
  size: number;
  rotateOffset: number;
}

export default function FallingNachos() {
  const [elements, setElements] = useState<Element[]>([]);
  const [processedAssets, setProcessedAssets] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Process images to remove black background
  useEffect(() => {
    const assets = [
      { type: "nacho",    src: img("/images/falling-nacho-stylized.png") },
      { type: "sombrero", src: img("/images/sombrero-hat.png") },
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
          resolve(src); // Fallback to raw src to ensure it doesn't break
        };
      });
    };

    Promise.all(assets.map(a => processImage(a.src))).then(results => {
      const mapping: Record<string, string> = {};
      assets.forEach((a, i) => { mapping[a.type] = results[i]; });
      setProcessedAssets(mapping);
    });

    // Generate elements: Only Nachos and Sombreros for the first two pages
    const generated = Array.from({ length: 15 }).map((_, i) => {
      const types: ("nacho" | "sombrero")[] = ["nacho", "sombrero"];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 15,
        size: 50 + Math.random() * 80, 
        rotateOffset: Math.random() * 360,
      };
    });
    setElements(generated);
  }, []);

  if (Object.keys(processedAssets).length < 2) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-[200vh] pointer-events-none overflow-hidden z-[50]" aria-hidden="true" style={{ clipPath: "inset(0 0 0 0)" }}>
      {elements.map((el) => {
        // Smaller size on mobile
        const finalSize = isMobile ? el.size * 0.6 : el.size;
        
        return (
          <motion.div
            key={el.id}
            initial={{ y: "-20vh", x: 0, opacity: 0, rotate: el.rotateOffset }}
            animate={{
              y: "220vh",
              x: [0, 40, -40, 0],
              opacity: [0, 0.8, 0.8, 0],
              rotate: el.rotateOffset + 360,
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear",
            }}
            className="absolute top-0"
            style={{ 
              left: el.left, 
              width: finalSize, 
              height: finalSize,
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" 
            }}
          >
            <img
              src={processedAssets[el.type]}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
