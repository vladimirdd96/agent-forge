# Scripts - AgentForge

Utility scripts for deploying and managing the AgentForge platform.

## 📁 Available Scripts

### Token Initialization
- `init-token.ts`: Creates and initializes the $FORGE SPL token
```bash
npm run init-token
```

### Agent Deployment
- `deploy-agent.ts`: Deploys a new agent to the network
```bash
npm run deploy-agent
```

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
SOLANA_NETWORK=devnet
ADMIN_PRIVATE_KEY=your_key_here
INITIAL_SUPPLY=1000000
```

## 🔑 Configuration

Each script can be configured via environment variables or command line arguments:

### Token Initialization
```bash
npm run init-token -- --supply 1000000 --decimals 9
```

### Agent Deployment
```bash
npm run deploy-agent -- --name "Research Assistant" --description "AI Research Agent"
```

## 🧪 Development

- `npm run build`: Build TypeScript
- `npm run test`: Run tests
- `npm run lint`: Run ESLint

## 🔒 Security

- Private key management
- Network selection validation
- Error handling and logging
- Transaction confirmation checks 