import { Trader } from "@/app/types/trader";
import { useRef, useEffect, useCallback } from "react";

interface ShareCardProps {
  trader: Trader;
  onGenerated: (imageUrl: string) => void;
}

const formatSol = (num: number): string => {
  if (num >= 100) return Math.round(num).toString();
  if (num >= 10) return num.toFixed(1);
  return num.toFixed(2);
};

const formatNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}b`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `<${num >= 1000 ? Math.round(num / 1000) : 1}k`;
};

const formatAvgEntry = (num: number): string => {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${Math.round(num / 1000)}K`;
  return `<$1K`;
};

const formatHoldTime = (minutes: number): string => {
  if (minutes < 240) return `${minutes}m`;
  return `${(minutes / 60).toFixed(1)}h`;
};

export function ShareCard({ trader, onGenerated }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 630;

    // Draw background
    ctx.fillStyle = "#11121B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add gradient border
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#9333EA");
    gradient.addColorStop(1, "#4F46E5");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    // Set text styles
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";

    // Draw trader name and rank
    ctx.font = "bold 48px Inter";
    ctx.fillText(`${trader.name} (#${trader.rank})`, canvas.width / 2, 80);

    // Draw X info
    ctx.font = "24px Inter";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText(
      `${formatNumber(trader.xFollowers)} followers • ${trader.xTag}`,
      canvas.width / 2,
      120
    );

    // Draw stats in two columns
    ctx.font = "28px Inter";
    const leftStats = [
      ["Win Rate", `${Math.round(trader.winRate)}%`],
      ["Trades", `${trader.tradesCount.buy}/${trader.tradesCount.sell}`],
      ["Tokens", trader.tokensTraded.toString()],
      ["Avg Hold", formatHoldTime(trader.avgHold)],
    ];

    const rightStats = [
      ["Avg Buy", `${formatSol(trader.avgBuy.solAmount)} SOL`],
      ["Avg Entry", formatAvgEntry(trader.avgEntry)],
      [
        "PNL",
        `${trader.realizedPnl.solAmount > 0 ? "+" : ""}${formatSol(
          trader.realizedPnl.solAmount
        )} SOL`,
      ],
      ["PNL (USD)", `$${trader.realizedPnl.usdAmount.toLocaleString()}`],
    ];

    // Draw left column
    ctx.textAlign = "right";
    leftStats.forEach((stat, index) => {
      const y = 200 + index * 60;
      ctx.fillStyle = "#9CA3AF";
      ctx.fillText(stat[0], canvas.width / 2 - 20, y);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(stat[1], canvas.width / 2 - 100, y);
    });

    // Draw right column
    ctx.textAlign = "left";
    rightStats.forEach((stat, index) => {
      const y = 200 + index * 60;
      ctx.fillStyle = "#9CA3AF";
      ctx.fillText(stat[0], canvas.width / 2 + 20, y);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(stat[1], canvas.width / 2 + 100, y);
    });

    // Add watermark
    ctx.textAlign = "center";
    ctx.font = "24px Inter";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("potion.trade", canvas.width / 2, canvas.height - 40);

    // Return the generated image URL
    onGenerated(canvas.toDataURL("image/png"));
  }, [trader, onGenerated]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
}
