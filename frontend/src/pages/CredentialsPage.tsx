import React, { useState } from 'react';
import { Eye, Download, Trash2, X } from 'lucide-react';

export interface CredentialItem {
  id: string;
  employeeName: string;
  department: string;
  clearanceLevel: number;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

export const CredentialsPage: React.FC = () => {
  const [credentials, setCredentials] = useState<CredentialItem[]>([
    {
      id: 'CRED-0x892a7f01',
      employeeName: 'Dr. Evelyn Vance',
      department: 'Security Operations',
      clearanceLevel: 3,
      issueDate: '2026-01-15',
      expiryDate: '2027-01-15',
      status: 'ACTIVE',
    },
    {
      id: 'CRED-0x3c91b402',
      employeeName: 'Dr. Evelyn Vance',
      department: 'R&D Cybernetics',
      clearanceLevel: 2,
      issueDate: '2025-06-10',
      expiryDate: '2026-06-10',
      status: 'EXPIRED',
    },
  ]);

  const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);

  const handleExport = (cred: CredentialItem) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cred, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${cred.id}_credential.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRevoke = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'REVOKED' } : c))
    );
  };

  return (
    <div className="container-xl" style={{ paddingTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Credential Vault</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Manage your private employee credentials & Zero-Knowledge access keys
        </p>
      </div>

      {/* Credentials Grid */}
      <div className="grid-2">
        {credentials.map((cred) => (
          <div key={cred.id} className="card" style={{ borderLeft: cred.status === 'ACTIVE' ? '4px solid var(--emerald)' : '4px solid var(--rose)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{cred.id}</div>
              <span className={`badge-status ${cred.status === 'ACTIVE' ? 'badge-approved' : 'badge-denied'}`}>
                {cred.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{cred.employeeName}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {cred.department} • Security Clearance Level {cred.clearanceLevel}
            </p>

            <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>Issued: {cred.issueDate}</div>
              <div>Expires: {cred.expiryDate}</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedCred(cred)} style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', flex: 1 }}>
                <Eye size={14} /> View
              </button>
              <button className="btn-secondary" onClick={() => handleExport(cred)} style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', flex: 1 }}>
                <Download size={14} /> Export
              </button>
              {cred.status === 'ACTIVE' && (
                <button className="btn-secondary" onClick={() => handleRevoke(cred.id)} style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: 'var(--rose)', flex: 1 }}>
                  <Trash2 size={14} /> Revoke
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Credential Details Modal */}
      {selectedCred && (
        <div className="mobile-drawer-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: '500px', width: '90%', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Credential Details</h3>
              <button onClick={() => setSelectedCred(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div><strong>ID:</strong> {selectedCred.id}</div>
              <div><strong>Name:</strong> {selectedCred.employeeName}</div>
              <div><strong>Department:</strong> {selectedCred.department}</div>
              <div><strong>Clearance Level:</strong> Level {selectedCred.clearanceLevel}</div>
              <div><strong>Issued:</strong> {selectedCred.issueDate}</div>
              <div><strong>Expires:</strong> {selectedCred.expiryDate}</div>
              <div><strong>Privacy Status:</strong> Secret key remains 100% encrypted in local witness.</div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn-primary" onClick={() => setSelectedCred(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
