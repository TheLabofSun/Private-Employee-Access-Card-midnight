import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  CheckCircle,
  Copy,
  DoorClosed,
  KeyRound,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Zone {
  id: number;
  name: string;
  requiredClearance: number;
  description: string;
}

const ZONES: Zone[] = [
  { id: 101, name: 'Main Lobby Entrance', requiredClearance: 1, description: 'Public reception & staff common area' },
  { id: 202, name: 'Secure R&D Laboratory', requiredClearance: 2, description: 'Cybersecurity & AI research wing' },
  { id: 303, name: 'Quantum Server Vault', requiredClearance: 3, description: 'Core cryptographic key storage' },
  { id: 404, name: 'Executive Command Center', requiredClearance: 4, description: 'Boardroom & Strategic Operations' },
];

interface VerifyPageProps {
  onVerify: (zone: Zone, clearance: number) => Promise<{ granted: boolean; commitmentHash: string }>;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({ onVerify }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [employeeName, setEmployeeName] = useState<string>('Dr. Evelyn Vance');
  const [department, setDepartment] = useState<string>('Security Operations');
  const [clearanceLevel, setClearanceLevel] = useState<number>(3);
  const [secretHash, setSecretHash] = useState<string>('e4d9c02a7b8e91f0a3c25b819d4e029c');
  const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[1]);
  const [, setIsVerifying] = useState<boolean>(false);
  const [proofProgressStep, setProofProgressStep] = useState<number>(0);
  const [result, setResult] = useState<{ granted: boolean; commitmentHash: string; message: string } | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const handleStartVerification = async () => {
    setCurrentStep(4);
    setIsVerifying(true);
    setProofProgressStep(1); // Building Witness

    await new Promise((r) => setTimeout(r, 600));
    setProofProgressStep(2); // Executing Circuit

    await new Promise((r) => setTimeout(r, 800));
    setProofProgressStep(3); // Proof Server ZK Prover

    try {
      const res = await onVerify(selectedZone, clearanceLevel);
      setProofProgressStep(4); // Ledger Submission

      await new Promise((r) => setTimeout(r, 500));
      setCurrentStep(5);
      setResult({
        granted: res.granted,
        commitmentHash: res.commitmentHash,
        message: res.granted
          ? `ACCESS APPROVED! Clearance Level ${clearanceLevel} >= Required Zone Level ${selectedZone.requiredClearance}`
          : `ACCESS DENIED! Clearance Level ${clearanceLevel} is lower than Zone Requirement Level ${selectedZone.requiredClearance}`,
      });

      if (res.granted) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      setCurrentStep(5);
      setResult({
        granted: false,
        commitmentHash: '0x00000000000000000000000000000000',
        message: `Error: ${err?.message || 'Proof verification failed'}`,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="container-xl" style={{ paddingTop: '2rem', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Access Verification Portal</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem' }}>
          5-Step Zero-Knowledge Gate Clearance Wizard powered by Midnight Compact
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="wizard-steps">
        {[
          { step: 1, label: 'Employee Info' },
          { step: 2, label: 'Private Witness' },
          { step: 3, label: 'Zone Policy' },
          { step: 4, label: 'ZK Prover' },
          { step: 5, label: 'Access Result' },
        ].map((item) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          return (
            <div key={item.step} className={`wizard-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="wizard-step-circle">{isCompleted ? <CheckCircle size={16} /> : item.step}</div>
              <span className="wizard-step-label">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content Panels */}
      <div className="card" style={{ padding: '2rem' }}>
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
              <UserCheck color="var(--primary)" size={22} /> Step 1: Local Employee Identity Information
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Employee Full Name (On-Device Only)
                </label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Department Unit
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button className="btn-primary" onClick={() => setCurrentStep(2)}>
                  Next: Private Witness →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
              <KeyRound color="var(--violet)" size={22} /> Step 2: Private Credential Witness Parameters
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Private Security Clearance Rank
                </label>
                <select
                  value={clearanceLevel}
                  onChange={(e) => setClearanceLevel(parseInt(e.target.value, 10))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                >
                  <option value={1}>Level 1 - Standard Clearance</option>
                  <option value={2}>Level 2 - Secret Clearance</option>
                  <option value={3}>Level 3 - Top Secret Clearance</option>
                  <option value={4}>Level 4 - Executive Clearance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Badge Cryptographic Secret Hash (32 Bytes)
                </label>
                <input
                  type="password"
                  value={secretHash}
                  onChange={(e) => setSecretHash(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <button className="btn-primary" onClick={() => setCurrentStep(3)}>
                  Next: Select Facility Zone →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
              <DoorClosed color="var(--emerald)" size={22} /> Step 3: Select Target Facility Security Zone
            </div>

            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              {ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '0.75rem',
                      background: isSelected ? 'var(--primary-light)' : 'white',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>{zone.name}</span>
                      <span className="network-pill">REQ: L{zone.requiredClearance}</span>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{zone.description}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
                ← Back
              </button>
              <button className="btn-primary" onClick={handleStartVerification}>
                <Sparkles size={18} /> Execute ZK Gate Verification
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <RefreshCw className="spin" size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Generating Zero-Knowledge Proof...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Executing Compact ZK circuit constraints on Midnight Proof Server (Port 6300)
            </p>

            <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className={`network-pill ${proofProgressStep >= 1 ? 'active' : ''}`} style={{ padding: '0.6rem 1rem', width: '100%', justifyContent: 'flex-start' }}>
                1. Building Private Witness (Clearance L{clearanceLevel})
              </div>
              <div className={`network-pill ${proofProgressStep >= 2 ? 'active' : ''}`} style={{ padding: '0.6rem 1rem', width: '100%', justifyContent: 'flex-start' }}>
                2. Executing Compact `verifyAccess(L{clearanceLevel} &gt;= L{selectedZone.requiredClearance})`
              </div>
              <div className={`network-pill ${proofProgressStep >= 3 ? 'active' : ''}`} style={{ padding: '0.6rem 1rem', width: '100%', justifyContent: 'flex-start' }}>
                3. Computing zk-SNARK proof payload
              </div>
              <div className={`network-pill ${proofProgressStep >= 4 ? 'active' : ''}`} style={{ padding: '0.6rem 1rem', width: '100%', justifyContent: 'flex-start' }}>
                4. Submitting `disclose(isGranted)` to Midnight Ledger
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && result && (
          <div>
            <div
              style={{
                padding: '2rem',
                borderRadius: '1rem',
                background: result.granted ? 'var(--emerald-light)' : 'var(--rose-light)',
                border: `2px solid ${result.granted ? 'var(--emerald)' : 'var(--rose)'}`,
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              {result.granted ? (
                <ShieldCheck size={56} color="var(--emerald)" style={{ marginBottom: '1rem' }} />
              ) : (
                <ShieldAlert size={56} color="var(--rose)" style={{ marginBottom: '1rem' }} />
              )}
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: result.granted ? 'var(--emerald)' : 'var(--rose)', marginBottom: '0.5rem' }}>
                {result.granted ? 'ACCESS APPROVED' : 'ACCESS DENIED'}
              </h2>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                {result.message}
              </p>
            </div>

            {/* Commitment Hash Display */}
            <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                ON-CHAIN PROOF COMMITMENT HASH
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <code style={{ fontSize: '0.85rem', color: 'var(--primary)', wordBreak: 'break-all' }}>
                  {result.commitmentHash}
                </code>
                <button className="btn-secondary" onClick={() => copyHash(result.commitmentHash)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  <Copy size={12} /> {copiedHash ? 'Copied!' : 'Copy Hash'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-primary" onClick={() => setCurrentStep(1)}>
                Verify Another Credential
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
