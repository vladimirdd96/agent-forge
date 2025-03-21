import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f40_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f40_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">AgentForge:</span>{" "}
          <span className="text-foreground">
            AI Agents on Solana
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Create, deploy, and manage autonomous AI agents powered by blockchain technology.
          Experience the future of decentralized artificial intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/create"
            className="glass-panel px-8 py-3 text-primary hover-glow font-semibold"
          >
            Create Agent
          </Link>
          <Link 
            href="/marketplace"
            className="glass-panel px-8 py-3 text-accent hover-glow font-semibold"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
} 