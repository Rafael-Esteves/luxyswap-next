"use client";

import { create } from "zustand";

interface SwapState {
  fromCoin: {
    coin: string;
    value: string;
    network: string;
  };
  toCoin: {
    coin: string;
    value: string;
    network: string;
  };
  ethAddress: string;
  setFromCoin: (coin: string, value: string, network?: string) => void;
  setToCoin: (coin: string, value: string, network?: string) => void;
  setFromNetwork: (network: string) => void;
  setToNetwork: (network: string) => void;
  setEthAddress: (address: string) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  fromCoin: {
    coin: "BTC",
    value: "0.00",
    network: "",
  },
  toCoin: {
    coin: "ETH",
    value: "0.00",
    network: "",
  },
  ethAddress: "",
  setFromCoin: (coin, value, network) =>
    set((state) => ({
      fromCoin: {
        ...state.fromCoin,
        coin,
        value,
        network: network || state.fromCoin.network,
      },
    })),
  setToCoin: (coin, value, network) =>
    set((state) => ({
      toCoin: {
        ...state.toCoin,
        coin,
        value,
        network: network || state.toCoin.network,
      },
    })),
  setFromNetwork: (network) =>
    set((state) => ({
      fromCoin: {
        ...state.fromCoin,
        network,
      },
    })),
  setToNetwork: (network) =>
    set((state) => ({
      toCoin: {
        ...state.toCoin,
        network,
      },
    })),
  setEthAddress: (address) =>
    set(() => ({
      ethAddress: address,
    })),
}));
