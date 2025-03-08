// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add these new utilities
interface Transaction {
  depositCoin: string;
  settleCoin: string;
  depositAmount: string;
  settleAmount: string;
  depositNetwork: string;
  settleNetwork: string;
  date: string;
  id: string;
  status: string;
}

export const getTransactions = (): Transaction[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("transactions");
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    // Validate each transaction object
    const validTransactions = parsed.filter((tx): tx is Transaction => {
      return (
        typeof tx === "object" &&
        tx !== null &&
        typeof tx.depositCoin === "string" &&
        typeof tx.settleCoin === "string" &&
        typeof tx.depositAmount === "string" &&
        typeof tx.settleAmount === "string" &&
        typeof tx.depositNetwork === "string" &&
        typeof tx.settleNetwork === "string" &&
        typeof tx.date === "string" &&
        typeof tx.id === "string" &&
        typeof tx.status === "string"
      );
    });

    return validTransactions;
  } catch (error) {
    console.error("Error parsing transactions:", error);
    return [];
  }
};

export const storeTransaction = (transaction: Transaction) => {
  if (typeof window === "undefined") return;

  const transactions = getTransactions();
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const updateTransactionStatus = (id: string, status: string) => {
  if (typeof window === "undefined") return;

  const transactions = getTransactions();
  const updatedTransactions = transactions.map((tx) =>
    tx.id === id ? { ...tx, status } : tx
  );

  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
};
