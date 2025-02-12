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

    // Draw trader name
    ctx.font = "bold 48px Inter";
    ctx.fillText(trader.name, canvas.width / 2, 100);

    // Draw trader stats
    ctx.font = "32px Inter";
    const stats = [
      `Rank: #${trader.rank}`,
      `Win Rate: ${Math.round(trader.winRate)}%`,
      `Trades: ${trader.tradesCount.buy + trader.tradesCount.sell}`,
      `PNL: ${trader.realizedPnl.solAmount > 0 ? "+" : ""}${formatSol(
        trader.realizedPnl.solAmount
      )} SOL`,
    ];

    stats.forEach((stat, index) => {
      ctx.fillText(stat, canvas.width / 2, 200 + index * 60);
    });

    // Add watermark
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
