"use client";
// hooks/useBittensorWallet.js
import { useState, useEffect } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
// import type { InjectedAccountWithMeta } from '@polkadot/extension-dapp';

export const useBittensorWallet = () => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [signer, setSigner] = useState<any>();
  const [walletConnected, setWalletConnected] = useState(false);
  useEffect(() => {
    const connectToBlockchain = async () => {
      const wsProvider = new WsProvider(
        "wss://test.finney.opentensor.ai"
        // "wss://entrypoint-finney.opentensor.ai:443"
      ); // Use the correct endpoint for Bittensor
      const api = await ApiPromise.create({ provider: wsProvider });
      setApi(api);
    };

    connectToBlockchain();
  }, []);

  const connectWallet = async () => {
    // Request wallet extension permissions
    const extensions = await web3Enable("Bittensor Wallet");
    if (extensions.length === 0) {
      console.error("No wallet extension found");
      return;
    }

    // Get accounts from wallet
    const accounts = await web3Accounts();
    setAccounts(accounts);
    if (accounts.length) {
      const signer = await web3FromAddress(accounts[0]?.address);
      setSigner(signer);
      setWalletConnected(true);
    }
  };

  return {
    api,
    accounts,
    connectWallet,
    signer,
    setWalletConnected,
    walletConnected,
  };
};

// const balance: any = await api?.query.system.account(params.walletAddress);
// const freeBalance = balance.data.free.toNumber();
// divide by 10 to the power 9
