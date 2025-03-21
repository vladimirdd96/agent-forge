"use client";

import { motion } from "framer-motion";
import AgentGrid from "@/components/AgentGrid";
import { Button } from "@/components/Button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function AgentsPage() {
  const [searchValue, setSearchValue] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Agent Marketplace
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover and deploy powerful AI agents built by the community
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="mb-10 flex flex-col md:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <input
              type="search"
              placeholder="Search agents..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-glass-dark backdrop-blur-md border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            <select className="bg-glass-dark backdrop-blur-md border border-white/10 rounded-lg py-3 px-4 text-white">
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["All", "Trading", "NFT", "DeFi", "Analytics", "Gaming", "Social"].map((category, index) => (
            <Button 
              key={index} 
              variant={index === 0 ? "primary" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <motion.aside 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Price Range</h3>
              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full bg-glass-dark border border-white/10 rounded-md p-2 text-white"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full bg-glass-dark border border-white/10 rounded-md p-2 text-white"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                {["Trading", "NFT", "DeFi", "Analytics", "Gaming"].map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="bg-glass-dark border border-white/10 rounded"
                    />
                    <span className="text-white/80">{category}</span>
                  </label>
                ))}
              </div>

              <h3 className="text-lg font-bold text-white mb-4">Capabilities</h3>
              <div className="space-y-2 mb-6">
                {[
                  "Market Analysis",
                  "Automated Trading",
                  "Portfolio Management",
                  "Data Collection",
                  "Smart Contract Interaction",
                ].map((capability) => (
                  <label key={capability} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="bg-glass-dark border border-white/10 rounded"
                    />
                    <span className="text-white/80">{capability}</span>
                  </label>
                ))}
              </div>

              <Button variant="secondary" className="w-full">
                Apply Filters
              </Button>
            </div>
          </motion.aside>

          {/* Agent grid */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AgentGrid />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 