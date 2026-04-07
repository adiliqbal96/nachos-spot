"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { img } from "@/lib/basePath";

interface Chip {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
  rotateOffset: number;
}

export default function FallingNachos() {
  const [chips, setChips] = useState<Chip[]>([]);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  // Process the image on the client to remove the near-black background
  useEffect(() => {
    const imgElement = new window.Image();
    imgElement.src = img("/images/falling-nacho-stylized.png");
    imgElement.crossOrigin = "anonymous";
    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      ctx.drawImage(imgElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Remove everything that is almost black
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If it's very dark (black background)
        if (r < 55 && g < 55 && b < 55) { 
          data[i + 3] = 0; 
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };

    // Generate chips (halved count, faster speed)
    const generatedChips = Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 12, // Faster (8-20s instead of 15-35s)
      delay: Math.random() * 10,
      size: 70 + Math.random() * 90, 
      rotateOffset: Math.random() * 360,
    }));
    setChips(generatedChips);
  }, []);

  if (!processedSrc) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {chips.map((chip) => (
        <motion.div
          key={chip.id}
          initial={{ y: "-20vh", x: 0, opacity: 0, rotate: chip.rotateOffset }}
          animate={{
            y: "110vh",
            x: [0, 40, -40, 0], // Mere drift
            opacity: [0, 0.8, 0.8, 0], // Særdeles tydelige
            rotate: chip.rotateOffset + 360,
          }}
          transition={{
            duration: chip.duration,
            repeat: Infinity,
            delay: chip.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{ 
            left: chip.left, 
            width: chip.size, 
            height: chip.size,
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.6))" 
          }}
        >
          <img
            src={processedSrc}
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}
