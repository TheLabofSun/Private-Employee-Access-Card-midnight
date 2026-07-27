import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/layout/PageLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { VerifyPage } from './pages/VerifyPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { ZonesPage } from './pages/ZonesPage';
import { HistoryPage } from './pages/HistoryPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';
import { AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [network] = useState<string>(import.meta.env.VITE_NETWORK || 'undeployed');
  const [hasLaceWallet, setHasLaceWallet] = useState<boolean>(true);
  const [walletError, setWalletError] = useState<string | null>(null);

  const [ledgerState, setLedgerState] = useState({
    companyId: 'CyberAccess Corp',
    issuedCardsCount: 142,
    accessGrantsCount: 389,
    minClearancePolicy: 1,
    latestAccessResult: true,
    latestAccessZone: 202,
    contractAddress:
      import.meta.env.VITE_CONTRACT_ADDRESS ||
      'b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113',
  });

  // Detect real Midnight Lace Wallet extension
  useEffect(() => {
    const detectWallet = () => {
      const windowObj = window as any;
      const laceObj = windowObj.midnight?.lace || windowObj.midnight?.mnLace || windowObj.lace;
      if (laceObj) {
        setHasLaceWallet(true);
        setWalletError(null);
      } else {
        setHasLaceWallet(false);
      }
    };

    detectWallet();
    window.addEventListener('load', detectWallet);
    return () => window.removeEventListener('load', detectWallet);
  }, []);

  const connectWallet = async () => {
    setWalletError(null);
    try {
      const windowObj = window as any;
      const laceObj = windowObj.midnight?.lace || windowObj.midnight?.mnLace || windowObj.lace;

      if (laceObj) {
        const api = await laceObj.enable();
        const state = await api.state();
        setIsConnected(true);
        setWalletAddress(state.address || 'mn_addr_lace1...001');
        setBalance(state.balance ? (state.balance / 1000000n).toString() : '250.0');
      } else {
        setHasLaceWallet(false);
        setWalletError('Midnight Lace Wallet not detected. Please install Lace Wallet to continue.');
      }
    } catch (e: any) {
      console.warn('Lace wallet connection event:', e);
      setWalletError(e?.message || 'Failed to connect to Midnight Lace Wallet.');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0');
    setWalletError(null);
  };

  const handleVerify = async (
    zone: { id: number; requiredClearance: number },
    clearance: number
  ): Promise<{ granted: boolean; commitmentHash: string }> => {
    const isGranted = clearance >= zone.requiredClearance;
    const commitmentHash =
      '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setLedgerState((prev) => ({
      ...prev,
      accessGrantsCount: isGranted ? prev.accessGrantsCount + 1 : prev.accessGrantsCount,
      latestAccessZone: zone.id,
      latestAccessResult: isGranted,
    }));

    return { granted: isGranted, commitmentHash };
  };

  return (
    <PageLayout
      isConnected={isConnected}
      walletAddress={walletAddress}
      balance={balance}
      network={network}
      onConnect={connectWallet}
      onDisconnect={disconnectWallet}
    >
      {/* Wallet Error or Missing Banner */}
      {(!hasLaceWallet || walletError) && (
        <div
          style={{
            background: 'var(--amber-light)',
            borderBottom: '1px solid var(--amber)',
            padding: '0.75rem 1.5rem',
            color: '#92400e',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertTriangle size={16} />
          {walletError || 'Midnight Lace Wallet not detected. Please install Lace Wallet extension to connect.'}
        </div>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage ledgerState={ledgerState} network={network} />} />
        <Route path="/credential" element={<CredentialsPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/verify" element={<VerifyPage onVerify={handleVerify} />} />
        <Route path="/zones" element={<ZonesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </PageLayout>
  );
};

export default App;
