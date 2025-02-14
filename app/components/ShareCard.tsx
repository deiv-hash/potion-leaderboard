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

    // Load logo image
    const logoImage = new Image();
    logoImage.src = "/logo.png";

    await new Promise((resolve) => {
      logoImage.onload = resolve;
    });

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

    // Draw logo
    const logoWidth = 200;
    const logoHeight = (logoWidth * logoImage.height) / logoImage.width;
    ctx.drawImage(
      logoImage,
      canvas.width - logoWidth - 40,
      40,
      logoWidth,
      logoHeight
    );

    // Set text styles
    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";

    // Draw trader name and rank
    ctx.font = "bold 48px Inter";
    ctx.fillText(`${trader.name} (#${trader.rank})`, 40, 80);

    // Draw X info
    ctx.font = "24px Inter";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText(
      `${formatNumber(trader.xFollowers)} followers • ${trader.xTag}`,
      40,
      120
    );

    // Draw stats grid
    const stats = [
      {
        label: "Win Rate",
        value: `${Math.round(trader.winRate)}%`,
        color: trader.winRate >= 50 ? "#22C55E" : "#EF4444",
      },
      {
        label: "Trades",
        value: `${trader.tradesCount.buy}/${trader.tradesCount.sell}`,
        color: "#FFFFFF",
      },
      {
        label: "Tokens",
        value: trader.tokensTraded.toString(),
        color: "#FFFFFF",
      },
      {
        label: "Avg Hold",
        value: formatHoldTime(trader.avgHold),
        color: "#FFFFFF",
      },
      {
        label: "Avg Buy",
        value: `${formatSol(trader.avgBuy.solAmount)} SOL`,
        color: "#FFFFFF",
      },
      {
        label: "Avg Entry",
        value: formatAvgEntry(trader.avgEntry),
        color: "#FFFFFF",
      },
      {
        label: "PNL",
        value: `${trader.realizedPnl.solAmount > 0 ? "+" : ""}${formatSol(
          trader.realizedPnl.solAmount
        )} SOL`,
        color: trader.realizedPnl.solAmount > 0 ? "#22C55E" : "#EF4444",
      },
      {
        label: "PNL (USD)",
        value: `$${trader.realizedPnl.usdAmount.toLocaleString()}`,
        color: trader.realizedPnl.usdAmount > 0 ? "#22C55E" : "#EF4444",
      },
    ];

    // Draw stats in a grid (4x2)
    const startY = 200;
    const startX = 40;
    const colWidth = (canvas.width - 80) / 4;
    const rowHeight = 100;

    stats.forEach((stat, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      const x = startX + col * colWidth;
      const y = startY + row * rowHeight;

      // Draw stat label
      ctx.font = "24px Inter";
      ctx.fillStyle = "#9CA3AF";
      ctx.fillText(stat.label, x, y);

      // Draw stat value
      ctx.font = "bold 36px Inter";
      ctx.fillStyle = stat.color;
      ctx.fillText(stat.value, x, y + 40);
    });

    // Add time frame indicator
    ctx.textAlign = "left";
    ctx.font = "bold 24px Inter";
    ctx.fillStyle = "#AA00FF";
    ctx.fillText("24H Performance", 40, canvas.height - 40);

    // Add watermark
    ctx.textAlign = "right";
    ctx.font = "24px Inter";
    ctx.fillStyle = "#6B7280";
    ctx.fillText("potion.trade", canvas.width - 40, canvas.height - 40);

    // Return the generated image URL
    onGenerated(canvas.toDataURL("image/png"));
  }, [trader, onGenerated]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
}
