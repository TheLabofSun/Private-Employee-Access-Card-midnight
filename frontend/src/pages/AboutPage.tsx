import React from 'react';
import { Rocket } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container-xl" style={{ paddingTop: '2rem', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Project Architecture & Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
          Private Employee Access Card (CyberAccess ZK) • Midnight Confidential Credentials Category
        </p>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--rose)' }}>
          The Problem: Traditional Access Control Data Leaks
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
          In modern enterprise security, physical and digital badge systems record every gate check in centralized SQL databases or public blockchain logs. This creates severe privacy hazards:
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--rose)', fontWeight: 700 }}>•</span> <strong>Identity Exposure:</strong> Central databases log employee names, SSNs, and employee IDs at every door scan.
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--rose)', fontWeight: 700 }}>•</span> <strong>Clearance Profiling:</strong> Unencrypted logs disclose exact security ranks, pay tiers, and department credentials.
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--rose)', fontWeight: 700 }}>•</span> <strong>Surveillance Hazards:</strong> Insiders or attackers can track employee movement patterns in real time.
          </li>
        </ul>
      </div>

      {/* Midnight Solution */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--emerald)' }}>
          The Midnight Solution: Zero-Knowledge Access Control
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
          By shifting credential verification into local Zero-Knowledge circuits written in Compact, employees can mathematically prove their authorization to enter a facility zone without exposing who they are or what rank they hold:
        </p>
        <div className="grid-2" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div style={{ background: 'var(--emerald-light)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--emerald-border)' }}>
            <div style={{ fontWeight: 700, color: 'var(--emerald)', marginBottom: '0.25rem' }}>Mathematical Verification</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-main)' }}>Proves <code>clearance &gt;= required</code> without revealing clearance number.</div>
          </div>

          <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--primary-border)' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>Auditable On-Chain Ledger</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-main)' }}>Records immutable proof authorization on Midnight blockchain.</div>
          </div>
        </div>
      </div>

      {/* Tech Stack Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Technology Stack</h2>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Smart Contracts</strong></td>
                <td>Compact 0.5.1</td>
                <td>Zero-Knowledge circuit compilation & ledger state logic</td>
              </tr>
              <tr>
                <td><strong>Blockchain</strong></td>
                <td>Midnight Network</td>
                <td>Confidential transaction validation & proof verification</td>
              </tr>
              <tr>
                <td><strong>Proof Engine</strong></td>
                <td>Midnight Proof Server 8.1.0</td>
                <td>Local zk-SNARK prover service (Port 6300)</td>
              </tr>
              <tr>
                <td><strong>Frontend SPA</strong></td>
                <td>React 19 + Vite + TypeScript</td>
                <td>Multi-page responsive executive web application</td>
              </tr>
              <tr>
                <td><strong>Routing & Icons</strong></td>
                <td>React Router DOM + Lucide React</td>
                <td>Client-side routing and UI icon system</td>
              </tr>
              <tr>
                <td><strong>Wallet Integration</strong></td>
                <td>Lace Wallet API</td>
                <td>Midnight network identity & transaction signing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Rocket color="var(--primary)" size={22} /> Future Development Roadmap
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="network-pill" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>Q3 2026</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Biometric witness integration</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bind local device WebAuthn fingerprint/FaceID into private ZK prover witness.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="network-pill" style={{ background: 'var(--violet)', color: 'white', border: 'none' }}>Q4 2026</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>NFC & Physical Gate Hardware SDK</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Deploy mobile NFC tap listeners for physical door controllers.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="network-pill" style={{ background: 'var(--emerald)', color: 'white', border: 'none' }}>Q1 2027</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cross-Chain Identity Attestations</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bridge Midnight ZK access proofs to Cardano & Ethereum enterprise sidechains.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
