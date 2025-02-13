"use client";
import Loading from "@/app/components/Loading";
import { TimeFrameSelector } from "@/app/components/TimeFrameSelector";
import { TimeFrame, Trader, TraderTab, Filters } from "@/app/types/trader";
import {
  formatNumber,
  formatHoldTime,
  shortenWalletAddress,
} from "@/app/utils/format";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshIcon } from "@/app/components/icons/RefreshIcon";
import { ShareIcon } from "@/app/components/icons/ShareIcon";
import { ShareModal } from "@/app/components/ShareModal";
import { TraderStats } from "@/app/components/TraderStats";
import { TabSelector } from "@/app/components/TabSelector";
import { Searchbar } from "@/app/components/Searchbar";
import { Filter } from "@/app/components/Filter";
import { Leaderboard } from "@/app/components/Leaderboard";

const getTrader = async (
  wallet: string,
  timeFrame: TimeFrame
): Promise<Trader> => {
  const response = await fetch(
    `/api/traders?search=${encodeURIComponent(wallet)}&timeFrame=${timeFrame}`
  );
  const data = await response.json();
  if (data.traders.length === 0) throw new Error("Trader not found");
  return data.traders[0];
};

export default function TraderPage() {
  const { wallet } = useParams();
  const [trader, setTrader] = useState<Trader | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharingTrader, setSharingTrader] = useState<Trader | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrame>("daily");
  const [activeTab, setActiveTab] = useState<TraderTab>("trades");

  const [filter, setFilter] = useState<Filters>({
    timeFrame: "daily",
    sortBy: "rank",
    sortDirection: "asc",
    search: "",
  });

  const [sortedTokens, setSortedTokens] = useState(trader?.tokenHistory || []);
  const [filteredTokens, setFilteredTokens] = useState(sortedTokens);

  useEffect(() => {
    const fetchTrader = async () => {
      setLoading(true);
      try {
        const trader = await getTrader(wallet as string, selectedTimeFrame);
        setTrader(trader);
        if (trader.tokenHistory) {
          setSortedTokens(trader.tokenHistory);
          setFilteredTokens(trader.tokenHistory);
        }
      } catch (error) {
        console.error("Error fetching trader:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrader();
  }, [wallet, selectedTimeFrame]);

  useEffect(() => {
    // Apply search filter and range filters
    const searchTerm = (filter.search || "").toLowerCase();
    let filtered = sortedTokens.filter(
      (token) =>
        token.tokenName.toLowerCase().includes(searchTerm) ||
        token.tokenAddress.toLowerCase().includes(searchTerm)
    );

    // Apply range filters
    const applyRangeFilter = (
      value: number,
      range?: { min?: number; max?: number }
    ) => {
      if (!range) return true;
      if (range.min !== undefined && value < range.min) return false;
      if (range.max !== undefined && value > range.max) return false;
      return true;
    };

    // Filter by win rate (ROI)
    if (filter.winRateRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(token.roi, filter.winRateRange)
      );
    }

    // Filter by trades count
    if (filter.tradesCountRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(
          token.tradesCount.buy + token.tradesCount.sell,
          filter.tradesCountRange
        )
      );
    }

    // Filter by average buy
    if (filter.avgBuyRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(token.invested.solAmount, filter.avgBuyRange)
      );
    }

    // Filter by market cap (avgEntry)
    if (filter.avgEntryRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(token.marketCap, filter.avgEntryRange)
      );
    }

    // Filter by hold time
    if (filter.avgHoldRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(token.timeHeld, filter.avgHoldRange)
      );
    }

    // Filter by realized PnL
    if (filter.realizedPnlRange) {
      filtered = filtered.filter((token) =>
        applyRangeFilter(token.realizedPnl.solAmount, filter.realizedPnlRange)
      );
    }

    setFilteredTokens(filtered);
  }, [filter, sortedTokens]);

  const handleShare = (trader: Trader) => {
    setSharingTrader(trader);
  };

  const handleCloseShare = () => {
    setSharingTrader(null);
  };

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilter(newFilters);
  };

  const handleSort = (sortBy: keyof Trader) => {
    setSortedTokens((currentTokens) => {
      const newTokens = [...currentTokens];
      newTokens.sort((a, b) => {
        const multiplier = filter.sortDirection === "asc" ? 1 : -1;

        // Handle special cases
        if (sortBy === "tradesCount") {
          const aTotal = a.tradesCount.buy + a.tradesCount.sell;
          const bTotal = b.tradesCount.buy + b.tradesCount.sell;
          return (aTotal - bTotal) * multiplier;
        }

        if (sortBy === "avgBuy") {
          return (a.invested.solAmount - b.invested.solAmount) * multiplier;
        }

        if (sortBy === "realizedPnl") {
          return (
            (a.realizedPnl.solAmount - b.realizedPnl.solAmount) * multiplier
          );
        }

        if (sortBy === "winRate") {
          return (a.roi - b.roi) * multiplier;
        }

        if (sortBy === "avgEntry") {
          return (a.marketCap - b.marketCap) * multiplier;
        }

        if (sortBy === "avgBuyMarketCap") {
          return (
            ((a.avgBuyMarketCap || 0) - (b.avgBuyMarketCap || 0)) * multiplier
          );
        }

        if (sortBy === "avgSellMarketCap") {
          return (
            ((a.avgSellMarketCap || 0) - (b.avgSellMarketCap || 0)) * multiplier
          );
        }

        if (sortBy === "avgHold") {
          return (a.timeHeld - b.timeHeld) * multiplier;
        }

        if (sortBy === "lastTrade") {
          return (a.lastTrade - b.lastTrade) * multiplier;
        }

        return 0;
      });
      return newTokens;
    });

    setFilter((prev) => ({
      ...prev,
      sortBy,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (!trader) {
    return <div>Trader not found</div>;
  }

  return (
    <>
      <div className="flex gap-12 mt-12">
        {sharingTrader && (
          <ShareModal trader={sharingTrader} onClose={handleCloseShare} />
        )}
        <div className="w-4/12">
          <div className="flex items-center gap-6">
            <Image
              src={trader.image}
              alt={trader.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h3 className="text-white capitalize text-3xl font-bold">
                {trader.name}
              </h3>
              <p className="text-gray-400">
                {shortenWalletAddress(trader.wallet)}
              </p>
            </div>
          </div>
          <div className="stats-container mt-8 border-0 border-b-[0.5px] border-gray-400">
            <h3>X Account</h3>
            <div className="text-right text-sm">
              <p>{trader.xTag}</p>
              <p className="text-gray-400">
                {formatNumber(trader.xFollowers)} Followers
              </p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Last Trade</h3>
            <div className="text-right">
              <p>{formatHoldTime(trader.lastTrade)} ago</p>
            </div>
          </div>
        </div>
        <div className="w-8/12">
          <div className="flex justify-between items-center w-full">
            <TimeFrameSelector
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameChange={handleTimeFrameChange}
            />
            <div className="flex gap-6">
              <button className="flex items-center gap-2">
                <span className="text-gray-400">
                  last refreshed few seconds ago
                </span>
                <RefreshIcon className="h-5 w-5 text-gray-400 hover:text-purple-300" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(trader);
                }}
              >
                <ShareIcon className="h-5 w-5 text-purple-600 hover:text-purple-300" />
              </button>
            </div>
          </div>
          <TraderStats trader={trader} />
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center">
          <TabSelector
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TraderTab)}
            variant="trader"
          />
          <div className="flex gap-4">
            <Searchbar onSearch={handleSearch} />
            <Filter filters={filter} onFilterChange={handleFilterChange} />
          </div>
        </div>
        {activeTab !== "trades" && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl text-purple-500 font-bold mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-400">
                {activeTab === "group"
                  ? "Group details are under development"
                  : "Token details are under development"}
              </p>
            </div>
          </div>
        )}

        {activeTab === "trades" && (
          <div className="mt-8">
            <Leaderboard
              traders={filteredTokens.map((token, index) => ({
                id: token.tokenName,
                name: token.tokenName,
                wallet: token.tokenAddress,
                image: `/tokens/${token.tokenName.toLowerCase()}.png`,
                rank: index + 1,
                xFollowers: 0,
                xTag: "",
                tokensTraded: token.tradesCount.buy + token.tradesCount.sell,
                winRate: token.roi,
                tradesCount: token.tradesCount,
                avgBuy: token.invested,
                avgEntry: token.marketCap,
                avgHold: token.timeHeld,
                realizedPnl: token.realizedPnl,
                tokenHistory: [],
                lastTrade: token.lastTrade,
                avgBuyMarketCap: token.avgBuyMarketCap,
                avgSellMarketCap: token.avgSellMarketCap,
              }))}
              loading={loading}
              onSort={handleSort}
              currentPage={1}
              onPageChange={() => {}}
              totalPages={1}
              viewType="tokens"
            />
          </div>
        )}
      </div>
    </>
  );
}
