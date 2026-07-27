import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Server, FlaskConical, Landmark, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface FacilityZone {
  id: string;
  zoneCode: number;
  name: string;
  category: string;
  requiredClearance: number;
  clearanceLabel: string;
  description: string;
  status: 'ACTIVE' | 'HIGH_SECURITY';
  icon: React.ReactNode;
}

export const ZonesPage: React.FC = () => {
  const zones: FacilityZone[] = [
    {
      id: 'ZONE-A',
      zoneCode: 101,
      name: 'Zone A — Main Lobby Entrance',
      category: 'Public & Staff Reception',
      requiredClearance: 1,
      clearanceLabel: 'Level 1 Standard',
      description: 'Primary facility entry gate, visitor check-in, and common staff lounges.',
      status: 'ACTIVE',
      icon: <Building2 size={24} color="var(--primary)" />,
    },
    {
      id: 'ZONE-B',
      zoneCode: 202,
      name: 'Zone B — Operations Floor',
      category: 'Cyber Operations Wing',
      requiredClearance: 2,
      clearanceLabel: 'Level 2 Secret',
      description: 'Network operations center, incident response workstations, and SOC rooms.',
      status: 'ACTIVE',
      icon: <Landmark size={24} color="var(--primary)" />,
    },
    {
      id: 'ZONE-C',
      zoneCode: 303,
      name: 'Zone C — Research Laboratory',
      category: 'Advanced AI & Cryptography',
      requiredClearance: 2,
      clearanceLabel: 'Level 2 Secret',
      description: 'Quantum cryptography, post-quantum ZK circuit synthesis, and hardware cleanrooms.',
      status: 'HIGH_SECURITY',
      icon: <FlaskConical size={24} color="var(--violet)" />,
    },
    {
      id: 'ZONE-D',
      zoneCode: 404,
      name: 'Zone D — Executive Area',
      category: 'Boardroom & Strategic Ops',
      requiredClearance: 3,
      clearanceLabel: 'Level 3 Top Secret',
      description: 'Executive briefing rooms, treasury vaults, and board of directors chambers.',
      status: 'HIGH_SECURITY',
      icon: <ShieldCheck size={24} color="var(--amber)" />,
    },
    {
      id: 'ZONE-E',
      zoneCode: 505,
      name: 'Zone E — Restricted Server Room',
      category: 'Core Cryptographic Vault',
      requiredClearance: 4,
      clearanceLabel: 'Level 4 Executive',
      description: 'HSM key management hardware, core Midnight validator nodes, and cold storage.',
      status: 'HIGH_SECURITY',
      icon: <Server size={24} color="var(--rose)" />,
    },
  ];

  return (
    <div className="container-xl" style={{ paddingTop: '2rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="hero-badge">
          <Lock size={14} /> Security Policy Enforcer
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Facility Access Zones</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Configure and inspect facility security zone clearance requirements evaluated by Midnight ZK circuits
        </p>
      </div>

      {/* Zones Grid */}
      <div className="grid-2">
        {zones.map((zone) => (
          <div key={zone.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: '0.5rem' }}>
                  {zone.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{zone.id} (CODE #{zone.zoneCode})</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{zone.name}</h3>
                </div>
              </div>
              <span className={`badge-status ${zone.requiredClearance <= 2 ? 'badge-approved' : 'badge-denied'}`}>
                {zone.clearanceLabel}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {zone.description}
            </p>

            <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Category: <strong>{zone.category}</strong></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--emerald)', fontWeight: 600 }}>
                <CheckCircle2 size={12} /> ZK Guard Active
              </span>
            </div>

            <Link to="/verify" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Verify Access to {zone.id} <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
