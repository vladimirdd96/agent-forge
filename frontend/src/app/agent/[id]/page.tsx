"use client";

import { WalletMultiButton } from "../../providers";
import Image from "next/image";
import Link from "next/link";
import type { Agent } from "@/types/agent";

// This would come from your API based on the ID
const getAgentById = (id: string): Agent => ({
  id: parseInt(id),
  name: "Trading Assistant",
  description: "AI-powered trading analysis and execution on Solana DEXs",
  image: "https://placehold.co/600x600/2a2a2a/0FF?text=Trading+AI",
  price: "5 SOL",
  creator: "0x1234...5678",
  capabilities: [
    "Real-time market analysis",
    "Automated trading execution",
    "Portfolio rebalancing",
    "Risk management",
  ],
  parameters: [
    {
      name: "Trading Pair",
      type: "string",
      description: "The trading pair to monitor (e.g., SOL/USDC)",
      required: true,
    },
    {
      name: "Risk Level",
      type: "number",
      description: "Risk level from 1 (conservative) to 10 (aggressive)",
      required: true,
      default: 5,
    },
  ],
  status: "active",
});

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = getAgentById(params.id);

  return (
    <main className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <WalletMultiButton className="!bg-primary hover:!bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold neon-text">
                {agent.name}
              </h1>
              <span className="text-2xl text-primary font-semibold">
                {agent.price}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {agent.description}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Created by {agent.creator}</span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                {agent.status}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h2 className="text-xl font-semibold mb-4">Capabilities</h2>
              <ul className="space-y-2">
                {agent.capabilities?.map((cap, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-xl font-semibold mb-4">Parameters</h2>
              <div className="space-y-4">
                {agent.parameters?.map((param, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{param.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {param.type}
                        {param.required && " (Required)"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {param.description}
                    </p>
                    {param.default !== undefined && (
                      <p className="text-sm text-primary mt-1">
                        Default: {param.default}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 neon-border font-semibold">
              Deploy Agent
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 