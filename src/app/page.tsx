"use client";
import { useState } from "react";
import { purchaseCard } from "./services";
import { useBittensorWallet } from "./services/useBittensorwallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const {
    accounts,
    connectWallet,
    signer,
    setWalletConnected,
    walletConnected,
  } = useBittensorWallet();
  const [amount, setAmount] = useState<number>(0);
  const [participantId, setParticipantId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [address1, setAddress1] = useState("");
  const handleSubmit = async (e: any) => {
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
      await purchaseCard({
        signer: signer,
        address: accounts[0]?.address,
        amount: amount,
        formFields: formFields,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="p-6">
      {walletConnected ? (
        <div>
          <div className="flex items-center gap-2">
            <p className="mb-2">Connected Account: {accounts[0]?.address}</p>
            <button
              onClick={() => {
                setWalletConnected(false);
              }}
              className="w-[200px] bg-slate-300 px-4 py-1 text-lg hover:bg-slate-300/80 transition-all"
            >
              Disonnect Wallet
            </button>
          </div>
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
                required
                placeholder="Language"
                value={language}
                onChange={(e: any) => {
                  setLanguage(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="City">
                City
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
                required
                placeholder="Country Code"
                value={countryCode}
                onChange={(e: any) => {
                  setCountryCode(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-[100px]" htmlFor="Address">
                Address
              </label>
              <input
                type="text"
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
                className="border border-slate-400 outline-none focus:outline-none px-4 py-1.5 max-w-[280px]"
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
              className="w-[200px] bg-slate-300 px-4  py-1 text-lg hover:bg-slate-300/80 transition-all"
            >
              Purchase Card
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-[200px] bg-slate-300 px-4 py-1 text-lg hover:bg-slate-300/80 transition-all"
        >
          Connect Wallet
        </button>
      )}
      <ToastContainer />
    </div>
  );
}
