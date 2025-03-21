"use client";

import { WalletMultiButton } from "../providers";
import CreateAgentForm from "@/components/CreateAgentForm";

export default function CreateAgentPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <WalletMultiButton className="!bg-primary hover:!bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">
          Create New Agent
        </h1>

        <div className="glass-panel p-8 max-w-2xl mx-auto">
          <CreateAgentForm />
        </div>
      </div>
    </main>
  );
} 