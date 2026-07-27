# Private Employee Access Card (CyberAccess ZK)

[![Live Web Application](https://img.shields.io/badge/Netlify_App-Successfully_Deployed-10b981?style=for-the-badge&logo=netlify)](https://leafy-chaja-e5b9d4.netlify.app/)
[![CI Pipeline](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml/badge.svg)](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml)
![Midnight Network](https://img.shields.io/badge/Midnight-Network-4f46e5?style=flat&logo=cardano)
![Compact Compiler](https://img.shields.io/badge/Compact-v0.5.1-7c3aed?style=flat)
![Hackathon Level](https://img.shields.io/badge/Level-Level_3_Submission-10b981?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Live Web Application**: [https://leafy-chaja-e5b9d4.netlify.app/](https://leafy-chaja-e5b9d4.netlify.app/)  
**Category**: Confidential Credentials (Level 3 Master Submission)  
**Blockchain Platform**: Midnight Network (Zero-Knowledge Smart Contracts)  
**Contract Language**: Compact `0.5.1` (Compiler `0.31.1`)  
**Repository**: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight)  
**Author**: Surjo Ghosh ([@TheLabofSun](https://github.com/TheLabofSun))  

---

## Overview

**Private Employee Access Card (CyberAccess ZK)** is a privacy-preserving enterprise access control dApp built on the **Midnight Network**. It enables employees to prove facility zone access rights via Zero-Knowledge (ZK) credentials while keeping personal identities, badge secrets, clearance levels, and department data 100% private.

For full project motivation, threat model, and technical proposal, see [PROPOSAL.md](PROPOSAL.md).  
For deployment configuration and Netlify/GitHub instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Status Architecture: Website Status vs. Smart Contract Status

The application explicitly decouples **Website Hosting Status** from **Midnight Smart Contract Status**:

### 1. Website Status: **Successfully Deployed (Live)**
- **URL**: [https://leafy-chaja-e5b9d4.netlify.app/](https://leafy-chaja-e5b9d4.netlify.app/)
- **Hosting Platform**: Netlify Edge CDN (Production)
- **SPA Routing**: Handled via `frontend/public/_redirects` (`/* /index.html 200`) and `netlify.toml`.

### 2. Smart Contract Status: **Environment Controlled**
- **Deployed Contract**: `b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113`
- **Network**: Midnight Devnet / Preprod Testnet
- **Status Rules**:
  - If contract address is configured: Displays `Contract Status: Deployed` along with contract diagnostics.
  - If contract address is omitted: Displays `Contract Status: Contract Not Deployed Yet` and `Deployment Pending` badge.

---

## Screenshots & Platform Interface

- **Landing Page (`/`)**: Enterprise SaaS marketing portal with 4-step workflow, features grid, use cases, and privacy comparison cards.
- **Employee Dashboard (`/dashboard`)**: Real-time stats, verifications count, contract diagnostics, and website deployment status cards.
- **Access Verification Wizard (`/verify`)**: 5-step interactive ZK proof wizard with live step execution indicators.
- **Credential Vault (`/credential`)**: Card management with Export JSON and Revoke capabilities without exposing private witness keys.
- **Facility Zones (`/zones`)**: Zone policy inspector for Zones A through E with clearance floor rules.
- **Verification History (`/history`)**: Searchable, filterable audit log table with Copy Hash functionality.
- **Privacy Model (`/privacy`)**: Code snippets demonstrating Compact `disclose()` boundaries.
- **Architecture & About (`/about`)**: Problem statement, tech stack table, and future roadmap.

---

## Midnight Privacy Model

### Public Ledger State (Disclosed On-Chain)
- `isGranted`: Disclosed boolean access decision (`disclose(isSecretValid && hasClearance && isNotExpired)`)
- `latestAccessZone`: Disclosed target facility zone ID (`disclose(accessZoneId)`)
- `accessGrantsCount`: Public ledger counter of approved verifications
- `issuedCardsCount`: Public ledger counter of issued credentials
- `companyId`: Public facility name string
- `minClearancePolicy`: Public global clearance floor

### Private Witness State (100% On-Device Enclave)
- `employeeClearance`: Private security clearance rank (Level 1-4)
- `cardExpiration`: Expiration Unix timestamp
- `employeeSecret`: 32-byte private employee secret key
- `badgeSecret`: Private badge salt / nonce
- `employeeNonce`: Unique transaction nonce
- `employeeName & SSN`: Personal identity information

---

## Compact Contract & Witness Inputs

The smart contract is written in Compact (`contracts/private-employee-access-card.compact`):
```compact
export circuit verifyAccess(
    employeeClearance: Uint<8>,      // PRIVATE WITNESS (Rank 1-4)
    cardExpiration: Uint<64>,         // PRIVATE WITNESS (Timestamp)
    employeeSecret: Bytes<32>,       // PRIVATE WITNESS (32-byte secret)
    badgeSecret: Bytes<32>,          // PRIVATE WITNESS (Badge salt)
    employeeNonce: Uint<64>,          // PRIVATE WITNESS (Nonce)
    requiredClearance: Uint<8>,       // PUBLIC PARAMETER
    accessZoneId: Uint<16>,          // PUBLIC PARAMETER
    currentTimestamp: Uint<64>       // PUBLIC PARAMETER
): Boolean {
    const isSecretValid: Boolean = employeeSecret != default<Bytes<32>>() && badgeSecret != default<Bytes<32>>();
    const hasClearance: Boolean = employeeClearance >= requiredClearance;
    const isNotExpired: Boolean = cardExpiration >= currentTimestamp;
    const isGranted: Boolean = disclose(isSecretValid && hasClearance && isNotExpired);

    if (isGranted) {
        accessGrantsCount = (accessGrantsCount + 1) as Uint<64>;
    }

    latestAccessResult = isGranted;
    latestAccessZone = disclose(accessZoneId);

    return isGranted;
}
```

---

## Repository Homepage Configuration Instructions

To display the live Netlify application link on your GitHub repository header:

1. Go to your repository: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight).
2. Click the **Gear Icon ⚙️** next to **About** on the right sidebar.
3. Check the **Website** checkbox.
4. Enter the live URL:
   ```
   https://leafy-chaja-e5b9d4.netlify.app/
   ```
5. Click **Save Changes**.

---

## Local Development & Setup

### Prerequisites
- **OS**: WSL Ubuntu (`Linux 5.15.167.4-microsoft-standard-WSL2`)
- **Node.js**: Node 22 (`v22.23.1`)
- **npm**: npm 10 (`10.9.8`)
- **Compact CLI**: Compact `0.5.1` (compiler `0.31.1`)
- **Docker**: Docker 29.6.2 & Docker Compose v5.3.1 (running Node, Indexer, and Proof Server on port 6300)

### Quickstart Commands

```bash
# 1. Clone workspace
git clone https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight.git
cd Private-Employee-Access-Card-midnight

# 2. Install dependencies
npm install

# 3. Start Docker services (Node, Indexer, Proof Server)
npm run proof-server:start

# 4. Compile Compact contract & circuits
npm run compile

# 5. Run Vitest unit tests
npm test

# 6. Deploy contract to local undeployed devnet
npm run setup -- --network undeployed

# 7. Start multi-page React frontend
cd frontend
npm install
npm run dev
```

---

## License

This project is licensed under the [MIT License](LICENSE).
