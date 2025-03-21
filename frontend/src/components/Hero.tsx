"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import Link from "next/link";
import Image from "next/image";

// Floating images for the hero section
const floatingImages = [
  { src: "https://placehold.co/400x400/0A0F1D/17E4A3?text=Agent+1", alt: "AI Agent 1", delay: 0 },
  { src: "https://placehold.co/400x400/0A0F1D/17E4A3?text=Agent+2", alt: "AI Agent 2", delay: 1.5 },
  { src: "https://placehold.co/400x400/0A0F1D/17E4A3?text=Agent+3", alt: "AI Agent 3", delay: 0.8 },
  { src: "https://placehold.co/400x400/0A0F1D/17E4A3?text=Agent+4", alt: "AI Agent 4", delay: 2.2 },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="grid-background" />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, y: 100 }}
            animate={isVisible ? { opacity: 0.3, y: 0 } : { opacity: 0, y: 100 }}
            transition={{
              duration: 2,
              delay: img.delay,
              ease: "easeOut",
            }}
            style={{
              top: `${20 + index * 15}%`,
              left: `${(index % 2 === 0 ? 10 : 70) + (index * 5)}%`,
              zIndex: 0,
            }}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: img.delay,
              }}
            >
              <div className="relative w-24 h-24 md:w-40 md:h-40 opacity-20 rounded-2xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="gradient-text block md:inline">AI Agents</span>{" "}
            <span className="text-white block md:inline">Powered by Solana</span>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Create, deploy, and manage autonomous AI agents on the blockchain.
          Experience the future of decentralized artificial intelligence.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/create">
            <Button variant="primary" size="lg">
              Create Agent
            </Button>
          </Link>
          <Link href="/agents">
            <Button variant="secondary" size="lg">
              Explore Marketplace
            </Button>
          </Link>
        </motion.div>
        
        {/* Stats section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass-panel p-6">
            <p className="text-primary text-3xl font-bold">100+</p>
            <p className="text-white/70 text-sm mt-2">Active Agents</p>
          </div>
          <div className="glass-panel p-6">
            <p className="text-primary text-3xl font-bold">5,000+</p>
            <p className="text-white/70 text-sm mt-2">Users</p>
          </div>
          <div className="glass-panel p-6">
            <p className="text-primary text-3xl font-bold">25K+</p>
            <p className="text-white/70 text-sm mt-2">Executions</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 