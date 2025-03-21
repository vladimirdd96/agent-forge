'use client';

import { useWallet, WalletMultiButton } from './providers';
import { useState } from 'react';
import AgentGrid from "@/components/AgentGrid";
import Hero from "@/components/Hero";

export default function Home() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  
  const runAgent = async () => {
    if (!publicKey) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/agent/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet: publicKey.toString(),
          agentId: 'trading-assistant',
          input: 'What is the current state of the Solana DeFi ecosystem?',
        }),
      });
      
      const data = await response.json();
      console.log('Agent response:', data);
      alert(data.success ? data.output : data.error);
    } catch (error) {
      console.error('Error running agent:', error);
      alert('Error running agent. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-10">
        <WalletMultiButton className="!bg-primary hover:!bg-primary/80" />
      </div>
      
      <Hero />
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 gradient-text">
          Featured Agents
        </h2>
        <AgentGrid />
      </section>
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">AgentForge</h1>
        <h2 className="text-2xl mb-8 text-center">AI Agents on Solana</h2>
        
        <div className="flex flex-col items-center gap-4 w-full">
          {publicKey ? (
            <div className="mt-8 text-center">
              <p className="mb-4">Connected: {publicKey.toString()}</p>
              <button 
                onClick={runAgent}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                {loading ? 'Running...' : 'Run Trading Assistant'}
              </button>
            </div>
          ) : (
            <p className="mt-8 text-center">Connect your wallet to use agents</p>
          )}
        </div>
      </div>
    </main>
  );
}
