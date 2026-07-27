import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, Wallet, Globe, Menu, CheckCircle2 } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  return (
    <>
      <header className="header-nav">
        <div className="container-xl header-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="brand-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span>CyberAccess ZK</span>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1 }}>
                Midnight Confidential Credentials
              </div>
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
            <div className="network-pill">
              <Globe size={13} />
              <span>{network.toUpperCase()}</span>
            </div>

            {isConnected ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ textAlign: 'right', display: 'none', minWidth: '100px' }} className="sm-show">
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald)' }}>
                    <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4 }} /> Connected
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {walletAddress.slice(0, 8)}... | {balance} tNIGHT
                  </div>
                </div>
                <button className="btn-secondary" onClick={onDisconnect} style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button className="btn-primary" onClick={onConnect} style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                <Wallet size={16} /> Connect Lace Wallet
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
              }}
              className="lg-hide"

            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
        isConnected={isConnected}
        walletAddress={walletAddress}
        balance={balance}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
    </>
  );
};
