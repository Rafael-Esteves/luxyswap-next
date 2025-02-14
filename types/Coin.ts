// src/types/coin.ts

export interface Coin {
  networks: string[];
  coin: string;
  mainnet: string;
  name: string;
  hasMemo: boolean;
  fixedOnly: boolean;
  variableOnly: boolean;
  depositOffline: boolean;
  settleOffline: boolean;
}
