"use client";
import Loading from "@/app/components/Loading";
import { TimeFrameSelector } from "@/app/components/TimeFrameSelector";
import {
  TimeFrame,
  Trader,
  TraderTab,
  Filters,
  TokenTrade,
} from "@/app/types/trader";
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
import { sortItems, filterTokenTrades } from "@/app/utils/sort";

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
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
    const filtered = filterTokenTrades(
      sortedTokens,
      filter.search || "",
      filter
    );
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
      const newTokens = sortItems(
        currentTokens,
        sortBy,
        filter.sortDirection
      ) as TokenTrade[];
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
      {sharingTrader && (
        <ShareModal trader={sharingTrader} onClose={handleCloseShare} />
      )}
      <div className="flex flex-col gap-8 mt-6 sm:mt-12 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trader Info Section */}
          <div className="w-full lg:w-4/12">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-11">
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
              <div className="flex flex-col sm:flex-row lg:flex-col flex-grow">
                <div className="stats-container border-b border-gray-400 w-full">
                  <h3>X Account</h3>
                  <div className="text-right text-sm">
                    <a
                      href={`https://x.com/${trader.xTag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {trader.xTag}
                    </a>
                    <p className="text-gray-400">
                      {formatNumber(trader.xFollowers)} Followers
                    </p>
                  </div>
                </div>
                <div className="stats-container w-full">
                  <h3>Last Trade</h3>
                  <div className="text-right">
                    <p>{formatHoldTime(trader.lastTrade)} ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TimeFrameSelector
                  selectedTimeFrame={selectedTimeFrame}
                  onTimeFrameChange={handleTimeFrameChange}
                />
                <div className="flex gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    className="flex items-center gap-2"
                    onClick={handleRefresh}
                  >
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
              {refreshing ? <Loading /> : <TraderStats trader={trader} />}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabSelector
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as TraderTab)}
                variant="trader"
              />
              <div className="flex items-center gap-4">
                <div className="w-full sm:w-auto">
                  <Searchbar onSearch={handleSearch} />
                </div>
                <Filter
                  filters={filter}
                  onFilterChange={handleFilterChange}
                  viewType="tokens"
                />
              </div>
            </div>
          </div>

          {activeTab !== "trades" ? (
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
          ) : (
            <div className="-mx-4 sm:mx-0">
              <Leaderboard
                traders={filteredTokens.map((token, index) => ({
                  id: token.tokenName,
                  name: token.tokenName,
                  wallet: token.tokenAddress,
                  image: `${token.image}`,
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
      </div>
    </>
  );
}
