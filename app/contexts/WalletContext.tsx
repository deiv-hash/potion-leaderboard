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
  isXConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  connectX: () => void;
  disconnectX: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isXConnected, setIsXConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check if X is connected from localStorage
    const xConnected = localStorage.getItem("isXConnected") === "true";
    setIsXConnected(xConnected);

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
      // Also disconnect X when wallet is disconnected
      disconnectX();
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  const connectX = () => {
    // TODO: Implement actual X OAuth
    setIsXConnected(true);
    localStorage.setItem("isXConnected", "true");
  };

  const disconnectX = () => {
    setIsXConnected(false);
    localStorage.setItem("isXConnected", "false");
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isXConnected,
        connectWallet,
        disconnectWallet,
        connectX,
        disconnectX,
      }}
    >
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
