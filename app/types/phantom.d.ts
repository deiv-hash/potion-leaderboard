interface PhantomProvider {
  isPhantom?: boolean;
  connect: (opts?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  solana?: PhantomProvider;
}

interface Window {
  phantom?: PhantomProvider;
}
