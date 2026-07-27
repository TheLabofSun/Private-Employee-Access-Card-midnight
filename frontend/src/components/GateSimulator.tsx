import React, { useState } from 'react';
import { DoorClosed, ShieldAlert, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { EmployeeCredential } from './BadgeGenerator';

interface Zone {
  id: number;
  name: string;
  requiredClearance: number;
  clearanceLabel: string;
  description: string;
}

const ZONES: Zone[] = [
  { id: 101, name: 'Main Lobby Entrance', requiredClearance: 1, clearanceLabel: 'Level 1 - Standard', description: 'Public reception & common staff area' },
  { id: 202, name: 'Secure R&D Laboratory', requiredClearance: 2, clearanceLabel: 'Level 2 - Secret', description: 'Advanced cybersecurity & AI research wing' },
  { id: 303, name: 'Quantum Server Vault', requiredClearance: 3, clearanceLabel: 'Level 3 - TopSecret', description: 'Core cryptographic key storage' },
  { id: 404, name: 'Executive Command Center', requiredClearance: 4, clearanceLabel: 'Level 4 - Executive', description: 'Boardroom & Strategic Ops' },
];

interface GateSimulatorProps {
  credential: EmployeeCredential;
  onVerifyProof: (zone: Zone) => Promise<boolean>;
}

export const GateSimulator: React.FC<GateSimulatorProps> = ({ credential, onVerifyProof }) => {
  const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[1]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [proofStep, setProofStep] = useState<number>(0);
  const [verificationResult, setVerificationResult] = useState<{ granted: boolean; message: string } | null>(null);

  const handleSimulateGateAccess = async () => {
    setIsVerifying(true);
    setVerificationResult(null);
    setProofStep(1); // Step 1: Constructing Private Witness

    await new Promise((r) => setTimeout(r, 600));
    setProofStep(2); // Step 2: Executing Compact Circuit (verifyAccess)

    await new Promise((r) => setTimeout(r, 800));
    setProofStep(3); // Step 3: Generating ZK Proof via Proof Server

    try {
      const isGranted = await onVerifyProof(selectedZone);
      setProofStep(4); // Step 4: Ledger Confirmation

      setVerificationResult({
        granted: isGranted,
        message: isGranted
          ? `ACCESS GRANTED! Privately verified Level ${credential.clearanceLevel} clearance >= Required Level ${selectedZone.requiredClearance}`
          : `ACCESS DENIED! Employee clearance Level ${credential.clearanceLevel} is lower than Zone requirement Level ${selectedZone.requiredClearance}`,
      });

      if (isGranted) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      setVerificationResult({
        granted: false,
        message: `Verification Error: ${err?.message || 'Transaction error'}`,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DoorClosed color="var(--accent-cyan)" size={24} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>2. Facility Gate Clearance Simulator</h2>
      </div>

      {/* Zone Select Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {ZONES.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          return (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--accent-cyan)' : 'white' }}>
                  {zone.name}
                </span>
                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.08)' }}>
                  REQ: L{zone.requiredClearance}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{zone.description}</p>
            </div>
          );
        })}
      </div>

      {/* Proof Steps Visualizer */}
      {isVerifying && (
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-glow)' }}>
          <div className={`step-indicator ${proofStep >= 1 ? 'step-active' : ''}`}>
            <div className="step-number">1</div>
            <span style={{ fontSize: '0.85rem' }}>Building Private Witness (Clearance L{credential.clearanceLevel}, Key Hash)</span>
          </div>
          <div className={`step-indicator ${proofStep >= 2 ? 'step-active' : ''}`}>
            <div className="step-number">2</div>
            <span style={{ fontSize: '0.85rem' }}>Executing Compact Circuit `verifyAccess(L{credential.clearanceLevel} &gt;= L{selectedZone.requiredClearance})`</span>
          </div>
          <div className={`step-indicator ${proofStep >= 3 ? 'step-active' : ''}`}>
            <div className="step-number">3</div>
            <span style={{ fontSize: '0.85rem' }}>Generating ZK Proof via Midnight Proof Server (Port 6300)</span>
          </div>
          <div className={`step-indicator ${proofStep >= 4 ? 'step-active' : ''}`}>
            <div className="step-number">4</div>
            <span style={{ fontSize: '0.85rem' }}>Submitting Disclosed Boolean Result to Midnight Public Ledger</span>
          </div>
        </div>
      )}

      {/* Verify Action Button */}
      <button
        className="btn-primary"
        onClick={handleSimulateGateAccess}
        disabled={isVerifying}
        style={{ justifyContent: 'center', padding: '0.9rem', fontSize: '1rem' }}
      >
        {isVerifying ? (
          <>
            <RefreshCw className="spin" size={20} /> Proving Zero-Knowledge Gate Clearance...
          </>
        ) : (
          <>
            <Sparkles size={20} /> Verify Access to {selectedZone.name} (ZK Proof)
          </>
        )}
      </button>

      {/* Result Display */}
      {verificationResult && (
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            background: verificationResult.granted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
            border: `1px solid ${verificationResult.granted ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {verificationResult.granted ? (
            <ShieldCheck size={32} color="var(--accent-emerald)" />
          ) : (
            <ShieldAlert size={32} color="var(--accent-rose)" />
          )}
          <div>
            <h4 style={{ color: verificationResult.granted ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700 }}>
              {verificationResult.granted ? 'ACCESS PERMITTED' : 'ACCESS DENIED'}
            </h4>
            <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{verificationResult.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
