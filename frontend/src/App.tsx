import React, { useState } from 'react';
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
import { useMidnightWallet } from './hooks/useMidnightWallet';

export const App: React.FC = () => {
  const { walletState, connect, disconnect } = useMidnightWallet();

  const contractAddress =
    import.meta.env.VITE_CONTRACT_ADDRESS ||
    'b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113';

  const [ledgerState, setLedgerState] = useState({
    companyId: 'CyberAccess Corp',
    issuedCardsCount: 142,
    accessGrantsCount: 389,
    minClearancePolicy: 1,
    latestAccessResult: true,
    latestAccessZone: 202,
    contractAddress: contractAddress,
    isContractDeployed: Boolean(contractAddress),
  });

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

  const networkDisplay = walletState.network || 'Midnight Preprod';

  return (
    <PageLayout
      walletState={walletState}
      onConnect={connect}
      onDisconnect={disconnect}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage ledgerState={ledgerState} network={networkDisplay} />} />
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
