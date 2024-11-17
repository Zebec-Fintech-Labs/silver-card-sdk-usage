"use client";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base, bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const projectId = "9ffef5d31b5a4df6de3a7adbd76fe74a";

export const config = createConfig({
  chains: [mainnet, sepolia, bscTestnet, bsc, base],
  multiInjectedProviderDiscovery: true,
  connectors: [
    metaMask({
      dappMetadata: {
        name: "wagmi",
      },
      useDeeplink: false,
    }),
    coinbaseWallet({ appName: "wagmi" }),
    walletConnect({ projectId }),
    injected({
      target() {
        return {
          id: "trustWallet",
          name: "Trust Wallet",
          provider: "isTrustWallet",
        };
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
    [base.id]: http(),
  },
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

export const WagmiContextProvider: React.FC<WagmiProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};
