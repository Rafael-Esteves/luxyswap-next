import { useState } from "react";

interface SetRefundAddressParams {
  shiftId: string;
  refundAddress: string;
  refundMemo?: string;
}

export function useRefundAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setRefundAddress = async ({
    shiftId,
    refundAddress,
    refundMemo,
  }: SetRefundAddressParams) => {
    if (!shiftId || !refundAddress) {
      setError("Missing required parameters");
      return false;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `/api/sideshift/set-refund-address/${shiftId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refundAddress,
            ...(refundMemo ? { refundMemo } : {}),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to set refund address: ${response.statusText}`
        );
      }

      setSuccess(true);
      return true;
    } catch (error) {
      console.error("Error setting refund address:", error);
      console.info(JSON.stringify(error));
      setError((error as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setRefundAddress,
    isLoading,
    error,
    success,
  };
} 