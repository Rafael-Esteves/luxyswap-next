import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fromCoin, toCoin, amount, refundAddress } = req.body;
  const response = await fetch("https://api.sideshift.ai/v2/shifts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromCoin, toCoin, amount, refundAddress }),
  });
  const data = await response.json();
  res.status(200).json(data);
}
