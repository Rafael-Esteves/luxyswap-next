import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fromCoin, toCoin, amount, refundAddress } = req.body;
  try {
    const response = await fetch("https://api.sideshift.ai/v2/shifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sideshift-secret": process.env.SIDESHIFT_SECRET!,
      },
      body: JSON.stringify({ fromCoin, toCoin, amount, refundAddress }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create shift" });
  }
}
