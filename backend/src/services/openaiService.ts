import OpenAI from 'openai';
import { AgentConfig } from '../types/agent';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client if API key is available
const apiKey = process.env.OPENAI_API_KEY;
let openai: OpenAI | null = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    openai = new OpenAI({ apiKey });
    console.log('OpenAI client initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize OpenAI client:', error instanceof Error ? error.message : 'Unknown error');
  }
} else {
  console.warn('OPENAI_API_KEY not set or empty, using mock responses only');
}

// Default agent configurations
const AGENT_CONFIGS: Record<string, AgentConfig> = {
  'trading-assistant': {
    id: 'trading-assistant',
    name: 'Trading Assistant',
    description: 'AI-powered trading analysis and execution on Solana DEXs',
    systemPrompt: 'You are an expert crypto trading assistant. Analyze market conditions and provide trading insights.',
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.7,
    maxTokens: 2000,
  },
  'nft-scout': {
    id: 'nft-scout',
    name: 'NFT Scout',
    description: 'Monitors NFT marketplaces for opportunities and trends',
    systemPrompt: 'You are an NFT market expert. Analyze NFT collections and identify opportunities.',
    model: 'gpt-3.5-turbo-0125',
    temperature: 0.7,
    maxTokens: 2000,
  },
  // Add more agent configurations as needed
};

// Mock responses for when OpenAI API is unavailable
const MOCK_RESPONSES: Record<string, Record<string, string>> = {
  'trading-assistant': {
    'default': 'As a trading assistant, I can analyze market trends and provide suggestions for trading on Solana DEXs. The Solana DeFi ecosystem is growing rapidly with many opportunities.',
    'Solana DeFi': 'The Solana DeFi ecosystem is currently thriving with protocols like Jupiter, Raydium, and Orca leading the way. Trading volume has been increasing, and there are many opportunities for yield farming and arbitrage.',
  },
  'nft-scout': {
    'default': 'As an NFT scout, I can help you identify promising NFT collections on Solana. The Solana NFT market has been growing with collections like Okay Bears and DeGods gaining popularity.',
  }
};

export class OpenAIService {
  // Use mock responses by default if OpenAI client is not available
  private useMockResponses = !openai;

  /**
   * Get the configuration for a specific agent
   */
  private getAgentConfig(agentId: string): AgentConfig {
    const config = AGENT_CONFIGS[agentId];
    if (!config) {
      throw new Error(`Agent configuration not found for ID: ${agentId}`);
    }
    return config;
  }

  /**
   * Get a mock response based on the agent and input
   */
  private getMockResponse(agentId: string, input: string): string {
    const agentResponses = MOCK_RESPONSES[agentId];
    if (!agentResponses) {
      return 'Sorry, this agent is not available in offline mode.';
    }

    // Check if any keywords in the input match our mock responses
    const lowerInput = input.toLowerCase();
    for (const [keyword, response] of Object.entries(agentResponses)) {
      if (keyword === 'default') continue;
      if (lowerInput.includes(keyword.toLowerCase())) {
        return response;
      }
    }

    // Return default response if no specific keyword matches
    return agentResponses.default || 'Sorry, I don\'t have a specific response for that query in offline mode.';
  }

  /**
   * Execute an agent with the given input
   */
  async executeAgent(agentId: string, input: string): Promise<string> {
    try {
      const config = this.getAgentConfig(agentId);

      // If we're in mock mode or OpenAI client is not available, return a mock response
      if (this.useMockResponses || !openai) {
        console.log(`Using mock response for agent ${agentId}`);
        return this.getMockResponse(agentId, input);
      }

      console.log(`Executing agent ${agentId} with model ${config.model}`);
      
      const response = await openai.chat.completions.create({
        model: config.model,
        messages: [
          { role: 'system', content: config.systemPrompt },
          { role: 'user', content: input },
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens,
      });

      if (!response.choices[0]?.message?.content) {
        throw new Error('No response from OpenAI');
      }

      return response.choices[0].message.content;
    } catch (error) {
      // Log the full error for debugging
      console.error('OpenAI API Error:', error instanceof Error ? error.message : error);
      
      // Switch to mock mode for any OpenAI API error
      console.log('OpenAI API error, switching to mock responses');
      this.useMockResponses = true;
      return this.getMockResponse(agentId, input);
    }
  }

  /**
   * Get all available agent configurations
   */
  getAvailableAgents(): AgentConfig[] {
    return Object.values(AGENT_CONFIGS);
  }
} 