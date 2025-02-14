import fs from "fs/promises";
import path from "path";
import { Coin } from "@/types/Coin";

const ICONS_DIR = path.join(process.cwd(), "public", "coin-icons");
const METADATA_PATH = path.join(ICONS_DIR, "metadata.json");
const DELAY_BETWEEN_REQUESTS = 100;

async function fetchIcon(coin: string) {
  try {
    const response = await fetch(
      `https://sideshift.ai/api/v2/coins/icon/${coin.toLowerCase()}`
    );

    if (response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return fetchIcon(coin);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch icon for ${coin}`);
    }

    const contentType = response.headers.get("content-type");
    const isSvg = contentType?.includes("svg");
    const fileName = `${coin.toLowerCase()}.${isSvg ? "svg" : "png"}`;

    if (isSvg) {
      const content = await response.text();
      return { fileName, content, isSvg };
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      return { fileName, content: buffer, isSvg };
    }
  } catch (error) {
    console.error(`Error fetching icon for ${coin}:`, error);
    return null;
  }
}

async function main() {
  // Ensure directory exists
  await fs.mkdir(ICONS_DIR, { recursive: true });

  // Fetch list of coins
  const coinsResponse = await fetch("https://sideshift.ai/api/v2/coins");
  const coins: Coin[] = await coinsResponse.json();

  const metadata: Record<string, { fileName: string; isSvg: boolean }> = {};

  for (const coin of coins) {
    const coinKey = coin.coin;
    console.log(`Fetching icon for ${coinKey}...`);

    const result = await fetchIcon(coinKey);
    if (result) {
      const { fileName, content, isSvg } = result;
      const filePath = path.join(ICONS_DIR, fileName);

      if (isSvg) {
        await fs.writeFile(filePath, content, "utf-8");
      } else {
        await fs.writeFile(filePath, content);
      }

      metadata[coinKey] = {
        fileName,
        isSvg: isSvg ?? false,
      };

      await new Promise((resolve) =>
        setTimeout(resolve, DELAY_BETWEEN_REQUESTS)
      );
    }
  }

  // Save metadata
  await fs.writeFile(METADATA_PATH, JSON.stringify(metadata, null, 2));
  console.log("Icon fetch completed successfully!");
}

main().catch(console.error);
