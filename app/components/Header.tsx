"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DiscordIcon } from "../icons/DiscordIcon";
import { useState, useEffect, useRef } from "react";
import { useWallet } from "../contexts/WalletContext";
import { shortenWalletAddress } from "../utils/format";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { wallet, connectWallet, disconnectWallet, isXConnected } = useWallet();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative">
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-16">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Potion Leaderboard"
              width={300}
              height={300}
              className="w-44 h-12 md:w-56 md:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-white font-medium" : "text-gray-400"
              } hover:text-white`}
            >
              Leaderboard
            </Link>
            <a
              href="https://docs.potionleaderboard.fun"
              className="text-gray-400 hover:text-white"
            >
              Learn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Prizes
            </a>
          </nav>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <a
            href="https://x.com/potionalpha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://whop.com/potion-alpha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <DiscordIcon />
          </a>
          {wallet ? (
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white flex items-center justify-center w-[50px] h-[50px]"
                >
                  {isXConnected ? (
                    <Image
                      src="/avatar.jpg"
                      alt="Profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] rounded-full bg-[#1C1C28] border-2 border-[#AA00FF] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#AA00FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </Link>
                {/* Dropdown menu */}
                <div className="absolute z-50 right-0 w-48 py-2 bg-[#1C1C28] rounded-lg shadow-xl hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
                    {shortenWalletAddress(wallet)}
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={disconnectWallet}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-gray-800"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-[#AA00FF] px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 top-full left-0 right-0 bg-black/95 border-t border-gray-800 p-4 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-white font-medium" : "text-gray-400"
              } hover:text-white`}
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <a
              href="docs.potionleaderboard.fun"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Prizes
            </a>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
              <a
                href="https://twitter.com/potionleaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://discord.gg/potionleaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <DiscordIcon />
              </a>
            </div>
            {wallet ? (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Link href="/profile">
                      {isXConnected ? (
                        <Image
                          src="/avatar.jpg"
                          alt="Profile"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#1C1C28] border-2 border-[#AA00FF] flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#AA00FF]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </Link>
                    <span className="text-gray-400">
                      {shortenWalletAddress(wallet)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-500 hover:text-red-400 text-left py-2"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-[#AA00FF] px-4 py-2 rounded-lg hover:bg-purple-600 text-white mt-4"
              >
                Connect Wallet
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
