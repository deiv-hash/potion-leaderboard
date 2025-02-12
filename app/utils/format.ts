export const shortenWalletAddress = (wallet: string): string => {
  if (wallet.length < 10) return wallet;
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
};
