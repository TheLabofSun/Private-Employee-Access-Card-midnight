import React, { useState } from 'react';
import { Search, Filter, Copy, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface HistoryLogItem {
  id: string;
  timestamp: string;
  facility: string;
  zone: string;
  result: 'APPROVED' | 'DENIED';
  commitmentHash: string;
  status: string;
}

export const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'APPROVED' | 'DENIED'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const logs: HistoryLogItem[] = [
    {
      id: '1',
      timestamp: '2026-07-27 03:15:22 UTC',
      facility: 'CyberAccess HQ',
      zone: 'Zone #202 (R&D Lab)',
      result: 'APPROVED',
      commitmentHash: '0xb1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113',
      status: 'On-Chain Verified',
    },
    {
      id: '2',
      timestamp: '2026-07-27 02:40:10 UTC',
      facility: 'Quantum Data Center',
      zone: 'Zone #303 (Server Vault)',
      result: 'APPROVED',
      commitmentHash: '0x7f8a910c23948e12903b47c928a7e5f1029c48e3a7b61d28e40192a837c49e21',
      status: 'On-Chain Verified',
    },
    {
      id: '3',
      timestamp: '2026-07-26 23:10:05 UTC',
      facility: 'Executive Command',
      zone: 'Zone #404 (Boardroom)',
      result: 'DENIED',
      commitmentHash: '0x3c21a49901e8f2307b819a4d0e91f82c7b39a482d9e01f283c47e81a920c471b',
      status: 'On-Chain Verified',
    },
    {
      id: '4',
      timestamp: '2026-07-26 20:05:44 UTC',
      facility: 'Main Reception',
      zone: 'Zone #101 (Lobby)',
      result: 'APPROVED',
      commitmentHash: '0xe49a02b1c8f92e3d4710a9b82c3f4e5d6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
      status: 'On-Chain Verified',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.commitmentHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || log.result === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const copyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container-xl" style={{ paddingTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Access Verification History</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Searchable audit logs of on-chain Zero-Knowledge access decisions
        </p>
      </div>

      {/* Controls: Search & Filter */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by facility, zone, or hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="var(--text-muted)" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                background: 'white',
              }}
            >
              <option value="ALL">All Results</option>
              <option value="APPROVED">Approved Only</option>
              <option value="DENIED">Denied Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Data Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Facility</th>
              <th>Target Zone</th>
              <th>Result</th>
              <th>Commitment Hash</th>
              <th>Ledger Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 600 }}>{log.facility}</td>
                  <td>{log.zone}</td>
                  <td>
                    <span className={`badge-status ${log.result === 'APPROVED' ? 'badge-approved' : 'badge-denied'}`}>
                      {log.result === 'APPROVED' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {log.result}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <code style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                        {log.commitmentHash.slice(0, 14)}...
                      </code>
                      <button
                        className="btn-secondary"
                        onClick={() => copyHash(log.id, log.commitmentHash)}
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                      >
                        <Copy size={10} /> {copiedId === log.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: 600 }}>{log.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No access audit records matched your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div>Showing 1 to {filteredLogs.length} of {logs.length} entries</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" disabled style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Previous
          </button>
          <button className="btn-secondary" disabled style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
