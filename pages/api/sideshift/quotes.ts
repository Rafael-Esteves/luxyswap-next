// pages/api/sideshift/quotes.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fromCoin, toCoin, amount } = req.body;

  try {
    const response = await fetch(
      `https://api.sideshift.ai/v2/quotes?fromCoin=${fromCoin}&toCoin=${toCoin}&amount=${amount}`,
      {
        headers: {
          "x-sideshift-secret": process.env.SIDESHIFT_SECRET!,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get quote" });
  }
}
