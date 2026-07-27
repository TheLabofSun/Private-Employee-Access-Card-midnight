import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  EyeOff,
  Eye,
  KeyRound,
  Building2,
  FlaskConical,
  Landmark,
  Server,
  Briefcase,
  Hospital,
  Cpu,
  Sparkles,
  CheckCircle,
  FileCheck2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-xl">
          <div className="hero-badge">
            <Sparkles size={14} /> Powered by Midnight Network ZK Circuits
          </div>

          <h1 className="hero-title">
            Verify Employee Access Rights <span>Without Revealing Identity</span>
          </h1>

          <p className="hero-subtitle">
            Midnight Network enables employees to prove facility access eligibility through Zero-Knowledge credentials
            while keeping identity, badge secrets, and clearance information private.
          </p>

          <div className="hero-cta-group">
            <Link to="/verify" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              Launch Verification <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              Learn How It Works
            </a>
          </div>

          {/* SaaS Illustration Badge Card */}
          <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
            <div className="saas-badge-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#a5b4fc' }}>
                  CYBERACCESS PRIVACY BADGE
                </div>
                <div style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', fontWeight: 700 }}>
                  CLEARANCE LEVEL 3 • TOP SECRET
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Dr. Evelyn Vance</div>
                <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>Quantum Cybernetics Division (Zone #303)</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '0.5rem', padding: '0.75rem', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Zero-Knowledge Witness:</span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>100% On-Device Private</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Ledger Disclosure:</span>
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>disclose(isGranted = true)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>On-Chain Commitment:</span>
                  <span style={{ fontFamily: 'monospace', color: '#e2e8f0' }}>0xb1e156cd73...958bd4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding" style={{ background: 'white', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-xl">
          <div className="section-header">
            <div className="section-tag">ARCHITECTURAL WORKFLOW</div>
            <h2 className="section-title">How Zero-Knowledge Access Works</h2>
            <p className="section-desc">
              A 4-step cryptographic pipeline that guarantees zero privacy leaks while satisfying audit requirements.
            </p>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div className="card">
              <div className="feature-icon-box">
                <KeyRound size={22} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>STEP 1</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Employee Credential</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Employee holds an encrypted digital access card locally containing clearance metadata and secret keys.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon-box">
                <EyeOff size={22} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>STEP 2</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Private Witness Verification</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Client evaluates clearance level and expiration bounds against facility rules inside an isolated private state.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon-box">
                <Cpu size={22} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>STEP 3</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Zero-Knowledge Proof Generation</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Midnight Proof Server computes a succinct zk-SNARK proof verifying compliance without exposing underlying inputs.
              </p>
            </div>

            <div className="card">
              <div className="feature-icon-box">
                <FileCheck2 size={22} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>STEP 4</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Facility Access Approval</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Midnight blockchain ledger validates the proof and commits the disclosed boolean access decision on-chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-header">
            <div className="section-tag">ENTERPRISE CAPABILITIES</div>
            <h2 className="section-title">Built for Modern Security Standards</h2>
            <p className="section-desc">Designed to replace insecure badge databases with mathematical privacy.</p>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon-box"><ShieldCheck size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Private Credentials</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Keep sensitive employee details off public ledgers permanently.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box"><Lock size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Security Clearance Verification</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Prove security clearance level thresholds without disclosing exact ranks.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box"><Sparkles size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Zero-Knowledge Authorization</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Validate gate access through Midnight Compact ZK circuit constraints.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box"><FileCheck2 size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Access Audit Trails</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Maintain immutable on-chain access logs with zero personally identifiable data.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box"><Building2 size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Facility Zone Controls</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Define custom clearance levels across multiple facility security zones.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box"><CheckCircle size={22} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Compliance-Friendly Privacy</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Fully compliant with GDPR, HIPAA, and strict enterprise privacy regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding" style={{ background: 'white', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-xl">
          <div className="section-header">
            <div className="section-tag">INDUSTRY APPLICATIONS</div>
            <h2 className="section-title">Designed for High-Security Environments</h2>
          </div>

          <div className="grid-3">
            <div className="card">
              <Building2 size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Corporate Headquarters</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Protect executive floors and proprietary strategy rooms.</p>
            </div>

            <div className="card">
              <FlaskConical size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Research Laboratories</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gate entry to quantum computing and biotech cleanrooms.</p>
            </div>

            <div className="card">
              <Landmark size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Government Facilities</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enforce top-secret clearance compliance without identity leakage.</p>
            </div>

            <div className="card">
              <Server size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Data Centers</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Grant physical access to mission-critical server racks.</p>
            </div>

            <div className="card">
              <Briefcase size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Executive Offices</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Secure confidential boardroom doors and treasury access.</p>
            </div>

            <div className="card">
              <Hospital size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Healthcare Institutions</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Protect medical vaults and patient record archives under HIPAA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Midnight Privacy Explanation Section */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-header">
            <div className="section-tag">MIDNIGHT PRIVACY MODEL</div>
            <h2 className="section-title">Strict Separation of Public & Private State</h2>
          </div>

          <div className="grid-2">
            <div className="card" style={{ borderLeft: '4px solid var(--emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald)', fontWeight: 700, marginBottom: '1rem' }}>
                <Eye size={20} /> What Observers Can Learn (Public Ledger)
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--emerald)" /> <strong>Access Granted Status:</strong> Boolean (Approved / Denied)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--emerald)" /> <strong>Facility Zone ID:</strong> Target zone number (e.g. #202)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--emerald)" /> <strong>Verification Counter:</strong> Incremented access count
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--emerald)" /> <strong>Commitment Hash:</strong> Cryptographic state commitment
                </li>
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--rose)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--rose)', fontWeight: 700, marginBottom: '1rem' }}>
                <EyeOff size={20} /> What Observers Cannot Learn (Private Witness)
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700 }}>✕</span> <strong>Employee Identity:</strong> Name, SSN, Employee ID
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700 }}>✕</span> <strong>Badge Secret:</strong> Private key hash
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700 }}>✕</span> <strong>Employee Record:</strong> Salary tier or department
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--rose)', fontWeight: 700 }}>✕</span> <strong>Clearance Rank:</strong> Exact rank (Level 1-4)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
