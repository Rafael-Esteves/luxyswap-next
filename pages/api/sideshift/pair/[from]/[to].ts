import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { from, to } = req.query;

  try {
    // Get the network information from the coin data
    const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");
    const coins = await coinsResponse.json();

    // Find the network for each coin
    const fromCoin = coins.find(
      (c: any) => c.coin.toLowerCase() === String(from).toLowerCase()
    );
    const toCoin = coins.find(
      (c: any) => c.coin.toLowerCase() === String(to).toLowerCase()
    );

    if (!fromCoin || !toCoin) {
      return res.status(400).json({ error: "Invalid coin" });
    }

    // Use the first network for each coin (usually the main one)
    const fromNetwork = fromCoin.networks[0];
    const toNetwork = toCoin.networks[0];

    const response = await fetch(
      `https://sideshift.ai/api/v2/pair/${from}/${to}?depositNetwork=${fromNetwork}&settleNetwork=${toNetwork}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Error from SideShift API: ${response.statusText}`,
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch pair data:", error);
    res.status(500).json({ error: "Failed to fetch pair data" });
  }
}
