"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { motion } from "framer-motion";

interface AgentCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  creator: string;
}

export default function AgentCard({ id, name, description, image, price, creator }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="agent-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-lg font-heading font-bold">{name}</p>
          <p className="text-white/70 text-sm mt-1 line-clamp-1">{description}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary font-medium">{price}</span>
          <span className="text-xs text-white/50">by {creator.slice(0, 6)}...{creator.slice(-4)}</span>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/agent/${id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            Deploy
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 