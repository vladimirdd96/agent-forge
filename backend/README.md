# Backend - AgentForge

Node.js + Express API server for AgentForge, handling OpenAI integration and Solana interactions.

## 🚀 Features

- Express.js API with TypeScript
- OpenAI integration for agent execution
- Solana Web3.js for blockchain interaction
- Rate limiting and token gating
- Environment-based configuration
- CORS and security middleware

## 📁 Directory Structure

```
backend/
├── src/
│   ├── controllers/    # Route handlers
│   ├── services/      # Business logic
│   ├── routes/        # API route definitions
│   ├── utils/         # Helper functions
│   └── index.ts       # App entry point
├── tests/             # Test files
└── package.json       # Dependencies and scripts
```

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=3001
OPENAI_API_KEY=your_key_here
SOLANA_NETWORK=devnet
CORS_ORIGIN=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

## 📦 Key Dependencies

- `express`: Web framework
- `@types/express`: TypeScript types
- `openai`: OpenAI API client
- `@solana/web3.js`: Solana blockchain SDK
- `dotenv`: Environment configuration
- `cors`: CORS middleware

## 🔄 API Endpoints

### Agent Execution
- `POST /api/run-agent`
  - Body: `{ agentId: string, prompt: string }`
  - Response: Agent execution results

### Token Gating
- `GET /api/check-access`
  - Query: `{ wallet: string }`
  - Response: Access level details

## 🧪 Development

- `npm run dev`: Start development server
- `npm run build`: Build TypeScript
- `npm run start`: Start production server
- `npm run test`: Run tests
- `npm run lint`: Run ESLint

## 🔒 Security

- Rate limiting per IP/wallet
- CORS configuration
- Environment-based security
- Token validation middleware 