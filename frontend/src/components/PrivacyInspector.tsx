import React from 'react';
import { EyeOff, Eye, Shield } from 'lucide-react';

export const PrivacyInspector: React.FC = () => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield color="var(--accent-purple)" size={24} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>3. Zero-Knowledge Privacy Model Inspector</h2>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Demonstrates Midnight Compact&apos;s strict witness isolation. Observers on the blockchain can only see explicit <code style={{ color: 'var(--accent-emerald)' }}>disclose()</code> values.
      </p>

      <table className="privacy-table">
        <thead>
          <tr>
            <th>Data Field</th>
            <th>Privacy Status</th>
            <th>On-Chain Exposure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employee Name / SSN</td>
            <td className="badge-private"><EyeOff size={14} style={{ display: 'inline', marginRight: 4 }} /> Private Witness</td>
            <td>NEVER sent or stored on blockchain</td>
          </tr>
          <tr>
            <td>Employee Secret Key Hash</td>
            <td className="badge-private"><EyeOff size={14} style={{ display: 'inline', marginRight: 4 }} /> Private Witness</td>
            <td>Stays on-device in ZK prover witness</td>
          </tr>
          <tr>
            <td>Exact Clearance Level (1-4)</td>
            <td className="badge-private"><EyeOff size={14} style={{ display: 'inline', marginRight: 4 }} /> Private Witness</td>
            <td>Proved via ZK constraint (<code style={{ color: 'var(--accent-cyan)' }}>level &gt;= required</code>)</td>
          </tr>
          <tr>
            <td>Badge Expiration Date</td>
            <td className="badge-private"><EyeOff size={14} style={{ display: 'inline', marginRight: 4 }} /> Private Witness</td>
            <td>Proved via ZK constraint (<code style={{ color: 'var(--accent-cyan)' }}>expiration &gt;= now</code>)</td>
          </tr>
          <tr>
            <td>Verification Result (True/False)</td>
            <td className="badge-disclosed"><Eye size={14} style={{ display: 'inline', marginRight: 4 }} /> Disclosed Ledger</td>
            <td>Disclosed via <code style={{ color: 'var(--accent-emerald)' }}>disclose(isGranted)</code></td>
          </tr>
          <tr>
            <td>Access Zone ID (e.g. 202)</td>
            <td className="badge-disclosed"><Eye size={14} style={{ display: 'inline', marginRight: 4 }} /> Disclosed Ledger</td>
            <td>Disclosed via <code style={{ color: 'var(--accent-emerald)' }}>disclose(accessZoneId)</code></td>
          </tr>
          <tr>
            <td>Access Grants Counter</td>
            <td className="badge-disclosed"><Eye size={14} style={{ display: 'inline', marginRight: 4 }} /> Public Ledger</td>
            <td>Incremented on successful verification</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
