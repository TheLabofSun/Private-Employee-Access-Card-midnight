export type WalletErrorState =
  | 'NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'REJECTED'
  | 'LOCKED'
  | 'ADDRESS_UNAVAILABLE'
  | 'UNKNOWN';

export interface WalletErrorInfo {
  code: WalletErrorState;
  title: string;
  message: string;
}

export interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  network: string | null;
  error: WalletErrorInfo | null;
}

/**
 * Validation Rule:
 * Address must satisfy:
 * - typeof address === "string"
 * - address.startsWith("mn_addr_")
 * - address.length > 20
 */
export const isValidMidnightAddress = (address: unknown): address is string => {
  return (
    typeof address === 'string' &&
    address.startsWith('mn_addr_') &&
    address.length > 20
  );
};
