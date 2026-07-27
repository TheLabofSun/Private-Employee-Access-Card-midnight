import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon-box" style={{ width: '2rem', height: '2rem' }}>
                <ShieldCheck size={18} />
              </div>
              <span>CyberAccess ZK</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
              Zero-Knowledge private employee credential and gate access authorization platform built on Midnight Network.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/verify">Verify Access</Link>
              <Link to="/credentials">Credential Vault</Link>
              <Link to="/history">Access History</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Link to="/privacy">Privacy Model</Link>
              <Link to="/about">Architecture & About</Link>
              <a href="https://midnight.network" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Midnight Docs <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Submission</h4>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div><strong>Category:</strong> Confidential Credentials</div>
              <div><strong>Level:</strong> Level 3 Full-Stack</div>
              <div><strong>Compiler:</strong> Compact v0.5.1</div>
              <div><strong>License:</strong> MIT Open Source</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} CyberAccess ZK • Private Employee Access Card. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald)', fontWeight: 600 }}>
            <Lock size={14} /> Zero-Knowledge Witness Isolation
          </div>
        </div>
      </div>
    </footer>
  );
};
