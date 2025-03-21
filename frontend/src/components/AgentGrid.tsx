import Image from "next/image";
import Link from "next/link";

// Placeholder data - this would come from your API
const FEATURED_AGENTS = [
  {
    id: 1,
    name: "Trading Assistant",
    description: "AI-powered trading analysis and execution on Solana DEXs",
    image: "https://placehold.co/600x600/2a2a2a/0FF?text=Trading+AI",
    price: "5 SOL",
    creator: "0x1234...5678",
  },
  {
    id: 2,
    name: "NFT Scout",
    description: "Monitors NFT marketplaces for opportunities and trends",
    image: "https://placehold.co/600x600/2a2a2a/F0F?text=NFT+Scout",
    price: "3.5 SOL",
    creator: "0x8765...4321",
  },
  {
    id: 3,
    name: "DeFi Optimizer",
    description: "Optimizes yield farming strategies across Solana protocols",
    image: "https://placehold.co/600x600/2a2a2a/0FF?text=DeFi+AI",
    price: "4.2 SOL",
    creator: "0x2468...1357",
  },
  {
    id: 4,
    name: "Data Analyst",
    description: "Analyzes on-chain data for insights and patterns",
    image: "https://placehold.co/600x600/2a2a2a/F0F?text=Data+AI",
    price: "2.8 SOL",
    creator: "0x1357...2468",
  },
];

export default function AgentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURED_AGENTS.map((agent) => (
        <Link
          key={agent.id}
          href={`/agent/${agent.id}`}
          className="glass-panel p-4 transition-transform hover:scale-[1.02]"
        >
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
              unoptimized // Since we're using external placeholder images
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 neon-text">
            {agent.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4">
            {agent.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">
              {agent.price}
            </span>
            <span className="text-xs text-muted-foreground">
              by {agent.creator}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
} 