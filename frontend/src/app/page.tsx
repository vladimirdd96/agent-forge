"use client";

import AgentGrid from "@/components/AgentGrid";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import Link from "next/link";

// Features section data
const features = [
  {
    title: "Create Agents",
    description: "Build custom AI agents to automate tasks and processes on the blockchain.",
    icon: "🤖",
  },
  {
    title: "Run Agents",
    description: "Execute AI agents to perform complex operations and analysis on Solana.",
    icon: "⚡",
  },
  {
    title: "Monetize Agents",
    description: "List your agents on the marketplace and earn from every execution.",
    icon: "💰",
  },
];

// Testimonial data
const testimonials = [
  {
    quote: "AgentForge has revolutionized how I interact with DeFi protocols. My trading bot outperforms manual trading by 32%.",
    author: "Alex Thompson",
    title: "Solana Developer",
  },
  {
    quote: "Creating an NFT monitoring agent was straightforward and the returns have been incredible.",
    author: "Maya Rodriguez",
    title: "Digital Artist",
  },
  {
    quote: "The platform's reliability and speed are unmatched. My data analysis agent processes on-chain data in real-time.",
    author: "David Chen",
    title: "DeFi Analyst",
  },
];

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Hero />
      
      {/* Featured Agents Section */}
      <section className="py-20 bg-mint-primary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Featured Agents</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover powerful AI agents created by the community and start automating your tasks today.
            </p>
          </motion.div>
          
          <AgentGrid />
          
          <motion.div 
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/agents">
              <Button variant="secondary">View All Agents</Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-glass-dark">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              AgentForge simplifies creating, deploying, and managing AI agents on the Solana blockchain.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="glass-panel p-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-mint-primary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Hear from users who have transformed their workflows with AgentForge.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="glass-panel p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-white mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-white/70 text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="grid-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Start Building Today</span>
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Join the AgentForge community and start creating powerful AI agents on the Solana blockchain.
            </p>
            <Link href="/create">
              <Button variant="primary" size="lg" className="animate-glow">
                Create Your First Agent
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
