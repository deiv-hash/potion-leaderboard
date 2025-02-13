import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Sponsor } from "./components/Sponsor";
import { HeaderAlert } from "./components/HeaderAlert";

// Example sponsor data - in a real app, this would come from an API or CMS
const currentSponsor = {
  name: "Nova",
  logo: "/nova.png",
  description: "The most popular Trading Bot on Solana",
  link: "https://tradeonnova.io",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potion Leaderboard",
  description: "Potion Leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderAlert />
        <Sponsor {...currentSponsor} />
        <div className="max-w-[1440px] mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
