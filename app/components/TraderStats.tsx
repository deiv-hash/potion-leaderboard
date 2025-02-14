import { Trader } from "@/app/types/trader";
import {
  formatSol,
  formatUsd,
  formatAvgEntry,
  formatHoldTime,
} from "@/app/utils/format";
import Image from "next/image";

interface TraderStatsProps {
  trader: Trader;
}

export function TraderStats({ trader }: TraderStatsProps) {
  return (
    <div className="grid grid-cols-3 mt-8">
      {/* Column 1 */}
      <div className="stats-container">
        <h3>Tokens</h3>
        <div className="text-right">
          <p>{trader.tokensTraded}</p>
        </div>
      </div>
      <div className="stats-container border-l border-r border-gray-700">
        <h3>Avg Buy</h3>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            {formatSol(trader.avgBuy.solAmount)}
            <Image src="/solana.png" alt="solana logo" width={20} height={20} />
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
            <Image src="/solana.png" alt="solana logo" width={20} height={20} />
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
      <div className="stats-container border-t border-b border-gray-700">
        <h3>Win Rate</h3>
        <div className="text-right">
          <p
            className={trader.winRate >= 50 ? "text-green-600" : "text-red-600"}
          >
            {Math.round(trader.winRate)}%
          </p>
        </div>
      </div>
      <div className="stats-container border-t border-b border-l border-r border-gray-700">
        <h3>Avg Entry</h3>
        <div className="text-right">
          <p>{formatAvgEntry(trader.avgEntry)}</p>
        </div>
      </div>
      <div className="stats-container border-t border-b border-gray-700">
        <h3>ROI</h3>
        <div className="text-right">
          <p
            className={trader.winRate >= 50 ? "text-green-600" : "text-red-600"}
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
          <p>
            <span className="text-green-600">{trader.tradesCount.buy}</span> /{" "}
            <span className="text-red-600">{trader.tradesCount.sell}</span>
          </p>
        </div>
      </div>
      <div className="stats-container border-l border-r border-gray-700">
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
            <Image src="/solana.png" alt="solana logo" width={20} height={20} />
          </div>
          <div className="text-sm text-gray-400">
            ${formatUsd(trader.realizedPnl.usdAmount)}
          </div>
        </div>
      </div>
    </div>
  );
}
