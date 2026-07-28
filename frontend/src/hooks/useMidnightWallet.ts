import { useState, useCallback } from 'react';
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

  const getProvider = useCallback(() => {
    const win = window as any;
    if (!win.midnight) return null;
    const firstProvider = Object.values(win.midnight ?? {})[0] as any;
    return firstProvider || win.midnight?.lace || win.midnight?.mnLace || null;
  }, []);

  const connect = useCallback(async () => {
    setWalletState((prev) => ({
      ...prev,
      connecting: true,
      error: null,
    }));

    const provider = getProvider();

    // Provider missing check
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

    console.log('[Wallet] Provider found');

    let api: any = null;

    // Connect to provider
    try {
      if (typeof provider.connect === 'function') {
        api = await provider.connect('preprod');
      } else if (typeof provider.enable === 'function') {
        api = await provider.enable();
      } else {
        api = provider;
      }
      console.log('[Wallet] Connection successful');
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const errName = err?.name || '';

      // RemoteApiShutdownError / Session Expired
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

      // Connection Rejected
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

    // Address Retrieval
    let address: string | null = null;

    try {
      if (api && typeof api.getUnshieldedAddress === 'function') {
        const result = await api.getUnshieldedAddress();
        // Handle string vs object return types ({ unshieldedAddress: 'mn_addr_...' } vs 'mn_addr_...')
        address =
          typeof result === 'string'
            ? result
            : result?.unshieldedAddress ?? (typeof result?.address === 'string' ? result.address : null);
      } else if (api && typeof api.state === 'function') {
        const state = await api.state();
        address = state?.unshieldedAddress ?? state?.address ?? null;
      } else if (api?.unshieldedAddress || api?.address) {
        address = api.unshieldedAddress ?? api.address ?? null;
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);

      // Wallet Locked
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
        setWalletState({
          connected: false,
          connecting: false,
          address: null,
          network: null,
          error,
        });
        return;
      }

      // Address Unavailable
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

    // Validation Rule Check
    if (isValidMidnightAddress(address)) {
      console.log('[Wallet] Address stored in state');
      setWalletState({
        connected: true,
        connecting: false,
        address: address,
        network: 'preprod',
        error: null,
      });
    } else {
      // Address Missing / Invalid
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
