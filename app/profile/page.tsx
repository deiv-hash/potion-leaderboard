"use client";
import { useWallet } from "@/app/contexts/WalletContext";
import { useState } from "react";
import { TwitterIcon } from "@/app/components/icons/TwitterIcon";
import Image from "next/image";
import { shortenWalletAddress } from "@/app/utils/format";

export default function ProfilePage() {
  const { wallet, disconnectWallet } = useWallet();
  const [isXConnected, setIsXConnected] = useState(false);

  const handleConnectX = () => {
    // TODO: Implement X OAuth
    setIsXConnected(true);
  };

  const handleDisconnectX = () => {
    // TODO: Implement X disconnect
    setIsXConnected(false);
  };

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-purple-500 font-bold mb-2">
            Connect Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

        {/* Wallet Section */}
        <div className="bg-[#1C1C28] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Connected Wallet
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/avatar.jpg"
                alt="Wallet Avatar"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-white">{shortenWalletAddress(wallet)}</p>
                <p className="text-gray-400 text-sm">Phantom Wallet</p>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* X Connection Section */}
        <div className="bg-[#1C1C28] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">X Account</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TwitterIcon className="w-8 h-8 text-gray-400" />
              <div>
                {isXConnected ? (
                  <>
                    <p className="text-white">@username</p>
                    <p className="text-gray-400 text-sm">Connected</p>
                  </>
                ) : (
                  <p className="text-gray-400">Not connected</p>
                )}
              </div>
            </div>
            {isXConnected ? (
              <button
                onClick={handleDisconnectX}
                className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
              >
                Disconnect X
              </button>
            ) : (
              <button
                onClick={handleConnectX}
                className="bg-[#AA00FF] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Connect X
              </button>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-[#1C1C28] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-gray-400 text-sm">
                  Receive updates about your performance
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Public Profile</p>
                <p className="text-gray-400 text-sm">
                  Allow others to view your trading history
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
