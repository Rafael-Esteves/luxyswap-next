import { useState, useEffect } from "react";

interface PairData {
  min: string;
  max: string;
  rate: string;
  depositNetworkFee?: string;
  settleNetworkFee?: string;
  depositNetwork: string;
  settleNetwork: string;
}

export function usePairData(depositCoin: string, settleCoin: string) {
  const [pairData, setPairData] = useState<PairData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPairData = async () => {
      if (!depositCoin || !settleCoin) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/sideshift/pair/${depositCoin.toLowerCase()}/${settleCoin.toLowerCase()}`
        );

        if (!response.ok) {
          console.log("Failed to fetch pair data:", response);
          throw new Error(`Failed to fetch pair data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Pair data:", data);
        setPairData({
          ...data,
          depositNetwork: data.depositNetwork || depositCoin,
          settleNetwork: data.settleNetwork || settleCoin,
        });
      } catch (error) {
        console.error("Error fetching pair data:", error);
        setError((error as Error).message);
        setPairData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPairData();
  }, [depositCoin, settleCoin]);

  // Calculate the settle amount based on the rate
  const calculateSettleAmount = (depositAmount: string): string => {
    if (!pairData?.rate || !depositAmount || isNaN(Number(depositAmount))) {
      return "0.00";
    }

    const result = Number(depositAmount) * Number(pairData.rate);
    return result.toFixed(2);
  };

  // Calculate the deposit amount based on the settle amount and rate
  const calculateDepositAmount = (settleAmount: string): string => {
    if (!pairData?.rate || !settleAmount || isNaN(Number(settleAmount))) {
      return "0.00";
    }

    const result = Number(settleAmount) / Number(pairData.rate);
    return result.toFixed(2);
  };

  return {
    pairData,
    isLoading,
    error,
    calculateSettleAmount,
    calculateDepositAmount,
  };
}
