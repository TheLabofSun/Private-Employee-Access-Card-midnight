import React from 'react';
import { Database, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export interface PublicLedgerState {
  companyId: string;
  issuedCardsCount: number;
  accessGrantsCount: number;
  minClearancePolicy: number;
  latestAccessResult: boolean;
  latestAccessZone: number;
  contractAddress: string;
}

interface LedgerViewerProps {
  ledgerState: PublicLedgerState;
  onRefresh: () => void;
  isLoading: boolean;
}

export const LedgerViewer: React.FC<LedgerViewerProps> = ({ ledgerState, onRefresh, isLoading }) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database color="var(--accent-emerald)" size={24} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>4. Public Ledger State (Midnight Network)</h2>
        </div>
        <button className="btn-secondary" onClick={onRefresh} disabled={isLoading} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
          <RefreshCw className={isLoading ? 'spin' : ''} size={14} /> Refresh State
        </button>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontFamily: 'monospace' }}>
        Contract: {ledgerState.contractAddress || '0x0000000000000000000000000000000000000000'}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Organization</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
            {ledgerState.companyId || 'CyberAccess Corp'}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Cards Registered</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginTop: '0.2rem' }}>
            {ledgerState.issuedCardsCount}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Access Grants</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
            {ledgerState.accessGrantsCount}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Global Policy</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '0.2rem' }}>
            Min Level {ledgerState.minClearancePolicy}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Latest Check Zone</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginTop: '0.2rem' }}>
            Zone #{ledgerState.latestAccessZone || 0}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Latest Ledger Result</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: ledgerState.latestAccessResult ? 'var(--accent-emerald)' : 'var(--accent-rose)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {ledgerState.latestAccessResult ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {ledgerState.latestAccessResult ? 'APPROVED' : 'DENIED'}
          </div>
        </div>
      </div>
    </div>
  );
};
