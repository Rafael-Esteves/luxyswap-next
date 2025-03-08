// pages/api/sideshift/quotes.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { depositCoin, settleCoin, depositAmount, settleAmount } = req.body;

  if (!depositCoin || !settleCoin || !(depositAmount || settleAmount)) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Get the network information
    const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");
    const coins = await coinsResponse.json();

    // Find the network for each coin
    const depositCoinData = coins.find(
      (c: any) => c.coin.toLowerCase() === depositCoin.toLowerCase()
    );
    const settleCoinData = coins.find(
      (c: any) => c.coin.toLowerCase() === settleCoin.toLowerCase()
    );

    if (!depositCoinData || !settleCoinData) {
      return res.status(400).json({ error: "Invalid coin" });
    }

    // Use the first network for each coin
    const depositNetwork = depositCoinData.networks[0];
    const settleNetwork = settleCoinData.networks[0];

    const response = await fetch("https://sideshift.ai/api/v2/quotes", {
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
        depositCoin: depositCoin,
        depositNetwork: depositNetwork,
        settleCoin: settleCoin,
        settleNetwork: settleNetwork,
        depositAmount: depositAmount ? depositAmount : null,
        settleAmount: settleAmount ? settleAmount : null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to get quote:", error);
    res.status(500).json({ error: "Failed to get quote" });
  }
}
