# Frontend - AgentForge

The Next.js frontend for AgentForge, featuring a modern UI built with Tailwind CSS and shadcn/ui components.

## 🚀 Features

- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library
- Phantom wallet integration
- Solana Web3.js integration

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API clients
│   ├── types/          # TypeScript types and interfaces
│   └── styles/         # Global styles and Tailwind config
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

3. Start the development server:
```bash
npm run dev
```

## 📦 Key Dependencies

- `next`: ^13.0.0
- `react`: ^18.0.0
- `@solana/web3.js`: For Solana blockchain interaction
- `@solana/wallet-adapter-react`: Wallet connection
- `tailwindcss`: Styling
- `@shadcn/ui`: UI components

## 🧪 Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript checks

## 🎨 UI Components

Key components include:
- `WalletConnect`: Phantom wallet connection
- `AgentCard`: Display agent details
- `AgentRunner`: Interface for running agents
- `Navigation`: App navigation
- `ThemeProvider`: Dark mode support

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
