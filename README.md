# Private Employee Access Card (CyberAccess ZK)

A privacy-preserving zero-knowledge employee access verification platform built on the Midnight Network using Compact smart contracts.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel_Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://private-employee-access-card-midnig-theta.vercel.app/)
[![YouTube Demo Video](https://img.shields.io/badge/YouTube-Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/GQjRHn7s3-c)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD_Pipeline-passing-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml)
[![Network](https://img.shields.io/badge/Network-Midnight_Preprod-6f42c1?style=for-the-badge&logo=midnight&logoColor=white)](https://explorer.preprod.midnight.network/)
[![Frontend](https://img.shields.io/badge/Frontend-React_18_%2B_TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://private-employee-access-card-midnig-theta.vercel.app/)
[![Compact](https://img.shields.io/badge/Compact-v0.5.1-000000?style=for-the-badge)](contracts/private-employee-access-card.compact)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](package.json)

---

## 📄 Product Proposal & Architecture

* 📄 **Product Proposal Document**: [PROPOSAL.md](PROPOSAL.md)
* 🎨 **UI Directory**: [`frontend/`](frontend) — 100% React 18 + TypeScript UI (HTML5, Vanilla CSS, Vite ES Modules)

---

## 🚀 Live Demo, Video & Repository

* 🌐 **Live Web Application**: [https://private-employee-access-card-midnig-theta.vercel.app/](https://private-employee-access-card-midnig-theta.vercel.app/)
* 🎬 **YouTube Demo Video**: [https://youtu.be/GQjRHn7s3-c](https://youtu.be/GQjRHn7s3-c)
* 🐙 **GitHub Repository**: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight)
* ⚙️ **CI/CD Workflow**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

---

## 📋 RiseIn Monthly Challenge - Level 3 Passing Checklist

- [x] **Level 3 Multi-Role ZK Architecture**: Employee access verification with zero-knowledge witness claims and on-chain commitment hashing
- [x] **Local Smart Contract Deployment**: Verified via `npm run setup` / `npm run deploy` (`b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113`)
- [x] **Preprod Smart Contract Deployment**: Verified on Preprod (`b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113`)
- [x] **Product Proposal Submitted**: Approved proposal in [PROPOSAL.md](PROPOSAL.md)
- [x] **React + TypeScript Frontend (`frontend/`)**: Modern React 18 + TS SPA inside `frontend/`
- [x] **Passing Test Suite**: 6/6 Vitest unit tests passing (`npm test`)
- [x] **CI/CD Pipeline Running**: GitHub Actions workflow running automated build & tests ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
- [x] **Public GitHub Repository**: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight)
- [x] **Browser Wallet Integration**: Connects to user's Midnight Lace Wallet (`window.midnight`) and retrieves employee wallet address via `getUnshieldedAddress()`
- [x] **35+ Meaningful Commits**: Verified structured commit history in main branch

---

## 🛠️ Smart Contract Deployment Details

| Environment | Contract Address | Status | Verification Link |
| :--- | :--- | :--- | :--- |
| Local Standalone Node | `b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113` | ✅ Deployed Local (`npm run setup`) | Local Docker Standalone |
| Midnight Preprod Testnet | `b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113` | ✅ Deployed Preprod | [Verify on Explorer](https://explorer.preprod.midnight.network/) |
| Live Web App (UI) | `https://private-employee-access-card-midnig-theta.vercel.app/` | ✅ Active Production | [Open Live App](https://private-employee-access-card-midnig-theta.vercel.app/) |

---

## 🛡️ Midnight Privacy Model: What an Observer Learns vs Cannot Learn

### ❌ What an Observer CANNOT Learn (Kept Strictly Private):

1. **Employee Secret Verification Code**: The secret passcode string (`employeeSecret`) is executed purely in local ZK witnesses and never transmitted to the network or stored in public state.
2. **Employee Identity Claims**: Employee identity attributes (`identityCommitment`, `clearanceSecret`) remain on the employee's local device inside the private enclave.
3. **Employee Access Credentials**: Badge secrets (`badgeSecret`) and security clearance ranks (`employeeClearance`) are verified inside local ZK circuit constraints.
4. **Employee Authorization Witness Data**: Private verification inputs (`cardExpiration`, `employeeNonce`) prove facility access eligibility without revealing personal identifiable information (PII) or unshielded addresses on-chain.
5. **Private Verification Inputs**: Zero-Knowledge proof proves gate eligibility (`employeeClearance >= requiredZoneClearance`) without disclosing actual clearance tier or employee identity.

### ✅ What an Observer CAN Learn (Disclosed On-Chain Public State):

1. **Verified Employee Count**: Aggregate counters (`issuedCardsCount`, `accessGrantsCount`) tracking total active cards and successful gate check-ins.
2. **Registered Access Zone ID**: The active facility zone identifier (`latestAccessZone`) stored on the public ledger.
3. **Verification Event Commitment Hash**: The disclosed persistent access decision (`isGranted`) and proof commitment hash representing a mathematically proven verification event.
4. **Public Access Statistics**: Global facility floor policy (`minClearancePolicy`) and facility company identifier (`companyId`).

---

## 🚀 Quickstart & Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight.git
   cd Private-Employee-Access-Card-midnight
   ```

2. **Install dependencies**:
   ```bash
   npm run build
   ```

3. **Deploy Smart Contract Locally**:
   ```bash
   npm run setup
   ```

4. **Start Development Server (`frontend/`)**:
   ```bash
   cd frontend && npm run dev
   ```

5. **Run Automated Unit Tests**:
   ```bash
   npm test
   ```

---

## 📸 Platform Screenshots

## Landing Page
![Landing Page](docs/images/Landing-page.png)

## Dashboard
![Dashboard](docs/images/Dashboard.png)

## Access Verification
![Access Verification](docs/images/Access-Verification.png)

## Access Zones
![Access Zones](docs/images/Access-Zones.png)

## Verification History
![Verification History](docs/images/Verification-History.png)
