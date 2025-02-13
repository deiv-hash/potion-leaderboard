"use client";
import Loading from "@/app/components/Loading";
import { TimeFrameSelector } from "@/app/components/TimeFrameSelector";
import { TimeFrame, Trader } from "@/app/types/trader";
import {
  formatNumber,
  formatHoldTime,
  shortenWalletAddress,
  formatSol,
  formatUsd,
  formatAvgEntry,
} from "@/app/utils/format";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshIcon } from "@/app/components/icons/RefreshIcon";
import { ShareIcon } from "@/app/components/icons/ShareIcon";
import { ShareModal } from "@/app/components/ShareModal";

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

  useEffect(() => {
    const fetchTrader = async () => {
      setLoading(true);
      try {
        const trader = await getTrader(wallet as string, selectedTimeFrame);
        setTrader(trader);
      } catch (error) {
        console.error("Error fetching trader:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrader();
  }, [wallet, selectedTimeFrame]);

  const handleShare = (trader: Trader) => {
    setSharingTrader(trader);
  };

  const handleCloseShare = () => {
    setSharingTrader(null);
  };

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  if (loading) {
    return <Loading />;
  }

  if (!trader) {
    return <div>Trader not found</div>;
  }

  return (
    <div className="flex gap-12">
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
            <p>{formatHoldTime(trader.lastTrade)}</p>
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
        <div className="grid grid-cols-3 mt-8">
          {/* Column 1 */}
          <div className="stats-container">
            <h3>Tokens</h3>
            <div className="text-right">
              <p>{trader.tokensTraded}</p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Avg Buy</h3>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {formatSol(trader.avgBuy.solAmount)}
                <Image
                  src="/solana.png"
                  alt="solana logo"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-sm text-gray-400">
                ${formatUsd(trader.avgBuy.usdAmount)}
              </div>
            </div>
          </div>
          <div className="stats-container">
            <h3>Total Invested</h3>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {formatSol(
                  trader.avgBuy.solAmount *
                    (trader.tradesCount.buy + trader.tradesCount.sell)
                )}
                <Image
                  src="/solana.png"
                  alt="solana logo"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-sm text-gray-400">
                $
                {formatUsd(
                  trader.avgBuy.usdAmount *
                    (trader.tradesCount.buy + trader.tradesCount.sell)
                )}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="stats-container">
            <h3>Win Rate</h3>
            <div className="text-right">
              <p
                className={
                  trader.winRate >= 50 ? "text-green-600" : "text-red-600"
                }
              >
                {Math.round(trader.winRate)}%
              </p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Avg Entry</h3>
            <div className="text-right">
              <p>{formatAvgEntry(trader.avgEntry)}</p>
            </div>
          </div>
          <div className="stats-container">
            <h3>ROI</h3>
            <div className="text-right">
              <p
                className={
                  trader.winRate >= 50 ? "text-green-600" : "text-red-600"
                }
              >
                {trader.winRate >= 50 ? "+" : ""}
                {Math.round(trader.winRate)}%
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="stats-container">
            <h3>Trades</h3>
            <div className="text-right">
              <p
                className={
                  trader.tradesCount.buy > trader.tradesCount.sell
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                <span className="text-green-600">{trader.tradesCount.buy}</span>
                /<span className="text-red-600">{trader.tradesCount.sell}</span>
              </p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Avg Hold</h3>
            <div className="text-right">
              <p>{formatHoldTime(trader.avgHold)}</p>
            </div>
          </div>
          <div className="stats-container">
            <h3>Realized PNL</h3>
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
              <div className="text-sm text-gray-400">
                ${formatUsd(trader.realizedPnl.usdAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
