"use client";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "../contexts/WalletContext";

interface ConnectWalletPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectWalletPopup = ({
  isOpen,
  onClose,
}: ConnectWalletPopupProps) => {
  const { connectWallet, wallet } = useWallet();
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
    }
  }, [isOpen]);

  // we check if the wallet is connected and the popup is open, and if so, we close the popup
  useEffect(() => {
    if (wallet && isOpen) {
      handleClose();
    }
  }, [wallet, isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className={`bg-[#1C1C28] rounded-lg p-6 shadow-xl transform transition-transform duration-300 ${
          isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        } relative z-10 max-w-md w-full mx-4`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-6">
            You need to connect your wallet to access this feature.
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={connectWallet}
              className="bg-[#AA00FF] text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Connect with Phantom</span>
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
