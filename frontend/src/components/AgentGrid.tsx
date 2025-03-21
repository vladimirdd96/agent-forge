"use client";

import { motion } from "framer-motion";
import AgentCard from "./AgentCard";

// Placeholder data - this would come from your API
const FEATURED_AGENTS = [
  {
    id: 1,
    name: "Trading Assistant",
    description: "AI-powered trading analysis and execution on Solana DEXs",
    image: "https://placehold.co/600x600/2a2a2a/17E4A3?text=Trading+AI",
    price: "5 SOL",
    creator: "0x1234...5678",
  },
  {
    id: 2,
    name: "NFT Scout",
    description: "Monitors NFT marketplaces for opportunities and trends",
    image: "https://placehold.co/600x600/2a2a2a/17E4A3?text=NFT+Scout",
    price: "3.5 SOL",
    creator: "0x8765...4321",
  },
  {
    id: 3,
    name: "DeFi Optimizer",
    description: "Optimizes yield farming strategies across Solana protocols",
    image: "https://placehold.co/600x600/2a2a2a/17E4A3?text=DeFi+AI",
    price: "4.2 SOL",
    creator: "0x2468...1357",
  },
  {
    id: 4,
    name: "Data Analyst",
    description: "Analyzes on-chain data for insights and patterns",
    image: "https://placehold.co/600x600/2a2a2a/17E4A3?text=Data+AI",
    price: "2.8 SOL",
    creator: "0x1357...2468",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AgentGrid() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {FEATURED_AGENTS.map((agent) => (
        <AgentCard
          key={agent.id}
          id={agent.id}
          name={agent.name}
          description={agent.description}
          image={agent.image}
          price={agent.price}
          creator={agent.creator}
        />
      ))}
    </motion.div>
  );
} 