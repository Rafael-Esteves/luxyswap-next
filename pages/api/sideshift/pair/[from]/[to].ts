import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { from, to } = req.query;

  try {
    // Get the network information from the coin data
    const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");

    if (!coinsResponse.ok) {
      return res.status(coinsResponse.status).json({
        error: `Error from SideShift Coins API: ${coinsResponse.statusText}`,
      });
    }

    const coins = await coinsResponse.json();

    // Find the network for each coin
    const fromCoin = coins.find(
      (c: any) => c.coin.toLowerCase() === String(from).toLowerCase()
    );
    const toCoin = coins.find(
      (c: any) => c.coin.toLowerCase() === String(to).toLowerCase()
    );

    if (!fromCoin || !toCoin) {
      return res.status(400).json({
        error: `Invalid coin: ${!fromCoin ? from : to} not found`,
      });
    }

    // Ensure the coin has networks available
    if (!fromCoin.networks?.length || !toCoin.networks?.length) {
      return res.status(400).json({
        error: `No networks available for ${
          !fromCoin.networks?.length ? from : to
        }`,
      });
    }

    // Use the first network for each coin (usually the main one)
    const fromNetwork = fromCoin.networks[0];
    const toNetwork = toCoin.networks[0];

    const pairUrl = `https://sideshift.ai/api/v2/pair/${from}-${fromNetwork}/${to}-${toNetwork}`;

    const response = await fetch(pairUrl);

    // Handle different types of errors with more detail
    if (!response.ok) {
      // For 404, it likely means the pair is not supported
      if (response.status === 404) {
        return res.status(404).json({
          error: `This trading pair (${from}-${to}) is not supported by SideShift`,
          unsupportedPair: true,
        });
      }

      return res.status(response.status).json({
        error: `Error from SideShift API: ${response.statusText}`,
        statusCode: response.status,
      });
    }

    const data = await response.json();
    res.status(200).json({
      ...data,
      depositNetwork: fromNetwork,
      settleNetwork: toNetwork,
    });
  } catch (error) {
    console.error("Failed to fetch pair data:", error);
    res.status(500).json({
      error: "Failed to fetch pair data",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
