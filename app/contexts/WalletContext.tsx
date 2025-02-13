"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WalletContextType {
  wallet: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    // Check if Phantom is installed
    const checkPhantom = async () => {
      try {
        const provider = window?.phantom?.solana;

        if (provider?.isPhantom) {
          // Try to reconnect if previously connected
          try {
            const resp = await provider.connect({ onlyIfTrusted: true });
            setWallet(resp.publicKey.toString());
          } catch (err) {
            // User hasn't connected before or rejected the connection
            console.log(err);
          }
        }
      } catch (err) {
        console.error("Phantom not installed", err);
      }
    };

    checkPhantom();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = window?.phantom?.solana;

      if (!provider?.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        return;
      }

      const resp = await provider.connect();
      setWallet(resp.publicKey.toString());
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  const disconnectWallet = () => {
    try {
      window?.phantom?.solana?.disconnect();
      setWallet(null);
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
