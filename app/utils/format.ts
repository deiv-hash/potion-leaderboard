// Format wallet address to show first 4 and last 4 characters
export const shortenWalletAddress = (wallet: string): string => {
  if (wallet.length < 10) return wallet;
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
};

// Format large numbers to k/m/b format
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}b`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${Math.round(num / 1000)}k`;
  return `<${num >= 1000 ? Math.round(num / 1000) : 1}k`;
};

// Format SOL amounts with appropriate decimal places
export const formatSol = (num: number): string => {
  if (num >= 100) return Math.round(num).toString();
  if (num >= 10) return num.toFixed(1);
  return num.toFixed(2);
};

// Format USD amounts with appropriate decimal places
export const formatUsd = (num: number): string => {
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

// Format market cap values to K/M/B format with $ prefix
export const formatAvgEntry = (num: number): string => {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${Math.round(num / 1000)}K`;
  return `<$1K`;
};

// Format time duration from minutes to minutes/hours/days
export const formatHoldTime = (minutes: number | undefined): string => {
  if (!minutes || isNaN(minutes)) return "N/A";
  if (minutes < 60) return `${Math.round(minutes)} m`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(1)} h`;
  return `${Math.round(minutes / 1440)} d`;
};
