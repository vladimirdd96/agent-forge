"use client";

import { WalletMultiButton } from "../providers";
import AgentGrid from "@/components/AgentGrid";
import MarketplaceFilters from "@/components/MarketplaceFilters";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <WalletMultiButton className="!bg-primary hover:!bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">
            Agent Marketplace
          </h1>
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search agents..."
              className="px-4 py-2 bg-background border border-border rounded-md"
            />
            <select className="px-4 py-2 bg-background border border-border rounded-md">
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <MarketplaceFilters />
          </aside>
          <div className="lg:col-span-3">
            <AgentGrid />
          </div>
        </div>
      </div>
    </main>
  );
} 