import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowUpRight,
  Activity,
  Server,
  Sparkles,
  KeyRound,
  History,
} from 'lucide-react';

interface DashboardPageProps {
  ledgerState: {
    companyId: string;
    issuedCardsCount: number;
    accessGrantsCount: number;
    minClearancePolicy: number;
    latestAccessResult: boolean;
    latestAccessZone: number;
    contractAddress: string;
  };
  network: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ ledgerState, network }) => {
  return (
    <div className="container-xl" style={{ paddingTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Employee Access Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Real-time Midnight Network contract state & verification statistics
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/verify" className="btn-primary">
            <Sparkles size={16} /> Verify Credential
          </Link>
          <Link to="/credentials" className="btn-secondary">
            <KeyRound size={16} /> Open Vault
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Access Grants</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald)', margin: '0.35rem 0' }}>
            {ledgerState.accessGrantsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle2 size={12} color="var(--emerald)" /> Verifications approved
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Registered Credentials</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '0.35rem 0' }}>
            {ledgerState.issuedCardsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active employee cards</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Authorized Facility Zones</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--violet)', margin: '0.35rem 0' }}>
            4 Zones
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lobby, R&D, Vault, Exec</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Min Clearance Policy</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--amber)', margin: '0.35rem 0' }}>
            Level {ledgerState.minClearancePolicy}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global facility floor</div>
        </div>
      </div>

      {/* Contract & Network Status Grid */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Server size={18} color="var(--primary)" /> Contract & Network Diagnostics
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Network:</span>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{network.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Indexer Status:</span>
              <span style={{ fontWeight: 600, color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={14} /> Healthy (Port 8088)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Proof Server:</span>
              <span style={{ fontWeight: 600, color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={14} /> Healthy (Port 6300)
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Deployed Contract:</span>
              <code style={{ fontSize: '0.75rem', background: 'var(--bg-subtle)', padding: '0.4rem 0.6rem', borderRadius: '0.375rem', display: 'block', wordBreak: 'break-all' }}>
                {ledgerState.contractAddress}
              </code>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Activity size={18} color="var(--violet)" /> Quick Portal Actions
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link to="/verify" className="btn-secondary" style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} color="var(--primary)" /> Execute ZK Gate Verification
              </span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/credentials" className="btn-secondary" style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <KeyRound size={16} color="var(--violet)" /> View Credential Vault
              </span>
              <ArrowUpRight size={16} />
            </Link>

            <Link to="/history" className="btn-secondary" style={{ justifyContent: 'space-between', padding: '0.85rem 1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <History size={16} color="var(--emerald)" /> Inspect Access Audit Logs
              </span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Access Activity</h3>
          <Link to="/history" style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600 }}>
            View All History →
          </Link>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Target Zone</th>
                <th>Verification Result</th>
                <th>Commitment Hash</th>
                <th>Ledger Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Just now</td>
                <td>Zone #202 (R&D Lab)</td>
                <td>
                  <span className="badge-status badge-approved">APPROVED</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>0xb1e156cd7365ed13...</td>
                <td>Disclosed On-Chain</td>
              </tr>
              <tr>
                <td>12 minutes ago</td>
                <td>Zone #303 (Quantum Vault)</td>
                <td>
                  <span className="badge-status badge-approved">APPROVED</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>0x7f8a910c23948e12...</td>
                <td>Disclosed On-Chain</td>
              </tr>
              <tr>
                <td>45 minutes ago</td>
                <td>Zone #404 (Exec Command)</td>
                <td>
                  <span className="badge-status badge-denied">DENIED</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>0x3c21a49901e8f230...</td>
                <td>Disclosed On-Chain</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
