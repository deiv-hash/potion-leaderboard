import { Trader } from "@/app/types/trader";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShareIcon } from "./icons/ShareIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { ChevronLeftIcon } from "./icons/ChevronLeftIcon";
import { ChevronRightIcon } from "./icons/ChevronRightIcon";
import { ShareModal } from "./ShareModal";
import {
  formatAvgEntry,
  formatHoldTime,
  formatNumber,
  formatSol,
  formatUsd,
  shortenWalletAddress,
} from "@/app/utils/format";
import Loading from "./Loading";
import { TwitterIcon } from "./icons/TwitterIcon";
import { SolscanIcon } from "./icons/SolscanIcon";

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
  const [selectedSort, setSelectedSort] = useState<keyof Trader | null>(null);

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

  const handleSort = (key: keyof Trader) => {
    setSelectedSort(key);
    onSort(key);
  };

  if (loading) {
    return <Loading />;
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
            { label: "Last Trade", key: "lastTrade", icon: "purple" },
            { label: "MC", key: "avgEntry", icon: "purple" },
            { label: "Invested", key: "avgBuy", icon: "purple" },
            { label: "Realized PNL", key: "realizedPnl", icon: "yellow" },
            { label: "ROI", key: "winRate", icon: "purple" },
            { label: "Trades", key: "tradesCount", icon: "purple" },
            { label: "Holding", key: "avgBuy", icon: "purple" },
            { label: "Avg Buy", key: "avgBuyMarketCap", icon: "purple" },
            { label: "Avg Sell", key: "avgSellMarketCap", icon: "purple" },
            { label: "Time Held", key: "avgHold", icon: "purple" },
          ],
        };

  return (
    <div className="w-full mt-8 bg-[#11121B] overflow-hidden">
      {sharingTrader && (
        <ShareModal trader={sharingTrader} onClose={handleCloseShare} />
      )}
      {/*header*/}
      <div className="bg-[#25223D] font-bold text-white grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 px-3 sm:px-6 py-3">
        {viewType === "traders" && <div className=" hidden sm:block">Rank</div>}
        <div
          className={` col-span-2 ${
            viewType === "tokens" ? "col-start-1" : ""
          }`}
        >
          {headers.name}
        </div>
        {headers.stats.map((stat) => (
          <div
            key={stat.label}
            className=" cursor-pointer text-center hidden md:flex items-center justify-center gap-1"
            onClick={() => handleSort(stat.key as keyof Trader)}
          >
            {stat.label}
            <ChevronDownIcon
              className="h-4 w-4"
              isSelected={selectedSort === stat.key}
            />
          </div>
        ))}
        <div className="cursor-pointer text-center col-start-4 sm:col-start-6 md:col-start-8 lg:col-start-10 xl:col-start-12">
          Share
        </div>
      </div>
      {/*rows*/}
      <div className="divide-y divide-gray-800">
        {traders.map((trader) => (
          <div
            key={trader.id}
            className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 px-3 sm:px-6 py-4 hover:bg-[#1C1C28] font-bold ${
              viewType === "traders" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              viewType === "traders" && handleTraderClick(trader.wallet)
            }
          >
            {viewType === "traders" && (
              <div className="items-center gap-2 hidden sm:flex">
                <div
                  className={`flex items-center text-black justify-center font-bold w-8 h-8 rounded-full ${
                    trader.rank === 1
                      ? "bg-yellow-500 "
                      : trader.rank === 2
                      ? "bg-gray-500 "
                      : trader.rank === 3
                      ? "bg-[#CD7F32] "
                      : "rounded-none text-white"
                  }`}
                >
                  {trader.rank}
                </div>
              </div>
            )}
            <div
              className={`col-span-2 flex items-center gap-2 ${
                viewType === "tokens" ? "col-start-1" : ""
              }`}
            >
              <Image
                alt={`${trader.name}'s profile`}
                src={trader.image}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2 min-w-0">
                <div className="text-white truncate">{trader.name}</div>
                <div className="text-gray-400 text-sm  flex items-center gap-1">
                  <div
                    className="cursor-pointer font-light hover:text-purple-300 truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(trader.wallet);
                    }}
                  >
                    {copied === trader.wallet
                      ? "Copied"
                      : shortenWalletAddress(trader.wallet)}
                  </div>

                  {viewType === "tokens" && (
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://x.com/search?q=($${trader.name}%20OR%20${trader.wallet})&src=typed_query&f=live`}
                        target="_blank"
                        className="h-4 w-4 cursor-pointer hover:text-purple-300 "
                      >
                        <TwitterIcon />
                      </a>
                      <a
                        href={`https://solscan.com/token/${trader.wallet}`}
                        target="_blank"
                        className="h-4 w-4 cursor-pointer hover:text-purple-300 "
                      >
                        <SolscanIcon />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {viewType === "traders" ? (
              // Trader view columns
              <>
                <div className="flex-col items-end hidden md:flex">
                  <div>{formatNumber(trader.xFollowers)}</div>
                  <div className="text-gray-400 text-sm font-light truncate">
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
                <div className="text-right uppercase hidden lg:block">
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="text-right hidden xl:block">
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
                <div className="text-right hidden md:block">
                  {formatHoldTime(trader.lastTrade)}
                </div>
                <div className="text-right hidden md:block">
                  {formatAvgEntry(trader.avgEntry)}
                </div>
                <div className="flex-col items-end md:flex">
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
                <div className="text-right hidden md:block">
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
                <div className="text-right hidden xl:block">
                  {formatAvgEntry(trader.avgBuyMarketCap || 0)}
                </div>
                <div className="text-right hidden xl:block">
                  {formatAvgEntry(trader.avgSellMarketCap || 0)}
                </div>
                <div className="text-right hidden xl:block">
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
