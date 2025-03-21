export interface RunAgentRequest {
  wallet: string;
  agentId: string;
  input: string;
}

export interface RunAgentResponse {
  success: boolean;
  agentId: string;
  output: string;
  error?: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface ValidationError {
  field: string;
  message: string;
} 