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
  const [unsupportedPair, setUnsupportedPair] = useState(false);

  useEffect(() => {
    // Reset states when coins change
    setPairData(null);
    setError(null);
    setUnsupportedPair(false);

    const fetchPairData = async () => {
      if (!depositCoin || !settleCoin) return;

      setIsLoading(true);
      setError(null);
      setUnsupportedPair(false);

      try {
        const response = await fetch(
          `/api/sideshift/pair/${depositCoin.toLowerCase()}/${settleCoin.toLowerCase()}`
        );

        const data = await response.json();

        if (!response.ok) {
          // Check if this is due to an unsupported pair
          if (data.unsupportedPair || response.status === 404) {
            console.log(`Pair ${depositCoin}-${settleCoin} is not supported`);
            setUnsupportedPair(true);
            throw new Error(data.error || `This trading pair is not supported`);
          }

          console.error("Failed to fetch pair data:", data);
          throw new Error(
            data.error || `Failed to fetch pair data: ${response.statusText}`
          );
        }

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
    return result.toFixed(8); // Use 8 decimals for crypto amounts
  };

  return {
    pairData,
    isLoading,
    error,
    unsupportedPair,
    calculateSettleAmount,
    calculateDepositAmount,
  };
}
