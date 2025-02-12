import { Trader } from "@/app/types/trader";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShareIcon } from "./icons/ShareIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { ChevronLeftIcon } from "./icons/ChevronLeftIcon";
import { ChevronRightIcon } from "./icons/ChevronRightIcon";
import { ShareModal } from "./ShareModal";
import { shortenWalletAddress } from "@/app/utils/format";

const formatNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}b`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `<${num >= 1000 ? Math.round(num / 1000) : 1}k`;
};

const formatSol = (num: number): string => {
  if (num >= 100) return Math.round(num).toString();
  if (num >= 10) return num.toFixed(1);
  return num.toFixed(2);
};

const formatUsd = (num: number): string => {
  if (num >= 1000)
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatAvgEntry = (num: number): string => {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${Math.round(num / 1000)}K`;
  return `<$1K`;
};

const formatHoldTime = (minutes: number): string => {
  if (minutes < 240) return `${minutes} m`;
  return `${(minutes / 60).toFixed(1)} h`;
};

type ViewType = "traders" | "tokens";

interface LeaderboardProps {
  traders: Trader[];
  loading: boolean;
  onSort: (sortBy: keyof Trader) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  viewType: ViewType;
}

export function Leaderboard({
  traders,
  loading,
  onSort,
  currentPage,
  onPageChange,
  totalPages,
  viewType,
}: LeaderboardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [sharingTrader, setSharingTrader] = useState<Trader | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const handleTraderClick = (wallet: string) => {
    if (viewType === "traders") {
      router.push(`/trader/${encodeURIComponent(wallet)}`);
    }
  };

  const handleShare = (trader: Trader) => {
    setSharingTrader(trader);
  };

  const handleCloseShare = () => {
    setSharingTrader(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const headers =
    viewType === "traders"
      ? {
          name: "Trader",
          stats: [
            { label: "Followers", key: "xFollowers", icon: "purple" },
            { label: "Tokens", key: "tokensTraded", icon: "purple" },
            { label: "Win Rate", key: "winRate", icon: "purple" },
            { label: "Trades", key: "tradesCount", icon: "purple" },
            { label: "Avg Buy", key: "avgBuy", icon: "purple" },
            { label: "Avg Entry", key: "avgEntry", icon: "purple" },
            { label: "Avg Hold", key: "avgHold", icon: "purple" },
            { label: "PNL", key: "realizedPnl", icon: "yellow" },
          ],
        }
      : {
          name: "Token",
          stats: [
            { label: "Last Traded", key: "avgEntry", icon: "purple" },
            { label: "MC", key: "avgEntry", icon: "purple" },
            { label: "Invested", key: "avgBuy", icon: "purple" },
            { label: "Realized PNL", key: "realizedPnl", icon: "yellow" },
            { label: "ROI", key: "winRate", icon: "purple" },
            { label: "Trades", key: "tradesCount", icon: "purple" },
            { label: "Holding", key: "avgBuy", icon: "purple" },
            { label: "Avg Buy/Sell", key: "avgBuy", icon: "purple" },
            { label: "Held", key: "avgHold", icon: "purple" },
          ],
        };

  return (
    <div className="w-full mt-12 bg-[#11121B] overflow-hidden">
      {sharingTrader && (
        <ShareModal trader={sharingTrader} onClose={handleCloseShare} />
      )}
      {/*header*/}
      <div className="bg-[#25223D] grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 px-3 sm:px-6 py-3">
        <div className="text-gray-400 hidden sm:block">Rank</div>
        <div className="text-gray-400 col-span-2">{headers.name}</div>
        {headers.stats.map((stat) => (
          <div
            key={stat.label}
            className="text-gray-400 cursor-pointer text-center hidden lg:flex items-center justify-center gap-1"
            onClick={() => onSort(stat.key as keyof Trader)}
          >
            {stat.label}
            <ChevronDownIcon className={`h-4 w-4 text-${stat.icon}-300`} />
          </div>
        ))}
        <div className="text-gray-400 cursor-pointer text-center">Share</div>
      </div>
      {/*rows*/}
      <div className="divide-y divide-gray-800">
        {traders.map((trader) => (
          <div
            key={trader.id}
            className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 px-3 sm:px-6 py-4 hover:bg-[#1C1C28] font-bold ${
              viewType === "traders" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              viewType === "traders" && handleTraderClick(trader.wallet)
            }
          >
            <div className="items-center gap-2 hidden sm:flex">
              <div
                className={`flex items-center justify-center font-bold ${
                  trader.rank <= 3
                    ? "bg-yellow-500 text-black w-8 h-8 rounded-full"
                    : "bg-gray-400 w-8 h-8 rounded-full text-white"
                }`}
              >
                {trader.rank}
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Image
                alt={`${trader.name}'s profile`}
                src={trader.image}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2 min-w-0">
                <div className="text-white truncate">{trader.name}</div>
                {viewType === "traders" ? (
                  <div
                    className="text-gray-400 text-sm cursor-pointer hover:text-purple-300 truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(trader.wallet);
                    }}
                  >
                    {copied === trader.wallet
                      ? "Copied"
                      : shortenWalletAddress(trader.wallet)}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm truncate">
                    {trader.xTag}
                  </div>
                )}
              </div>
            </div>
            {viewType === "traders" ? (
              // Trader view columns
              <>
                <div className="flex-col items-end hidden lg:flex">
                  <div>{formatNumber(trader.xFollowers)}</div>
                  <div className="text-gray-400 text-sm truncate">
                    {trader.xTag}
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  {trader.tokensTraded}
                </div>
                <div
                  className={`text-right ${
                    trader.winRate >= 50 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.round(trader.winRate)}%
                </div>
                <div className="text-right tracking-wide hidden sm:block">
                  <span className="text-green-600">
                    {trader.tradesCount.buy}
                  </span>
                  /
                  <span className="text-red-600">
                    {trader.tradesCount.sell}
                  </span>
                </div>
                <div className="text-right hidden lg:block">
                  <div className="flex items-center gap-1 justify-end">
                    {formatSol(trader.avgBuy.solAmount)}
                    <Image
                      src="/solana.png"
                      alt="solana logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    ${formatUsd(trader.avgBuy.usdAmount)}
                  </div>
                </div>
                <div className="text-right uppercase hidden md:block">
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="text-right hidden lg:block">
                  {formatHoldTime(trader.avgHold)}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span
                      className={
                        trader.realizedPnl.solAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {trader.realizedPnl.solAmount > 0 ? "+" : ""}
                      {formatSol(trader.realizedPnl.solAmount)}
                    </span>
                    <Image
                      src="/solana.png"
                      alt="solana logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    ${formatUsd(trader.realizedPnl.usdAmount)}
                  </div>
                </div>
              </>
            ) : (
              // Token view columns
              <>
                <div className="text-right hidden lg:block">
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="text-right hidden lg:block">
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="flex-col items-end lg:flex">
                  <div className="flex items-center gap-1 justify-end">
                    {formatSol(trader.avgBuy.solAmount)}
                    <Image
                      src="/solana.png"
                      alt="solana logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    ${formatUsd(trader.avgBuy.usdAmount)}
                  </div>
                </div>
                <div className="text-right hidden lg:block">
                  <div className="flex items-center gap-1 justify-end">
                    <span
                      className={
                        trader.realizedPnl.solAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {trader.realizedPnl.solAmount > 0 ? "+" : ""}
                      {formatSol(trader.realizedPnl.solAmount)}
                    </span>
                    <Image
                      src="/solana.png"
                      alt="solana logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    ${formatUsd(trader.realizedPnl.usdAmount)}
                  </div>
                </div>
                <div
                  className={`text-right hidden lg:block ${
                    trader.winRate >= 50 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.round(trader.winRate)}%
                </div>
                <div className="text-right tracking-wide hidden lg:block">
                  <span className="text-green-600">
                    {trader.tradesCount.buy}
                  </span>
                  /
                  <span className="text-red-600">
                    {trader.tradesCount.sell}
                  </span>
                </div>
                <div className="text-right hidden lg:block">
                  <div className="flex items-center gap-1 justify-end">
                    {formatSol(trader.avgBuy.solAmount)}
                    <Image
                      src="/solana.png"
                      alt="solana logo"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    ${formatUsd(trader.avgBuy.usdAmount)}
                  </div>
                </div>
                <div className="text-right hidden lg:block">
                  {formatAvgEntry(trader.avgEntry)} /{" "}
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="text-right hidden lg:block">
                  {formatHoldTime(trader.avgHold)}
                </div>
              </>
            )}
            <div
              className="flex items-center justify-end sm:justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(trader);
              }}
            >
              <ShareIcon className="h-5 w-5 text-purple-600 hover:text-purple-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-4 bg-[#25223D]">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-600 hover:text-white transition-colors"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 hover:text-white transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
