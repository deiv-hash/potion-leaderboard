"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@/app/contexts/WalletContext";

export const HeaderAlert = () => {
  const { wallet, isXConnected } = useWallet();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (wallet && !isXConnected) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [wallet, isXConnected]);

  if (!isVisible || !wallet || isXConnected) {
    return null;
  }

  return (
    <div className="bg-[#1C1C28] border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">
              Connect your X account to track your performance
            </span>
            <Link
              href="/profile"
              className="text-[#AA00FF] hover:text-purple-400"
            >
              Connect now
            </Link>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
