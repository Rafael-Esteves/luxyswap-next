import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing shift ID" });
  }

  try {
    const response = await fetch(`https://sideshift.ai/api/v2/shifts/${id}`, {
      headers: {
        ...(process.env.SIDESHIFT_SECRET
          ? {
              "x-sideshift-secret": process.env.SIDESHIFT_SECRET,
            }
          : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching shift data:", errorData);
      return res.status(response.status).json({
        error:
          errorData.error ||
          `Failed to fetch shift data: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch shift data:", error);
    return res.status(500).json({
      error: "Failed to fetch shift data",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
