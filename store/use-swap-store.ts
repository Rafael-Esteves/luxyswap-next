"use client";

import { create } from 'zustand';

interface SwapState {
  fromCoin: {
    coin: string;
    value: string;
  };
  toCoin: {
    coin: string;
    value: string;
  };
  ethAddress: string;
  setFromCoin: (coin: string, value: string) => void;
  setToCoin: (coin: string, value: string) => void;
  setEthAddress: (address: string) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  fromCoin: {
    coin: "BTC",
    value: "0.00",
  },
  toCoin: {
    coin: "ETH",
    value: "0.00",
  },
  ethAddress: "",
  setFromCoin: (coin, value) =>
    set((state) => ({
      fromCoin: {
        ...state.fromCoin,
        coin,
        value,
      },
    })),
  setToCoin: (coin, value) =>
    set((state) => ({
      toCoin: {
        ...state.toCoin,
        coin,
        value,
      },
    })),
  setEthAddress: (address) =>
    set(() => ({
      ethAddress: address,
    })),
}));