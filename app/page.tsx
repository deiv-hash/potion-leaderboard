"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Image
              src="/logo.png"
              alt="Potion Leaderboard"
              width={100}
              height={100}
              className="w-10 h-10"
            />
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
        </div>
      </header>
    </div>
  );
}
