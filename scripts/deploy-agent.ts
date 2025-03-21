import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as dotenv from 'dotenv';
import { Agent, AgentMetadata } from '../shared/types';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const NETWORK = process.env.SOLANA_NETWORK || 'devnet';
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;

// Type guard for checking if value is a valid private key array
function isValidPrivateKeyArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

if (!ADMIN_PRIVATE_KEY) {
  throw new Error('ADMIN_PRIVATE_KEY is required in .env file');
}

// Parse and validate private key
let privateKeyArray: number[];
try {
  const parsed = JSON.parse(ADMIN_PRIVATE_KEY);
  if (!isValidPrivateKeyArray(parsed)) {
    throw new Error('ADMIN_PRIVATE_KEY must be a JSON array of numbers');
  }
  privateKeyArray = parsed;
} catch (error) {
  console.error('Error parsing ADMIN_PRIVATE_KEY:', error);
  process.exit(1);
}

// Load token configuration
let tokenConfig;
try {
  const tokenConfigPath = path.join(__dirname, '..', 'shared', 'token-config.json');
  if (!fs.existsSync(tokenConfigPath)) {
    throw new Error('Token configuration not found. Please run init-token first.');
  }
  tokenConfig = JSON.parse(fs.readFileSync(tokenConfigPath, 'utf8'));
} catch (error) {
  console.error('Error loading token configuration:', error);
  process.exit(1);
}

const DEFAULT_AGENT: Agent = {
  id: '', // Will be set after deployment
  name: 'Research Assistant',
  description: 'AI-powered research and analysis agent',
  level: 1,
  creator: '', // Will be set to admin's public key
  metadata: {
    capabilities: [
      'Web search and analysis',
      'Document summarization',
      'Data extraction',
    ],
    requirements: ['OpenAI API access', '$FORGE tokens'],
    model: 'gpt-4',
    version: '1.0.0',
  },
};

interface DeployAgentArgs {
  name?: string;
  description?: string;
  level?: number;
  capabilities?: string[];
}

function parseArgs(): DeployAgentArgs {
  const args = process.argv.slice(2);
  const result: DeployAgentArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        switch (key) {
          case 'name':
            result.name = value;
            break;
          case 'description':
            result.description = value;
            break;
          case 'level':
            result.level = parseInt(value);
            break;
          case 'capabilities':
            result.capabilities = value.split(',');
            break;
        }
        i++; // Skip the value in next iteration
      }
    }
  }
  return result;
}

async function deployAgent(agent: Agent = DEFAULT_AGENT): Promise<void> {
  try {
    // Connect to network
    const connection = new Connection(
      NETWORK === 'devnet'
        ? 'https://api.devnet.solana.com'
        : 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    // Create admin wallet from private key
    const adminKeypair = Keypair.fromSecretKey(
      Uint8Array.from(privateKeyArray)
    );

    console.log('\nDeploying agent with configuration:');
    console.log('Name:', agent.name);
    console.log('Description:', agent.description);
    console.log('Level:', agent.level);
    console.log('Capabilities:', agent.metadata.capabilities.join(', '));
    console.log('Admin public key:', adminKeypair.publicKey.toString());

    // Generate new keypair for the agent
    const agentKeypair = Keypair.generate();

    // TODO: Add actual deployment transaction
    // This will be implemented when the smart contract is ready
    console.log('\nAgent deployment placeholder...');

    // Update agent with deployment info
    const deployedAgent: Agent = {
      ...agent,
      id: agentKeypair.publicKey.toString(),
      creator: adminKeypair.publicKey.toString(),
    };

    // Save agent data to a file
    const agentsDir = path.join(__dirname, '..', 'shared', 'agents');
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }

    const agentPath = path.join(agentsDir, `${deployedAgent.id}.json`);
    fs.writeFileSync(agentPath, JSON.stringify(deployedAgent, null, 2));

    console.log('\nAgent deployed successfully!');
    console.log('Agent ID:', deployedAgent.id);
    console.log('Creator:', deployedAgent.creator);
    console.log('Configuration saved to:', agentPath);

  } catch (error) {
    console.error('\nError deploying agent:', error);
    process.exit(1);
  }
}

// Parse command line arguments and deploy agent
const args = parseArgs();
const customAgent: Agent = {
  ...DEFAULT_AGENT,
  ...args,
  metadata: {
    ...DEFAULT_AGENT.metadata,
    capabilities: args.capabilities || DEFAULT_AGENT.metadata.capabilities,
  },
};

deployAgent(customAgent); 