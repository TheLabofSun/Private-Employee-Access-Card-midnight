import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ShieldCheck, Wallet, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { WalletState } from '../../types/wallet';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; path: string }>;
  walletState: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navItems,
  walletState,
  onConnect,
  onDisconnect,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-drawer-overlay" onClick={onClose} />
      <div className="mobile-drawer-panel">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <ShieldCheck size={20} color="var(--primary)" />
              <span>CyberAccess ZK</span>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} color="var(--text-muted)" />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
                style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          {walletState.error && !walletState.connected && (
            <div
              style={{
                background: walletState.error.code === 'LOCKED' ? '#fffbe6' : '#fff1f0',
                border: `1px solid ${walletState.error.code === 'LOCKED' ? '#ffe58f' : '#ffa39e'}`,
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                color: walletState.error.code === 'LOCKED' ? '#d48806' : '#cf1322',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {walletState.error.code === 'LOCKED' ? (
                <AlertTriangle size={16} color="#d48806" />
              ) : (
                <AlertCircle size={16} color="#cf1322" />
              )}
              <div>
                <div>{walletState.error.title}</div>
                <div style={{ fontWeight: 400, fontSize: '0.75rem', marginTop: 2 }}>
                  {walletState.error.message}
                </div>
              </div>
            </div>
          )}

          {walletState.connected && walletState.address ? (
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--emerald)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={14} color="var(--emerald)" /> 🟢 Connected
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '1rem', wordBreak: 'break-all' }}>
                {walletState.address}
              </div>
              <button
                className="btn-secondary"
                onClick={() => {
                  onDisconnect();
                  onClose();
                }}
                style={{ width: '100%' }}
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={() => {
                onConnect();
                onClose();
              }}
              style={{ width: '100%' }}
              disabled={walletState.connecting}
            >
              <Wallet size={16} /> {walletState.connecting ? 'Connecting...' : 'Connect Lace Wallet'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
