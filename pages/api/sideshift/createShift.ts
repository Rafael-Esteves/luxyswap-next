import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fromCoin, toCoin, amount, settleAddress, refundAddress } = req.body;

  if (!fromCoin || !toCoin || !amount || !settleAddress) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Get the network information
    const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");
    const coins = await coinsResponse.json();

    // Find the network for each coin
    const fromCoinData = coins.find(
      (c: any) => c.coin.toLowerCase() === fromCoin.toLowerCase()
    );
    const toCoinData = coins.find(
      (c: any) => c.coin.toLowerCase() === toCoin.toLowerCase()
    );

    if (!fromCoinData || !toCoinData) {
      return res.status(400).json({ error: "Invalid coin" });
    }

    // Use the first network for each coin
    const fromNetwork = fromCoinData.networks[0];
    const toNetwork = toCoinData.networks[0];

    const response = await fetch(
      "https://sideshift.ai/api/v2/shifts/variable",
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
          depositCoin: fromCoin,
          depositNetwork: fromNetwork,
          settleCoin: toCoin,
          settleNetwork: toNetwork,
          amount,
          settleAddress,
          ...(refundAddress ? { refundAddress } : {}),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to create shift:", error);
    res.status(500).json({ error: "Failed to create shift" });
  }
}
