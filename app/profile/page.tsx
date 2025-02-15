"use client";
import { useWallet } from "@/app/contexts/WalletContext";
import { TwitterIcon } from "@/app/icons/TwitterIcon";
import Image from "next/image";
import { shortenWalletAddress } from "@/app/utils/format";

export default function ProfilePage() {
  const { wallet, disconnectWallet, isXConnected, connectX, disconnectX } =
    useWallet();

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        {/* Wallet Section */}
        <div className="bg-[#1C1C28] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connected Wallet</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-gray-300">
                {shortenWalletAddress(wallet)}
              </span>
              <p className="text-gray-400 text-sm">Phantom Wallet</p>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* X Connection Section */}
        <div className="bg-[#1C1C28] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">X (Twitter) Connection</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isXConnected && (
                <Image
                  src="/avatar.jpg" //show x profile image
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div className="flex items-center space-x-3">
                <TwitterIcon />
                <span className="text-gray-300">
                  {isXConnected ? "Connected to X" : "Not connected to X"}
                </span>
              </div>
            </div>
            <button
              onClick={isXConnected ? disconnectX : connectX}
              className={`px-4 py-2 rounded-lg ${
                isXConnected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#AA00FF] hover:bg-purple-600"
              } text-white transition-colors`}
            >
              {isXConnected ? "Disconnect" : "Connect X"}
            </button>
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
