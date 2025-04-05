import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { shiftId } = req.query;
  const { refundAddress, refundMemo } = req.body;

  if (!shiftId || typeof shiftId !== "string") {
    return res.status(400).json({ error: "Missing shift ID" });
  }

  if (!refundAddress) {
    return res.status(400).json({ error: "Missing refund address" });
  }

  try {
    const response = await fetch(
      `https://sideshift.ai/api/v2/shifts/${shiftId}/set-refund-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.SIDESHIFT_SECRET
            ? {
                "x-sideshift-secret": process.env.SIDESHIFT_SECRET,
              }
            : {}),
        },
        body: JSON.stringify({
          address: refundAddress,
          ...(refundMemo ? { memo: refundMemo } : {}),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error setting refund address:", errorData);
      return res.status(response.status).json({
        error:
          errorData.error ||
          `Failed to set refund address: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to set refund address:", error);
    return res.status(500).json({
      error: "Failed to set refund address",
      details: error instanceof Error ? error.message : String(error),
    });
  }
} 