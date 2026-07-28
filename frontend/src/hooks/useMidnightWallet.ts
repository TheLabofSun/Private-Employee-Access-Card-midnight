import { useState, useCallback, useEffect } from 'react';
import { WalletState, WalletErrorInfo, isValidMidnightAddress } from '../types/wallet';

const INITIAL_WALLET_STATE: WalletState = {
  connected: false,
  connecting: false,
  address: null,
  network: null,
  error: null,
};

export const useMidnightWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(INITIAL_WALLET_STATE);

  // Detect Lace provider from window.midnight
  const getProvider = useCallback(() => {
    const win = window as any;
    if (!win.midnight) return null;

    // Standard primary check: Object.values(window.midnight ?? {})[0]
    const firstProvider = Object.values(win.midnight ?? {})[0] as any;
    if (firstProvider) return firstProvider;

    // Fallback checks
    if (win.midnight.lace) return win.midnight.lace;
    if (win.midnight.mnLace) return win.midnight.mnLace;
    return null;
  }, []);

  const connect = useCallback(async () => {
    setWalletState((prev) => ({
      ...prev,
      connecting: true,
      error: null,
    }));

    const provider = getProvider();

    // STATE 1: window.midnight undefined or provider missing
    if (!provider) {
      const error: WalletErrorInfo = {
        code: 'NOT_FOUND',
        title: '🔴 Wallet Not Found',
        message: 'Install Lace Wallet.',
      };
      setWalletState({
        connected: false,
        connecting: false,
        address: null,
        network: null,
        error,
      });
      return;
    }

    console.log('[Wallet] Provider detected');
    console.log('[Wallet] Connection started');

    let api: any = null;

    // STEP 2: Connection attempt
    try {
      if (typeof provider.connect === 'function') {
        api = await provider.connect('preprod');
      } else if (typeof provider.enable === 'function') {
        api = await provider.enable();
      } else {
        api = provider;
      }
      console.log('[Wallet] Connection approved');
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const errName = err?.name || '';

      // STATE 2: RemoteApiShutdownError
      if (
        errName === 'RemoteApiShutdownError' ||
        errMsg.includes('RemoteApiShutdownError') ||
        errMsg.includes('shutdown') ||
        errMsg.includes('Session expired')
      ) {
        console.log('[Wallet] Session expired');
        const error: WalletErrorInfo = {
          code: 'SESSION_EXPIRED',
          title: '🔴 Connection Failed',
          message: 'Wallet session expired. Please reconnect.',
        };
        setWalletState({
          connected: false,
          connecting: false,
          address: null,
          network: null,
          error,
        });
        return;
      }

      // STATE 3: Access to wallet api denied
      if (
        errMsg.includes('Access to wallet api denied') ||
        errMsg.includes('denied') ||
        errMsg.includes('rejected') ||
        errMsg.includes('User rejected')
      ) {
        console.log('[Wallet] Connection rejected');
        const error: WalletErrorInfo = {
          code: 'REJECTED',
          title: '🔴 Connection Rejected',
          message: 'User rejected connection request.',
        };
        setWalletState({
          connected: false,
          connecting: false,
          address: null,
          network: null,
          error,
        });
        return;
      }

      // Fallback unknown connection error
      const error: WalletErrorInfo = {
        code: 'UNKNOWN',
        title: '🔴 Connection Failed',
        message: errMsg || 'Failed to connect to Midnight Lace Wallet.',
      };
      setWalletState({
        connected: false,
        connecting: false,
        address: null,
        network: null,
        error,
      });
      return;
    }

    // STEP 3: Address retrieval
    console.log('[Wallet] Address retrieval started');
    let addressCandidate: string | null = null;

    try {
      if (api && typeof api.getUnshieldedAddress === 'function') {
        const result = await api.getUnshieldedAddress();
        addressCandidate =
          typeof result === 'string'
            ? result
            : result?.unshieldedAddress || result?.address || null;
      } else if (api && typeof api.state === 'function') {
        const state = await api.state();
        addressCandidate = state?.unshieldedAddress || state?.address || null;
      } else if (api?.unshieldedAddress || api?.address) {
        addressCandidate = api.unshieldedAddress || api.address;
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);

      // STATE 4: Wallet is locked
      if (
        errMsg.includes('Wallet is locked') ||
        errMsg.includes('locked') ||
        err?.name === 'WalletLockedError'
      ) {
        console.log('[Wallet] Wallet locked');
        const error: WalletErrorInfo = {
          code: 'LOCKED',
          title: '🟠 Wallet Locked',
          message: 'Unlock Lace Wallet and reconnect.',
        };
        // Do NOT show Connected. Do NOT show wallet address.
        setWalletState({
          connected: false,
          connecting: false,
          address: null,
          network: null,
          error,
        });
        return;
      }

      // Address retrieval error
      const error: WalletErrorInfo = {
        code: 'ADDRESS_UNAVAILABLE',
        title: '🔴 Address Unavailable',
        message: 'Failed to retrieve valid Midnight address.',
      };
      setWalletState({
        connected: false,
        connecting: false,
        address: null,
        network: null,
        error,
      });
      return;
    }

    console.log('[Wallet] Address retrieved');

    // STEP 4 & VALIDATION RULE CHECK
    // Address must satisfy: typeof address === "string" && address.startsWith("mn_addr_") && address.length > 20
    if (isValidMidnightAddress(addressCandidate)) {
      console.log('[Wallet] Connected successfully');
      setWalletState({
        connected: true,
        connecting: false,
        address: addressCandidate,
        network: 'Midnight Preprod',
        error: null,
      });
    } else {
      // STATE 5: Address missing / invalid
      const error: WalletErrorInfo = {
        code: 'ADDRESS_UNAVAILABLE',
        title: '🔴 Address Unavailable',
        message: 'Failed to retrieve valid Midnight address.',
      };
      setWalletState({
        connected: false,
        connecting: false,
        address: null,
        network: null,
        error,
      });
    }
  }, [getProvider]);

  const disconnect = useCallback(() => {
    setWalletState(INITIAL_WALLET_STATE);
  }, []);

  return {
    walletState,
    connect,
    disconnect,
  };
};
