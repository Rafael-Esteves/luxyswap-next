import { useState, useEffect } from "react";

interface PairData {
  min: string;
  max: string;
  rate: string;
}

export function usePairData(fromCoin: string, toCoin: string) {
  const [pairData, setPairData] = useState<PairData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPairData = async () => {
      if (!fromCoin || !toCoin) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/sideshift/pair/${fromCoin.toLowerCase()}/${toCoin.toLowerCase()}`
        );
        const data = await response.json();
        setPairData(data);
      } catch (error) {
        console.error("Error fetching pair data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPairData();
  }, [fromCoin, toCoin]);

  return { pairData, isLoading };
}
