import React from 'react';
import { ShieldCheck, Wallet, Globe, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  walletAddress: string;
  balance: string;
  network: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  walletAddress,
  balance,
  network,
  onConnect,
  onDisconnect,
}) => {
  return (
    <nav className="glass-panel navbar">
      <div className="brand">
        <ShieldCheck className="brand-icon" size={36} />
        <div>
          <h1 className="brand-title">CYBERACCESS ZK</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Private Employee Access Card • Midnight Network
          </p>
        </div>
      </div>

      <div className="wallet-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem' }}>
          <Globe size={16} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{network.toUpperCase()}</span>
        </div>

        {isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> Connected
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {walletAddress.slice(0, 10)}...{walletAddress.slice(-6)} | {balance} tNIGHT
              </div>
            </div>
            <button className="btn-secondary" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={onConnect}>
            <Wallet size={18} /> Connect Lace Wallet
          </button>
        )}
      </div>
    </nav>
  );
};
