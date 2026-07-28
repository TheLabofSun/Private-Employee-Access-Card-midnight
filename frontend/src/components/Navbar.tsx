import React from 'react';
import { ShieldCheck, Wallet, Globe, CheckCircle2 } from 'lucide-react';
import { WalletState } from '../types/wallet';

interface NavbarProps {
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletState,
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
          <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{walletState.network || 'MIDNIGHT PREPROD'}</span>
        </div>

        {walletState.connected && walletState.address ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={14} /> 🟢 Connected
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                {walletState.address.slice(0, 10)}...{walletState.address.slice(-6)}
              </div>
            </div>
            <button className="btn-secondary" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={onConnect} disabled={walletState.connecting}>
            <Wallet size={18} /> {walletState.connecting ? 'Connecting...' : 'Connect Lace Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};
