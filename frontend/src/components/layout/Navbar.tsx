import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Wallet, Globe, Menu, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { WalletState } from '../../types/wallet';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (walletState.connected && walletState.address) {
      console.log('[Wallet] Rendering address', walletState.address);
    }
  }, [walletState.connected, walletState.address]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Credential', path: '/credential' },
    { label: 'Verify', path: '/verify' },
    { label: 'Zones', path: '/zones' },
    { label: 'History', path: '/history' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'About', path: '/about' },
  ];

  const networkDisplay =
    walletState.network === 'preprod'
      ? 'Preprod'
      : walletState.network || 'Preprod';

  return (
    <>
      <header className="header-nav">
        <div className="container-xl header-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="brand-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div className="brand-text-container">
              <span className="brand-title">CyberAccess ZK</span>
              <span className="brand-subtitle">
                Midnight Confidential Credentials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? 'nav-link-item active' : 'nav-link-item')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Network & Wallet */}
          <div className="nav-actions">
            <div className="status-live-pill">
              <span className="status-dot"></span>
              Website Live
            </div>

            <div className="network-pill">
              <Globe size={13} />
              <span>Network: {networkDisplay}</span>
            </div>

            {walletState.connected && walletState.address ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={13} color="var(--emerald)" /> 🟢 Connected
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }} title={walletState.address}>
                    Wallet Address: {walletState.address.slice(0, 14)}...{walletState.address.slice(-6)}
                  </div>
                </div>
                <button className="btn-secondary nav-btn" onClick={onDisconnect}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                className="btn-primary nav-btn"
                onClick={onConnect}
                disabled={walletState.connecting}
              >
                <Wallet size={16} /> {walletState.connecting ? 'Connecting...' : 'Connect Lace Wallet'}
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg-hide menu-toggle-btn"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Failure State Notification Banners */}
        {walletState.error && !walletState.connected && (
          <div
            style={{
              background: walletState.error.code === 'LOCKED' ? '#fffbe6' : '#fff1f0',
              borderTop: `1px solid ${walletState.error.code === 'LOCKED' ? '#ffe58f' : '#ffa39e'}`,
              padding: '0.5rem 1rem',
              fontSize: '0.825rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: walletState.error.code === 'LOCKED' ? '#d48806' : '#cf1322',
              fontWeight: 600,
            }}
          >
            {walletState.error.code === 'LOCKED' ? (
              <AlertTriangle size={16} color="#d48806" />
            ) : (
              <AlertCircle size={16} color="#cf1322" />
            )}
            <span>
              <strong>{walletState.error.title}:</strong> {walletState.error.message}
            </span>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
        walletState={walletState}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
    </>
  );
};
