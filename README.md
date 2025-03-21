# 🏗️ AgentForge

A modular, scalable full-stack Web3 app for creating and managing AI agents on Solana.

## 🔥 Features

- **Frontend**: Next.js app with Tailwind and shadcn/ui
- **Backend**: Node.js + Express API for OpenAI and Solana integration
- **Smart Contracts**: Solana Anchor Framework contracts
- **Wallet**: Phantom wallet integration
- **Token**: Custom $FORGE SPL token

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust and Solana CLI tools
- Phantom wallet browser extension

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Smart Contracts Setup

```bash
cd smart-contracts
anchor build
anchor deploy
```

## 📁 Project Structure

```
agent-forge/
├── frontend/          # Next.js frontend
├── backend/           # Node.js + Express API
├── smart-contracts/   # Solana smart contracts
├── shared/           # Shared types and utilities
└── scripts/          # Deployment and setup scripts
```

## 🧪 Development

See individual README files in each directory for specific setup and development instructions.

## 📝 License

MIT 