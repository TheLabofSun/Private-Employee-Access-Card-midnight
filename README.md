# Private Employee Access Card (CyberAccess ZK)

[![CI Pipeline](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml/badge.svg)](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml)
![Midnight Network](https://img.shields.io/badge/Midnight-Network-4f46e5?style=flat&logo=cardano)
![Compact Compiler](https://img.shields.io/badge/Compact-v0.5.1-7c3aed?style=flat)
![Hackathon Level](https://img.shields.io/badge/Level-Level_3_Submission-10b981?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Category**: Confidential Credentials (Level 3 Master Submission)  
**Blockchain Platform**: Midnight Network (Zero-Knowledge Smart Contracts)  
**Contract Language**: Compact `0.5.1` (Compiler `0.31.1`)  
**Repository**: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight)  
**Author**: Surjo Ghosh ([@TheLabofSun](https://github.com/TheLabofSun))  

---

## Overview

**Private Employee Access Card (CyberAccess ZK)** is a privacy-preserving enterprise access control dApp built on the **Midnight Network**. It enables employees to prove facility zone access rights via Zero-Knowledge (ZK) credentials while keeping personal identities, badge secrets, clearance levels, and department data 100% private.

For full project motivation, threat model, and architecture, see [PROPOSAL.md](PROPOSAL.md).

---

## Screenshots & Platform Interface

- **Landing Page (`/`)**: Enterprise SaaS marketing portal with 4-step workflow, features grid, use cases, and privacy comparison cards.
- **Employee Dashboard (`/dashboard`)**: Real-time stats, verifications count, contract diagnostics, and quick actions.
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

## Midnight Lace Wallet Integration

The application integrates with the **Midnight Lace Wallet** browser extension:
- Automatic detection of `window.midnight.lace` / `window.midnight.mnLace`
- Displays warning banner if Lace Wallet extension is not installed
- Supports Connect, Disconnect, Session Reconnection, Address Display, and Balance sync

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

# 7. Launch interactive CLI
npm run cli

# 8. Start multi-page React frontend
cd frontend
npm install
npm run dev
```

---

## CI/CD Pipeline

The project uses **GitHub Actions** ([.github/workflows/ci.yml](.github/workflows/ci.yml)):
1. Setup Node 22 & Install Compact Compiler
2. **Compile Compact Contract** (`npm run compile`)
3. **Run Unit Tests** (`npm test`)
4. **Build & Type-Check Frontend** (`cd frontend && npm ci && npm run build`)

---

## Preprod Network Status

- **Preprod RPC Node**: `https://rpc.preprod.midnight.network`
- **Preprod Indexer**: `https://indexer.preprod.midnight.network/api/v4/graphql`
- **Preprod Wallet Address**: `mn_addr_preprod1kzer648kayc5vnfzhdg25psale9udx455ugqg42uqt4rj9nzwfvqpclnqa`
- **Blocker Status**: During Preprod wallet sync, WebSocket connection drops (`wss://rpc.preprod.midnight.network/: 1000:: Normal Closure`) prevented full sync completion due to testnet indexer backlog. Wallet seed and funded address are preserved in `.midnight-state.json`. Per mentor guidance, local network deployment (`undeployed`) serves as the primary fully operational execution target.

---

## Level 1, 2, and 3 Submission Checklist

- [x] **Level 1 (New Moon)**: Custom Compact contract, public ledger state, private input witness, `disclose()` boundaries, Compact 0.31.1 compilation, managed artifacts, local deployment script, README setup & privacy breakdown.
- [x] **Level 2 (Waxing Crescent)**: Modern multi-page React SPA, Lace Wallet connect/disconnect UI, wallet status detection banner, network & contract address env configuration, loading/success/error wizard states, public state monitor panel.
- [x] **Level 3 (First Quarter)**: Maps to Confidential Credentials category, 6 passing Vitest unit tests, GitHub Actions CI workflow with contract compile, Privacy Model section, PROPOSAL.md artifact, production-polished executive light theme UI, and 14 structured git commits.

---

## License

This project is licensed under the [MIT License](LICENSE).
