"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TwitterIcon } from "./components/icons/TwitterIcon";
import { DiscordIcon } from "./components/icons/DiscordIcon";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="">
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

            <nav className="flex space-x-4">
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
          <div className="flex items-center space-x-4 text-white">
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
        </div>
      </header>
    </div>
  );
}
