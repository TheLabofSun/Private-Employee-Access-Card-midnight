import React from 'react';
import { Shield, EyeOff, Eye, Code, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="container-xl" style={{ paddingTop: '2rem', maxWidth: '900px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="hero-badge">
          <Shield size={14} /> Cryptographic Proof Architecture
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Midnight Privacy Model & Disclosure Mechanics</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
          Understanding how Midnight Compact isolates sensitive witness state from public blockchain observers.
        </p>
      </div>

      {/* Public vs Private Grid */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ borderTop: '4px solid var(--emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--emerald)', marginBottom: '1rem' }}>
            <Eye size={20} /> Public Ledger State (Disclosed)
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Public state is stored directly on the Midnight blockchain ledger and visible to all node validators.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--emerald)" /> <code>companyId</code>: Organization identifier string
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--emerald)" /> <code>issuedCardsCount</code>: Public count of cards
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--emerald)" /> <code>accessGrantsCount</code>: Successful verifications
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--emerald)" /> <code>latestAccessResult</code>: True/False outcome
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--emerald)" /> <code>latestAccessZone</code>: Verified zone ID
            </li>
          </ul>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--violet)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '1rem' }}>
            <EyeOff size={20} /> Private Witness State (Enclave)
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Private witness state remains exclusively on the employee client machine inside the local ZK prover enclave.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>🔒</span> <code>employeeClearance</code>: Clearance rank (1-4)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>🔒</span> <code>cardExpiration</code>: Unix timestamp
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>🔒</span> <code>employeeSecretKey</code>: 32-byte secret
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--violet)', fontWeight: 700 }}>🔒</span> <code>employeeName & ID</code>: Personal identity
            </li>
          </ul>
        </div>
      </div>

      {/* Code Snippet & disclose() Explanation */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
          <Code color="var(--primary)" size={20} /> Compact Circuit disclose() Mechanics
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          In Compact, private expressions must be explicitly wrapped with <code>disclose()</code> to cross the barrier from private witness computation into public ledger state. In our <code>verifyAccess</code> circuit, only the combined boolean decision and target zone ID are disclosed:
        </p>

        <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', fontSize: '0.825rem', overflowX: 'auto', lineHeight: 1.5 }}>
{`export circuit verifyAccess(
    employeeClearance: Uint<8>,    // PRIVATE WITNESS (Rank 1-4)
    cardExpiration: Uint<64>,       // PRIVATE WITNESS (Timestamp)
    requiredClearance: Uint<8>,     // PUBLIC PARAMETER
    accessZoneId: Uint<16>,        // PUBLIC PARAMETER
    currentTimestamp: Uint<64>     // PUBLIC PARAMETER
): Boolean {
    // Local private witness constraint checking:
    const hasClearance: Boolean = employeeClearance >= requiredClearance;
    const isNotExpired: Boolean = cardExpiration >= currentTimestamp;
    
    // Explicit disclosure boundary:
    const isGranted: Boolean = disclose(hasClearance && isNotExpired);

    if (isGranted) {
        accessGrantsCount = (accessGrantsCount + 1) as Uint<64>;
    }

    latestAccessResult = isGranted;
    latestAccessZone = disclose(accessZoneId);

    return isGranted;
}`}
        </pre>
      </div>

      {/* ZK Proof Flow Diagram */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Zero-Knowledge Proof Execution Flow</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div className="brand-icon-box" style={{ width: '2rem', height: '2rem', flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Client Enclave Witness Construction</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Client constructs local private witness payload with employee clearance and secret key.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div className="brand-icon-box" style={{ width: '2rem', height: '2rem', flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Proof Server Execution (Port 6300)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proof server computes zk-SNARK proof using Compact compiled WASM ZK keys without accessing raw witness data.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div className="brand-icon-box" style={{ width: '2rem', height: '2rem', flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Midnight Node On-Chain Verification</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Midnight blockchain node verifies proof validity and updates public state parameters.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
