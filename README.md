# Live Demo

🚀 [https://leafy-chaja-e5b9d4.netlify.app/](https://leafy-chaja-e5b9d4.netlify.app/)

---

# Private Employee Access Card (CyberAccess ZK)

[![Live Web Application](https://img.shields.io/badge/Netlify_App-Successfully_Deployed-10b981?style=for-the-badge&logo=netlify)](https://leafy-chaja-e5b9d4.netlify.app/)
[![CI Pipeline](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml/badge.svg)](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight/actions/workflows/ci.yml)
![Midnight Network](https://img.shields.io/badge/Midnight-Network-4f46e5?style=flat&logo=cardano)
![Compact Compiler](https://img.shields.io/badge/Compact-v0.5.1-7c3aed?style=flat)
![Hackathon Level](https://img.shields.io/badge/Level-Level_3_Submission-10b981?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Live Demo URL**: [https://leafy-chaja-e5b9d4.netlify.app/](https://leafy-chaja-e5b9d4.netlify.app/)  
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

## Repository Metadata Configuration

To display the live Netlify application link and description on your GitHub repository:

1. Open your repository: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight).
2. Click the **Gear Icon ⚙️** next to **About** on the right sidebar.
3. Set **Description** to:
   ```text
   🌐 Live Site → https://leafy-chaja-e5b9d4.netlify.app/
   ```
4. Check the **Website** checkbox and paste:
   ```text
   https://leafy-chaja-e5b9d4.netlify.app/
   ```
5. Click **Save Changes**.

---

## Local Development & Setup

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

# 6. Start multi-page React frontend
cd frontend
npm install
npm run dev
```

---

## License

This project is licensed under the [MIT License](LICENSE).
