import React from 'react';
import { Cpu, QrCode } from 'lucide-react';

export interface EmployeeCredential {
  name: string;
  department: string;
  departmentCode: number;
  clearanceLevel: number;
  clearanceLabel: string;
  secretHash: string;
  expirationYears: number;
}

interface BadgeGeneratorProps {
  credential: EmployeeCredential;
  onChange: (updated: EmployeeCredential) => void;
}

export const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({ credential, onChange }) => {
  const getPillClass = (level: number) => {
    switch (level) {
      case 1: return 'pill-level-1';
      case 2: return 'pill-level-2';
      case 3: return 'pill-level-3';
      case 4: return 'pill-level-4';
      default: return 'pill-level-1';
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Cpu color="var(--accent-cyan)" size={24} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>1. Holographic Employee Access Card</h2>
      </div>

      {/* 3D Holographic Card Visual */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="holographic-card">
          <div className="badge-header">
            <div className="badge-chip"></div>
            <div className={`badge-clearance-pill ${getPillClass(credential.clearanceLevel)}`}>
              L{credential.clearanceLevel} • {credential.clearanceLabel}
            </div>
          </div>

          <div className="badge-body">
            <div className="badge-name">{credential.name || 'ANONYMOUS EMPLOYEE'}</div>
            <div className="badge-dept">{credential.department} (DEPT #{credential.departmentCode})</div>
          </div>

          <div className="badge-footer">
            <div>
              <div>ID: 0x{credential.secretHash.slice(0, 10)}...</div>
              <div>VALID UNTIL: {new Date(Date.now() + credential.expirationYears * 365 * 86400 * 1000).toLocaleDateString()}</div>
            </div>
            <QrCode size={42} color="var(--accent-cyan)" />
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Employee Name (Local Display Only)
          </label>
          <input
            type="text"
            value={credential.name}
            onChange={(e) => onChange({ ...credential, name: e.target.value })}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Department
          </label>
          <select
            value={credential.departmentCode}
            onChange={(e) => {
              const code = parseInt(e.target.value, 10);
              const label = code === 101 ? 'R&D Cybernetics' : code === 202 ? 'Security Operations' : code === 303 ? 'Quantum Vault Ops' : 'Executive Command';
              onChange({ ...credential, departmentCode: code, department: label });
            }}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }}
          >
            <option value={101}>R&D Cybernetics (#101)</option>
            <option value={202}>Security Operations (#202)</option>
            <option value={303}>Quantum Vault Ops (#303)</option>
            <option value={404}>Executive Command (#404)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Private Clearance Level
          </label>
          <select
            value={credential.clearanceLevel}
            onChange={(e) => {
              const lvl = parseInt(e.target.value, 10);
              const lbl = lvl === 1 ? 'Standard' : lvl === 2 ? 'Secret' : lvl === 3 ? 'TopSecret' : 'Executive';
              onChange({ ...credential, clearanceLevel: lvl, clearanceLabel: lbl });
            }}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }}
          >
            <option value={1}>Level 1 - Standard</option>
            <option value={2}>Level 2 - Secret</option>
            <option value={3}>Level 3 - TopSecret</option>
            <option value={4}>Level 4 - Executive</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Private Badge Secret Hash (32-bytes)
          </label>
          <input
            type="password"
            value={credential.secretHash}
            onChange={(e) => onChange({ ...credential, secretHash: e.target.value })}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }}
          />
        </div>
      </div>
    </div>
  );
};
