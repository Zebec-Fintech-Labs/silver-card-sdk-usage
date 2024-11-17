"use client";
import React, { PropsWithChildren } from "react";
import { Chain, ChainContextProps } from "./Chain";
import * as Chains from "./assets/chain";
interface NetworkConfigOptions {
  [key: string]: {
    [key: string]: number;
  };
}
export const NetworkConfig: NetworkConfigOptions = {
  ETH: {
    mainnet: 1,
    devnet: 11155111,
  },
  BNB: {
    mainnet: 56,
    devnet: 97,
  },
  BASE: {
    mainnet: 8453,
    devnet: 11155111,
  },
};

export const ChainContext = React.createContext<ChainContextProps>({
  chainLists: [],
  currentChain: {} as Chain,
  setChain: () => {},
});

const chainLists = [
  {
    name: "Ethereum",
    img: Chains.EthereumImg,
    chainSymbol: "ETH",
  },
  {
    name: "BNB Smart Chain",
    img: Chains.BNBImg,
    chainSymbol: "BNB",
  },
  {
    name: "Base",
    img: Chains.BaseImg,
    chainSymbol: "BASE",
  },

  {
    name: "Bittensor",
    img: Chains.BittensorImg,
    chainSymbol: "BITTENSOR",
  },
];

export const ChainContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [chain, setChain] = React.useState<Chain>(chainLists[0]);

  React.useEffect(() => {
    const chainDetails = localStorage.getItem("card_chain_details");
    if (chainDetails) {
      setChain(JSON.parse(chainDetails));
    } else {
      setChain({ ...chain });
    }
    // eslint-disable-next-line
  }, []);

  const chainDetails = React.useMemo(() => {
    if (chain.chainSymbol === "BITTENSOR") return chain;
    chain["chainId"] =
      NetworkConfig[chain.chainSymbol][process.env.RPC_NETWORK || "devnet"];
    return chain;
  }, [chain]);

  return (
    <ChainContext.Provider
      value={{
        currentChain: chainDetails,
        setChain,
        chainLists,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useChainContext = () => React.useContext(ChainContext);
