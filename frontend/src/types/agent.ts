export interface Agent {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  creator: string;
  capabilities?: string[];
  parameters?: AgentParameter[];
  status?: AgentStatus;
}

export interface AgentParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  description: string;
  required: boolean;
  default?: string | number | boolean | string[];
}

export type AgentStatus = 'active' | 'inactive' | 'running' | 'error';

export interface CreateAgentInput {
  name: string;
  description: string;
  capabilities: string[];
  parameters: AgentParameter[];
  price: string;
} 