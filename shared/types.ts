// Agent Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  level: number;
  creator: string;
  metadata: AgentMetadata;
}

export interface AgentMetadata {
  capabilities: string[];
  requirements: string[];
  model: string;
  version: string;
}

// Token Types
export interface TokenConfig {
  mint: string;
  decimals: number;
  symbol: string;
  name: string;
}

export interface TokenBalance {
  amount: number;
  wallet: string;
}

// API Types
export interface RunAgentRequest {
  agentId: string;
  prompt: string;
  wallet: string;
}

export interface RunAgentResponse {
  result: string;
  tokenUsage: number;
  error?: string;
}

// Access Control
export enum AccessLevel {
  Viewer = 'viewer',
  User = 'user',
  ProUser = 'pro_user',
  Creator = 'creator',
}

export interface AccessCheck {
  wallet: string;
  level: AccessLevel;
  tokenBalance: number;
}

// Blockchain Types
export interface Transaction {
  signature: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

export interface NetworkConfig {
  endpoint: string;
  wsEndpoint: string;
  programId: string;
  tokenMint: string;
} 