// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add these new utilities
export const storeTransaction = (transaction: any) => {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
  localStorage.setItem(
    "transactions",
    JSON.stringify([...existing, transaction])
  );
};

export const getTransactions = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("transactions") || "[]");
};

export const updateTransactionStatus = (id: string, status: string) => {
  if (typeof window === "undefined") return;
  const transactions = getTransactions();
  const updated = transactions.map((t: any) =>
    t.id === id ? { ...t, status } : t
  );
  localStorage.setItem("transactions", JSON.stringify(updated));
};
