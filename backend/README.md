# 🧠 AgentForge Backend

Backend API for AgentForge - AI Agents on Solana blockchain.

## 🛠 Tech Stack

- Node.js + Express
- TypeScript
- OpenAI API
- Solana Web3.js
- SPL Token

## 📁 Project Structure

```bash
src/
├── controllers/      # Request handlers
├── routes/          # API routes
├── services/        # Business logic
├── utils/          # Helper functions
└── types/          # TypeScript types
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/agent-forge.git
cd agent-forge/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
OPENAI_API_KEY=your-api-key
PORT=3001
SOLANA_RPC_URL=https://api.devnet.solana.com
FORGE_TOKEN_MINT=your-token-mint-address
MIN_FORGE_BALANCE=100
```

5. Start the development server:
```bash
npm run dev
```

The server will be running at `http://localhost:3001`

## 📡 API Endpoints

### Get Available Agents
```
GET /api/agent
```
Returns a list of all available AI agents.

### Run Agent
```
POST /api/agent/run
```
Execute an AI agent with the given input.

Request body:
```json
{
  "wallet": "solana-wallet-address",
  "agentId": "agent-id",
  "input": "user prompt"
}
```

Response:
```json
{
  "success": true,
  "agentId": "agent-id",
  "output": "AI response"
}
```

## 🧪 Development

- `npm run build` - Build the TypeScript code
- `npm run dev` - Start development server with hot reload
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 📝 TODOs

- [ ] Implement token gating with $FORGE balance check
- [ ] Add usage tracking and analytics
- [ ] Implement rate limiting
- [ ] Add more agent types and configurations
- [ ] Add authentication middleware
- [ ] Implement caching for frequent requests

## 📄 License

MIT 