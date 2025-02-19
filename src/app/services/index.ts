import {
  Recipient,
  ZebecCardTAOService,
  ZebecCardService,
} from "@zebec-fintech/silver-card-sdk";
import { toast } from "react-toastify";
interface PurchaseCardProps {
  signer: any;
  address: string;
  amount: number;
  formFields: {
    participantId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobilePhone: string;
    language: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: any;
    address1: string;
  };
  type: "evm" | "bittensor";
  chainId: number;
}
export const purchaseCard = async ({
  signer,
  address,
  amount,
  formFields,
  type,
  chainId,
}: PurchaseCardProps) => {
  const apiKey = process.env.API_KEY!;
  const encryptionKey = process.env.ENCRYPTION_KEY!;
  let modifiedSigner = type === "evm" ? signer : signer?.signer;
  let service;
  if (type === "bittensor") {
    service = new ZebecCardTAOService(
      modifiedSigner,
      {
        apiKey: apiKey,
        encryptionKey: encryptionKey,
      },
      {
        sandbox: true, // set true for testing and dev environment
      }
    );
  } else {
    service = new ZebecCardService(
      modifiedSigner,
      chainId,

      {
        apiKey: apiKey,
        encryptionKey: encryptionKey,
      },
      {
        sandbox: true, // set true for testing and dev environment
      }
    );
  }

  const recipient = Recipient.create(
    formFields?.participantId,
    formFields?.firstName,
    formFields?.lastName,
    formFields?.emailAddress,
    formFields?.mobilePhone,
    formFields?.language,
    formFields?.city,
    formFields?.state,
    formFields?.postalCode,
    formFields?.countryCode,
    formFields?.address1
  );
  console.log("recipient", recipient);

  try {
    const quote = await service.fetchQuote(amount);
    console.log("here are the values", amount, quote);

    if (type === "bittensor") {
      const [depositResponse, apiResponse] = await service.purchaseCard({
        walletAddress: address,
        amount: amount.toString(),
        recipient,
        quote: quote,
      });

      if (apiResponse && depositResponse) {
        toast.success("Purchase Successful");
        return apiResponse;
      }
    } else {
      const [depositResponse, buyCardResponse, apiResponse] =
        await service.purchaseCard({
          walletAddress: address,
          amount: amount.toString(),
          recipient,
          quote,
        });
      console.log(
        "this is the data",
        depositResponse,
        buyCardResponse,
        apiResponse
      );
      if (apiResponse && depositResponse && buyCardResponse) {
        toast.success("Purchase Successful");
        return apiResponse;
      }
    }
  } catch (error: any) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message || JSON.stringify(error);

    toast.error(JSON.stringify(errorMessage));
    console.log("error here", errorMessage);
    throw error;
  }
};
