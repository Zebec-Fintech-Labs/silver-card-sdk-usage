import {
  Recipient,
  CountryCode,
  ZebecCardTAOService,
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
}
export const purchaseCard = async ({
  signer,
  address,
  amount,
  formFields,
}: PurchaseCardProps) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
  const service = new ZebecCardTAOService(
    signer.signer,
    {
      apiKey: apiKey,
      encryptionKey: encryptionKey,
    },
    {
      sandbox: true, // set true for testing and dev environment
    }
  );

  const participantId = "JohnChamling";
  const firstName = "John";
  const lastName = "Chamling";
  const emailAddress = "ashishspkt6566@gmail.com";
  const mobilePhone = "+9779876543210";
  const language = "en-US";
  const city = "Bharatpur";
  const state = "Bagmati";
  const postalCode = "44200";
  const countryCode: CountryCode = "NPL";
  const address1 = "Shittal street, Bharatpur - 10, Chitwan";
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
  try {
    const quote = await service.fetchQuote(amount);

    const [depositResponse, apiResponse] = await service.purchaseCard({
      walletAddress: address,
      amount: amount.toString(),
      recipient,
      quote: quote,
    });
    console.log("deposit res", depositResponse);
    console.log("api res", apiResponse);
    if (apiResponse && depositResponse) {
      toast.success("Purchase Successful");
    }
  } catch (error) {
    console.log("error", error);
    // toast.error("Purchase Failed");
  }
};
