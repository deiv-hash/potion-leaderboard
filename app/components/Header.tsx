"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TwitterIcon } from "./icons/TwitterIcon";
import { DiscordIcon } from "./icons/DiscordIcon";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Potion Leaderboard"
              width={100}
              height={200}
              className=""
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-white font-medium" : "text-gray-400"
              } hover:text-white`}
            >
              Leaderboard
            </Link>
            <a
              href="docs.potionleaderboard.fun"
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
          <button className="bg-[#AA00FF] px-4 py-2 rounded-lg hover:bg-purple-600">
            Connect Wallet
          </button>
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
          className="absolute top-full left-0 right-0 bg-black/95 border-t border-gray-800 p-4 md:hidden"
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
            <button className="bg-[#AA00FF] px-4 py-2 rounded-lg hover:bg-purple-600 text-white mt-4">
              Connect Wallet
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
