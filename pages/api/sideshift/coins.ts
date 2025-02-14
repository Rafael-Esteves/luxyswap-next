// pages/api/sideshift/coins.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const axios = require("axios");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.SIDESHIFT_API_URL + "/coins",
    headers: {},
  };

  axios
    .request(config)
    .then((response: { data: any }) => {
      console.log(response.data[0]);
      res.status(200).json(response.data);
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch coins" });
    });
}
