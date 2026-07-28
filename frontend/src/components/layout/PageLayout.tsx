import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WalletState } from '../../types/wallet';

interface PageLayoutProps {
  children: React.ReactNode;
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  walletState,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="app-wrapper">
      <Navbar
        walletState={walletState}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};
