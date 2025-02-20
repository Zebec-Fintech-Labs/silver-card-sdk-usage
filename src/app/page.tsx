"use client";
import React, { useEffect, useState } from "react";
import { purchaseCard } from "./services";
import { useBittensorWallet } from "./services/useBittensorwallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allCountriesWithCode } from "@zebec-fintech/silver-card-sdk";
import { useChainContext } from "./ChainContext";
import {
  Connector,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";
import Cookies from "js-cookie";
import { isMobile } from "react-device-detect";
import { useEthersSigner } from "./ethers";
import SelectChain from "./components/select-chain";
import { Modal } from "./components/Modal";

export default function Home() {
  const {
    accounts,
    connectWallet,
    signer,
    setWalletConnected,
    walletConnected,
  } = useBittensorWallet();
  const { connect, connectors } = useConnect();
  const { connector, isReconnecting, address, isConnected, chainId } =
    useAccount();
  const { disconnect } = useDisconnect();
  const wallets = React.useMemo(() => {
    return connectors.reduce((acc, cur) => {
      const isDuplicate = acc.some(
        (c) => c.name.toLowerCase() === cur.name.toLowerCase()
      );
      const isPhantom = cur.name.toLowerCase() === "phantom";
      if (!isDuplicate && !isPhantom) acc.push(cur);

      return acc.filter(({ name }) =>
        isMobile ? name.toLowerCase() !== "trust wallet" : true
      );
    }, [] as Connector[]);
  }, [connectors, isMobile]);

  const [amount, setAmount] = useState<number>(0);
  const [participantId, setParticipantId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [address1, setAddress1] = useState("");
  const { currentChain } = useChainContext();
  const [pendingConnector, setPendingConnector] = useState(null);

  const handleConnect = async (con: any) => {
    if (con.id === "injected") {
      const provider = con.getProvider();
      if (!provider) {
        if (typeof window !== undefined) {
          let url = "";
          if (con.name === "Bitget") {
            url = "https://web3.bitget.com/en/wallet-download?type=2";
          } else if (con.name === "Binance") {
            url = "https://www.bnbchain.org/en/binance-wallet";
          }
          if (url && typeof window !== undefined) {
            window.open(url);
            return;
          }
        }
      }
    }
    setPendingConnector(con);
    connect({ connector: con });
    setPendingConnector(null);
    Cookies.remove("app_initialized");
  };
  const evmSigner = useEthersSigner();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formFields = {
        participantId,
        firstName,
        lastName,
        emailAddress,
        mobilePhone,
        language,
        city,
        state,
        postalCode,
        countryCode,
        address1,
      };

      const res = await purchaseCard({
        signer: currentChain?.name === "Bittensor" ? signer : evmSigner,
        address:
          currentChain?.name === "Bittensor" ? accounts[0]?.address : address,
        amount: amount,
        formFields: formFields,
        type: currentChain?.name !== "Bittensor" ? "evm" : "bittensor",
        chainId: currentChain?.chainId!,
      });
      if (res) {
        setLoading(false);

        setAmount(0);
        setParticipantId("");
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setMobilePhone("");
        setLanguage("en-US");
        setCity("");
        setState("");
        setPostalCode("");
        setCountryCode("");
        setAddress1("");
      }
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  const chainInfo = useChainId();
  const { switchChain } = useSwitchChain();
  const {
    signMessage: evmSignMessage,
    data: evmSignerData,
    isError,
    error: errorMsg,
  } = useSignMessage();
  const [showWalletsModal, setShowWalletsModal] = useState(true);
  const [isSwitchingChain, setIsSwitchingChain] = useState<boolean>(false);
  useEffect(() => {
    if (isConnected && address && evmSigner) {
      if (
        chainId &&
        currentChain?.chainId &&
        chainId !== currentChain.chainId &&
        !isSwitchingChain
      ) {
        setIsSwitchingChain(true);
        switchChain(
          {
            chainId: currentChain.chainId,
          },
          // options:
          {
            onSuccess: () => {
              if (address && evmSigner) {
                // dispatch(setTokensListEmpty());
                // dispatch(clearWalletBalances());
                // dispatch(
                //   changeSignState({ isSigned: true, connectedChain: "evm" })
                // );
              }
              setIsSwitchingChain(false);
            },
            onError: (error: any) => {
              // dispatch(setTokensListEmpty())
              console.log("Error", error);
              // dispatch(toast.error(error.message))
              disconnect();
              // dispatch(
              //   changeSignState({ isSigned: false, connectedChain: null })
              // );
              setIsSwitchingChain(false);
            },
          }
        );
      } else {
        // dispatch(changeSignState({ isSigned: true, connectedChain: "evm" }));
      }
    }
    // eslint-disable-next-line
  }, [isConnected, address, evmSignerData, evmSigner, chainId]);

  return (
    <div className="p-6">
      <SelectChain
        setShowWalletsModal={setShowWalletsModal}
        showWalletsModal={showWalletsModal}
        connectedAccount={
          currentChain?.name === "Bittensor" && walletConnected
            ? accounts[0]?.address
            : address
        }
        disconnect={() => {
          disconnect();
          setWalletConnected(false);
        }}
      />

      {walletConnected || isConnected ? (
        <div>
          <form
            className="form-fields flex  flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="ParticipantId">
                Participant Id
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Enter ParticipantId"
                value={participantId}
                onChange={(e: any) => {
                  setParticipantId(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="FirstName">
                First Name
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e: any) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="LastName">
                Last Name
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e: any) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="EmailAddress">
                Email Address
              </label>
              <input
                type="email"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e: any) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="MobilePhone">
                Mobile Phone
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Mobile Phone"
                value={mobilePhone}
                onChange={(e: any) => {
                  setMobilePhone(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="Language">
                Language
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Language"
                value={language}
                onChange={(e: any) => {
                  setLanguage(e.target.value);
                }}
                disabled={true}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="City">
                City
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="City"
                value={city}
                onChange={(e: any) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="State">
                State
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="State"
                value={state}
                onChange={(e: any) => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="postal Code">
                Postal Code
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e: any) => {
                  setPostalCode(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="Country Code">
                Country Code
              </label>
              <select
                className=""
                required
                value={countryCode}
                onChange={(e: any) => {
                  setCountryCode(e.target.value);
                }}
              >
                {allCountriesWithCode.map((item, idx) => {
                  return (
                    <option key={idx} value={item.code}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="Address">
                Address
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Address"
                value={address1}
                onChange={(e: any) => {
                  setAddress1(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="Amount">
                Amount
              </label>
              <input
                type="number"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 w-[280px]"
                required
                placeholder="Enter Amount"
                value={amount}
                onChange={(e: any) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-[200px] disabled:bg-gray-300 disabled:cursor-not-allowed bg-zebec-card-background-tertiary px-4  py-1 text-lg rounded-lg transition-all"
              disabled={loading}
            >
              Purchase Card
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {currentChain?.name === "Bittensor" ? (
            <Modal
              show={showWalletsModal}
              toggleModal={() => {
                setShowWalletsModal(false);
              }}
              hasCloseIcon={true}
              closeOnOutsideClick={true}
              size="small"
            >
              <p className="w-full px-4 py-2.5 text-lg ">Connect Wallet</p>

              <button
                onClick={() => {
                  if (currentChain?.name === "Bittensor") {
                    connectWallet();
                    setShowWalletsModal(false);
                  }
                }}
                className="w-full px-4 py-2.5 flex justify-between items-center"
              >
                <span className="font-semibold text-content-primary">
                  Bittensor Wallet
                </span>
              </button>
            </Modal>
          ) : (
            <Modal
              show={showWalletsModal}
              toggleModal={() => {
                setShowWalletsModal(false);
              }}
              hasCloseIcon={true}
              closeOnOutsideClick={true}
              size="small"
            >
              <div className="flex flex-col items-center justify-center   gap-y-3">
                <p className="w-full px-4 py-2.5 text-lg  ">Connect Wallet</p>
                {wallets.map((con) => {
                  const provider = con.getProvider();
                  return (
                    <button
                      key={`${con.id}-${con.name}`}
                      disabled={
                        isReconnecting || !provider || connector?.id === con.id
                      }
                      onClick={() => {
                        handleConnect(con);
                        setShowWalletsModal(false);
                      }}
                      className="w-full px-4 py-2.5 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="font-semibold text-content-primary">
                          {con.id === "injected" && con.name === "Bitget"
                            ? "Bitget Wallet"
                            : con.id === "injected" && con.name === "Binance"
                              ? "Binance Wallet"
                              : con.name}
                        </span>
                      </div>
                      {!provider && (
                        <span className="text-xs font-medium text-content-tertiary">
                          (unsupported)
                        </span>
                      )}
                      {/* {con.name === pendingConnector?.name && "..."} */}
                    </button>
                  );
                })}
              </div>
            </Modal>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
