import { useState } from "react";

interface ShiftQuote {
  id: string;
  depositCoin: string;
  settleCoin: string;
  depositNetwork: string;
  settleNetwork: string;
  rate: string;
  depositAmount: string;
  settleAmount: string;
  expiresAt: string;
  createdAt: string;
}

interface CreateShiftParams {
  depositCoin: string;
  settleCoin: string;
  depositNetwork: string;
  settleNetwork: string;
  depositAmount: string;
  settleAddress: string;
}

/* 
depositAmount
string
nullable
required
if null, settleAmount is required

settleAmount
string
nullable
required
if null, depositAmount is required
*/

interface GetQuoteParams {
  depositCoin: string;
  settleCoin: string;
  depositAmount: string;
  settleAmount: string;
  depositNetwork: string;
  settleNetwork: string;
}

export function useShift() {
  const [quote, setQuote] = useState<ShiftQuote | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const [shift, setShift] = useState<any | null>(null);
  const [isShiftLoading, setIsShiftLoading] = useState(false);
  const [shiftError, setShiftError] = useState<string | null>(null);

  // Fetch a quote for the shift
  const getQuote = async ({
    depositCoin,
    settleCoin,
    depositAmount,
    settleAmount,
    depositNetwork,
    settleNetwork,
  }: GetQuoteParams) => {
    if (
      !depositCoin ||
      !settleCoin ||
      !(depositAmount || settleAmount) ||
      !depositNetwork ||
      !settleNetwork
    ) {
      return;
    }

    setIsQuoteLoading(true);
    setQuoteError(null);

    try {
      const response = await fetch("/api/sideshift/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          depositCoin,
          settleCoin,
          depositAmount,
          settleAmount,
          depositNetwork,
          settleNetwork,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get quote: ${response.statusText}`);
      }

      const data = await response.json();
      setQuote(data);
      return data;
    } catch (error) {
      console.error("Error getting quote:", error);
      setQuoteError((error as Error).message);
      return null;
    } finally {
      setIsQuoteLoading(false);
    }
  };

  // Create a shift
  const createShift = async ({
    depositCoin,
    settleCoin,
    depositNetwork,
    settleNetwork,
    depositAmount,
    settleAddress,
  }: CreateShiftParams) => {
    if (
      !depositCoin ||
      !settleCoin ||
      !depositAmount ||
      !settleAddress ||
      !depositNetwork ||
      !settleNetwork
    ) {
      setShiftError("Missing required parameters");
      return null;
    }

    setIsShiftLoading(true);
    setShiftError(null);

    try {
      const response = await fetch("/api/sideshift/createShift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          depositCoin,
          settleCoin,
          depositNetwork,
          settleNetwork,
          amount: depositAmount,
          settleAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create shift: ${response.statusText}`);
      }

      const data = await response.json();
      setShift(data);

      // Store transaction in local storage
      const transaction = {
        depositCoin,
        settleCoin,
        depositNetwork: quote?.depositNetwork || "",
        settleNetwork: quote?.settleNetwork || "",
        depositAmount,
        settleAmount: quote?.settleAmount || "0.00",
        date: new Date().toISOString(),
        id: data.id,
        status: data.status,
      };

      // Import from utils
      const { storeTransaction } = await import("@/lib/utils");
      storeTransaction(transaction);

      return data;
    } catch (error) {
      console.error("Error creating shift:", error);
      setShiftError((error as Error).message);
      return null;
    } finally {
      setIsShiftLoading(false);
    }
  };

  return {
    quote,
    isQuoteLoading,
    quoteError,
    shift,
    isShiftLoading,
    shiftError,
    getQuote,
    createShift,
  };
}
