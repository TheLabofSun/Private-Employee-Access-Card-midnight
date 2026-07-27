import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ShieldCheck, Wallet } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; path: string }>;
  isConnected: boolean;
  walletAddress: string;
  balance: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navItems,
  isConnected,
  walletAddress,
  balance,
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
          {isConnected ? (
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Wallet: {walletAddress.slice(0, 10)}... ({balance} tNIGHT)
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
            >
              <Wallet size={16} /> Connect Lace Wallet
            </button>
          )}
        </div>
      </div>
    </>
  );
};
