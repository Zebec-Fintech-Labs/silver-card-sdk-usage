import React, { useEffect, useRef, useState } from "react";
import { useDisconnect } from "wagmi";
// import { CollapseDropdown } from "components/shared";
// import { useChainContext } from "app/ChainContext"
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useChainContext } from "../ChainContext";
import { useClickOutside } from "../useClickOutside";
import Cookies from "js-cookie";
import { CollapseDropdown } from "../CollapseDropdown";
import { CheveronDownIcon } from "../assets/icons";

const SelectChain = () => {
  const chainDropdownRef = useRef<HTMLDivElement | null>(null);
  const { currentChain, chainLists, setChain } = useChainContext();
  const { disconnect: evmDisconnect } = useDisconnect();

  const [toggleChainDropdown, setToggleChainDropdown] =
    useState<boolean>(false);
  // Sui

  useClickOutside(chainDropdownRef, {
    onClickOutside: () => setToggleChainDropdown(false),
  });

  const onDisconnectSuccess = () => {
    const isAppInitialized = Cookies.get("app_initialized");
    if (isAppInitialized) {
      if (JSON.parse(isAppInitialized)) {
        evmDisconnect();
        // tronDisconnect()
        // tonConnectUI?.disconnect().catch(() => { })
      }
    }
    // dispatch(setNetworkName(""))
    Cookies.remove("is_signed");
    // dispatch(setTokensListEmpty())
    // dispatch(clearWalletBalances())
    // dispatch(changeSignState({ isSigned: false, connectedChain: null }))
    // dispatch(setWalletModal(false))
  };

  useEffect(() => {
    const chainDetails = localStorage.getItem("card_chain_details");
    if (!chainDetails) {
      setChain(chainLists[0]);
      localStorage.setItem("card_chain_details", JSON.stringify(chainLists[0]));
    }
  }, []);

  return (
    <div className="flex items-center w-[200px] mb-4">
      <div className="relative flex-1 bg-white " ref={chainDropdownRef}>
        <button
          className="bg-transparent flex items-center gap-1.5 p-1 sm:p-1.5 flex-1 w-full justify-between border border-outline-border rounded-md"
          onClick={() => setToggleChainDropdown((prev) => !prev)}
        >
          <div className="w-5 h-5 relative">
            <Image
              src={currentChain.img}
              alt=""
              className="w-full h-full flex-shrink-0"
            />
          </div>
          <p>{currentChain?.name}</p>

          {/* <CheveronDownIcon
            className={`w-4 h-4 text-content-secondary transition-all duration-300 ${
              toggleChainDropdown ? "-rotate-180" : ""
            }`}
          /> */}
        </button>
        <CollapseDropdown
          show={toggleChainDropdown}
          className="bg-background-primary top-10 sm:top-11 divide-none max-h-64 hover:overflow-y-auto flex flex-col right-0 left-auto bottom-auto sm:left-0 sm:right-0 rounded-lg py-2 px-4 gap-y-2 shadow-md w-max sm:min-w-[200px]"
          // position={window?.innerWidth > 640 ? "right" : "left"}
        >
          {chainLists.map((chain, i) => (
            <div
              key={i}
              className={twMerge(
                "relative inline-flex rounded justify-between cursor-pointer items-center gap-3 p-2.5 transition",
                currentChain.chainSymbol === chain.chainSymbol
                  ? "bg-background-secondary"
                  : "hover:bg-background-secondary"
              )}
              onClick={() => {
                setChain(chain);
                setToggleChainDropdown(false);
                localStorage.setItem(
                  "card_chain_details",
                  JSON.stringify(chain)
                );
                evmDisconnect(
                  {},
                  {
                    onSuccess() {
                      onDisconnectSuccess();
                    },
                  }
                );
                // tronDisconnect().then(() => onDisconnectSuccess())
                // tonConnectUI
                //   ?.disconnect()
                //   .then(() => onDisconnectSuccess())
                //   .catch(() => { })
                // suiDisconnect().then(() => onDisconnectSuccess())
              }}
            >
              <div className="flex items-center gap-2 transition-colors text-sm font-semibold text-content-primary">
                <div className="w-5 h-5 relative">
                  <Image
                    src={chain.img}
                    alt=""
                    className="w-full h-full rounded"
                  />
                </div>
                {chain.name}
              </div>
            </div>
          ))}
        </CollapseDropdown>
      </div>
    </div>
  );
};

export default SelectChain;