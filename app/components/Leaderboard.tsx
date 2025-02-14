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
import { RequireWallet } from "./RequireWallet";

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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#25223D] text-white">
            <tr>
              {viewType === "traders" && (
                <th className="hidden sm:table-cell px-3 py-3 font-bold text-left">
                  Rank
                </th>
              )}
              <th
                className={`px-3 py-3 font-bold text-left ${
                  viewType === "tokens" ? "pl-6" : ""
                }`}
              >
                {headers.name}
              </th>
              {headers.stats.map((stat) => (
                <th
                  key={stat.label}
                  className="px-3 py-3 font-bold hidden md:table-cell cursor-pointer"
                >
                  <RequireWallet
                    onAction={() => handleSort(stat.key as keyof Trader)}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {stat.label}
                      <ChevronDownIcon
                        className="h-4 w-4"
                        isSelected={selectedSort === stat.key}
                      />
                    </div>
                  </RequireWallet>
                </th>
              ))}
              <th className="px-6 py-3 font-bold text-right">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {traders.map((trader) => {
              const traderRow = (
                <tr
                  key={trader.id}
                  className={`hover:bg-[#1C1C28] font-bold ${
                    viewType === "traders" ? "cursor-pointer" : ""
                  }`}
                >
                  {viewType === "traders" && (
                    <td className="hidden sm:table-cell px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center text-black justify-center font-bold w-8 h-8 rounded-full ${
                            trader.rank === 1
                              ? "bg-yellow-500"
                              : trader.rank === 2
                              ? "bg-gray-500"
                              : trader.rank === 3
                              ? "bg-[#CD7F32]"
                              : "rounded-none text-white"
                          }`}
                        >
                          {trader.rank}
                        </div>
                      </div>
                    </td>
                  )}
                  <td
                    className={`px-3 py-4 ${
                      viewType === "tokens" ? "pl-6" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        alt={`${trader.name}'s profile`}
                        src={trader.image}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-2 min-w-0">
                        <div className="text-white truncate">{trader.name}</div>
                        <div className="text-gray-400 text-sm flex items-center gap-1">
                          <div className=" flex gap-2 items-center">
                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(trader.wallet);
                              }}
                              className="cursor-pointer font-light hover:text-purple-300 truncate"
                            >
                              {copied === trader.wallet
                                ? "Copied"
                                : shortenWalletAddress(trader.wallet)}
                            </p>

                            {/*
                            feature coming soon
                            <a
                              href={`${trader.wallet}`}
                              target="_blank"
                              className="border px-2 py-1 rounded-full"
                            >
                              Track
                            </a>*/}
                          </div>
                          {viewType === "tokens" && (
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://x.com/search?q=($${trader.name}%20OR%20${trader.wallet})&src=typed_query&f=live`}
                                target="_blank"
                                className="h-4 w-4 cursor-pointer hover:text-purple-300"
                              >
                                <TwitterIcon />
                              </a>
                              <a
                                href={`https://solscan.com/token/${trader.wallet}`}
                                target="_blank"
                                className="h-4 w-4 cursor-pointer hover:text-purple-300"
                              >
                                <SolscanIcon />
                              </a>
                            </div>
                          )}
                        </div>
                        {viewType === "tokens" && (
                          <button className="flex items-center justify-center gap-1 border border-purple-200 rounded-full px-2 py-1 hover:text-white hover:bg-purple-200 transition-colors mt-2">
                            <Image
                              src="/nova.png"
                              width={20}
                              height={20}
                              alt="trade on nova"
                            />
                            <span className="text-gray-400 text-sm">Buy</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  {viewType === "traders" ? (
                    <>
                      <td className="px-3 py-4 hidden md:table-cell text-right">
                        <div>
                          {formatNumber(trader.xFollowers)}
                          <div className="text-gray-400 text-sm font-light truncate">
                            {trader.xTag}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 hidden md:table-cell text-right">
                        {trader.tokensTraded}
                      </td>
                      <td
                        className={`px-3 py-4 text-right ${
                          trader.winRate >= 50
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {Math.round(trader.winRate)}%
                      </td>
                      <td className="px-3 py-4 hidden sm:table-cell text-right">
                        <span className="text-green-600">
                          {trader.tradesCount.buy}
                        </span>{" "}
                        /{" "}
                        <span className="text-red-600">
                          {trader.tradesCount.sell}
                        </span>
                      </td>
                      <td className="px-3 py-4 hidden lg:table-cell text-right">
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
                      </td>
                      <td className="px-3 py-4 hidden lg:table-cell text-right uppercase">
                        {formatAvgEntry(trader.avgEntry)}
                      </td>
                      <td className="px-3 py-4 hidden xl:table-cell text-right">
                        {formatHoldTime(trader.avgHold)}
                      </td>
                      <td className="px-3 py-4 text-right">
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
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-4 hidden md:table-cell text-right">
                        {formatHoldTime(trader.lastTrade)}
                      </td>
                      <td className="px-3 py-4 hidden md:table-cell text-right">
                        {formatAvgEntry(trader.avgEntry)}
                      </td>
                      <td className="px-3 py-4 text-right">
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
                      </td>
                      <td className="px-3 py-4 text-right">
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
                      </td>
                      <td
                        className={`px-3 py-4 hidden lg:table-cell text-right ${
                          trader.winRate >= 50
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {Math.round(trader.winRate)}%
                      </td>
                      <td className="px-3 py-4 hidden lg:table-cell text-right">
                        <span className="text-green-600">
                          {trader.tradesCount.buy}
                        </span>{" "}
                        /{" "}
                        <span className="text-red-600">
                          {trader.tradesCount.sell}
                        </span>
                      </td>
                      <td className="px-3 py-4 hidden lg:table-cell text-right">
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
                      </td>
                      <td className="px-3 py-4 hidden xl:table-cell text-right">
                        {formatAvgEntry(trader.avgBuyMarketCap || 0)}
                      </td>
                      <td className="px-3 py-4 hidden xl:table-cell text-right">
                        {formatAvgEntry(trader.avgSellMarketCap || 0)}
                      </td>
                      <td className="px-3 py-4 hidden xl:table-cell text-right">
                        {formatHoldTime(trader.avgHold)}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(trader);
                        }}
                      >
                        <ShareIcon className="h-5 w-5 text-purple-600 hover:text-purple-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              );

              return viewType === "traders" ? (
                <RequireWallet
                  key={trader.id}
                  onAction={() => handleTraderClick(trader.wallet)}
                >
                  {traderRow}
                </RequireWallet>
              ) : (
                traderRow
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <RequireWallet onAction={() => onPageChange(currentPage - 1)}>
            <button
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                currentPage === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
          </RequireWallet>
          <RequireWallet onAction={() => onPageChange(currentPage + 1)}>
            <button
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </RequireWallet>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <RequireWallet onAction={() => onPageChange(currentPage - 1)}>
                <button
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              </RequireWallet>
              <RequireWallet onAction={() => onPageChange(currentPage + 1)}>
                <button
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </RequireWallet>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
