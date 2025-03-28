import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Creating shift");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    depositCoin,
    settleCoin,
    depositNetwork,
    settleNetwork,
    amount,
    settleAddress,
    refundAddress,
    quoteId,
  } = req.body;
  console.log(req.body);

  if (!depositCoin || !settleCoin || !amount || !settleAddress) {
    console.log("Missing required parameters");
    return res.status(400).json({ error: "Missing required parameters" });
  }
  console.log("Parameters checked");

  try {
    // If a quoteId is provided, create a fixed shift using the quote
    if (quoteId) {
      console.log("Creating fixed shift with quote ID:", quoteId);

      const response = await fetch("https://sideshift.ai/api/v2/shifts/fixed", {
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
          quoteId,
          settleAddress,
          affiliateId: process.env.SIDESHIFT_AFFILIATE_ID,
          ...(refundAddress ? { refundAddress } : {}),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error creating fixed shift");
        console.log(errorData);
        return res.status(response.status).json(errorData);
      }

      const data = await response.json();
      console.log("Fixed shift created");
      console.log(data);
      return res.status(200).json(data);
    }

    // If no quoteId is provided, fall back to getting network info and creating a variable shift
    console.log("No quote ID provided, getting coins");
    // const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");
    // const coins = await coinsResponse.json();
    // Find the network for each coin
    // const fromCoinData = coins.find(
    //   (c: any) => c.coin.toLowerCase() === depositCoin.toLowerCase()
    // );
    // const toCoinData = coins.find(
    //   (c: any) => c.coin.toLowerCase() === settleCoin.toLowerCase()
    // );

    // if (!fromCoinData || !toCoinData) {
    //   console.log("Invalid coin");
    //   return res.status(400).json({ error: "Invalid coin" });
    // }

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
          depositCoin: depositCoin,
          depositNetwork: depositNetwork,
          settleCoin: settleCoin,
          settleNetwork: settleNetwork,
          // amount,
          affiliateId: process.env.SIDESHIFT_AFFILIATE_ID,
          settleAddress,
          ...(refundAddress ? { refundAddress } : {}),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error creating shift");
      console.log(errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log("Shift created");
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to create shift:", error);
    res.status(500).json({ error: "Failed to create shift" });
  }
}
