# AgentForge

AgentForge is a platform for creating, deploying, and managing AI agents on the Solana blockchain. This project combines the power of AI with blockchain technology to enable users to create custom agents for various tasks.

## Project Structure

- **frontend**: Next.js application with TypeScript, TailwindCSS, and Solana wallet integration
- **backend**: Express server with TypeScript and OpenAI integration
- **smart-contracts**: Solana smart contracts
- **shared**: Common types and utilities
- **scripts**: Deployment and utility scripts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Phantom wallet browser extension

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/agent-forge.git
   cd agent-forge
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the frontend directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:3001/api
     ```
   - Create a `.env` file in the backend directory:
     ```
     PORT=3001
     OPENAI_API_KEY=your_openai_api_key
     ```

### Running the Application

You can start both the frontend and backend with a single command:

```
npm run dev
```

Or run them separately:

```
npm run dev:frontend  # Starts only the frontend
npm run dev:backend   # Starts only the backend
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001.

## Features

- **Agent Creation**: Build and deploy custom AI agents
- **Agent Marketplace**: Browse and use agents created by others
- **Dashboard**: Monitor your agents' performance
- **Solana Integration**: All agents are powered by the Solana blockchain

## Available Agents

- **Trading Assistant**: AI-powered trading analysis and execution on Solana DEXs
- **NFT Scout**: Monitors NFT marketplaces for opportunities and trends
- **DeFi Optimizer**: Optimizes yield farming strategies across Solana protocols
- **Data Analyst**: Analyzes on-chain data for insights and patterns

## License

MIT 