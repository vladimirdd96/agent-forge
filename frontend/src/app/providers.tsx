'use client';

import { createContext, useContext, ReactNode, useState } from "react";

// Create a mock wallet context
interface WalletContextState {
  publicKey: null | { toString: () => string };
  connecting: boolean;
  connected: boolean;
  disconnect: () => Promise<void>;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextState>({
  publicKey: null,
  connecting: false,
  connected: false,
  disconnect: async () => {},
  connect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

// Mock wallet button
interface WalletButtonProps {
  className?: string;
}

export function WalletMultiButton(props: WalletButtonProps) {
  const { connect, disconnect, connected } = useWallet();
  
  return (
    <button 
      onClick={connected ? disconnect : connect}
      className={props.className || "px-4 py-2 bg-purple-600 text-white rounded"}
    >
      {connected ? 'Disconnect' : 'Connect Wallet'}
    </button>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<null | { toString: () => string }>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  
  const connect = async () => {
    setConnecting(true);
    // Mock wallet connection
    setTimeout(() => {
      setPublicKey({ 
        toString: () => "DRFYurKxGdxYz5HzVxMuNKPktGzz4LjTb4sVzJ4yXJKF" 
      });
      setConnected(true);
      setConnecting(false);
    }, 500);
  };
  
  const disconnect = async () => {
    setPublicKey(null);
    setConnected(false);
  };
  
  return (
    <WalletContext.Provider 
      value={{
        publicKey,
        connecting,
        connected,
        connect,
        disconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  );
} 