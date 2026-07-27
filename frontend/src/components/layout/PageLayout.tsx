import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  isConnected: boolean;
  walletAddress: string;
  balance: string;
  network: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  isConnected,
  walletAddress,
  balance,
  network,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="app-wrapper">
      <Navbar
        isConnected={isConnected}
        walletAddress={walletAddress}
        balance={balance}
        network={network}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};
