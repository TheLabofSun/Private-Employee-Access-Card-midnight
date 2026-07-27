# Deployment Guide & Status Diagnostics

**Live Application URL**: [https://leafy-chaja-e5b9d4.netlify.app/](https://leafy-chaja-e5b9d4.netlify.app/)  
**GitHub Repository**: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight)  
**Hosting Platform**: Netlify Production Edge CDN  
**Build Command**: `cd frontend && npm install && npm run build`  
**Publish Directory**: `frontend/dist`  

---

## 1. Website Status vs. Smart Contract Status

The platform architecture decouples **Website Hosting Status** from **Midnight Smart Contract Status**:

### Website Hosting Status: **Successfully Deployed (Live)**
- The frontend React SPA is continuously built and served globally on Netlify at `https://leafy-chaja-e5b9d4.netlify.app/`.
- All React Router routes (`/dashboard`, `/verify`, `/privacy`, `/history`, `/zones`, `/credential`, `/about`) are configured with wildcards (`/* /index.html 200`) in `frontend/public/_redirects` and `netlify.toml` for seamless client-side SPA navigation.

### Midnight Smart Contract Status: **Environment Driven**
- Smart contract address and target network are configured independently via environment variables:
  - `VITE_NETWORK`: Target Midnight network (`devnet` | `preprod` | `local`)
  - `VITE_CONTRACT_ADDRESS`: Midnight contract address (e.g. `b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113`)
- **Status Display Rules**:
  - When `VITE_CONTRACT_ADDRESS` is set: Displays `Contract Status: Deployed`, along with contract address and network pill.
  - When `VITE_CONTRACT_ADDRESS` is empty: Displays `Contract Status: Contract Not Deployed Yet` and `Deployment Pending` badge, without falsely reporting the website as "Undeployed".

---

## 2. GitHub ↔ Netlify Deployment Integration Setup

To connect GitHub Environments and display Production Deployment status badges on your GitHub repository:

### Step 1: Link Netlify Site to GitHub Repository
1. Log into your [Netlify Dashboard](https://app.netlify.com/).
2. Select site: **`leafy-chaja-e5b9d4`**.
3. Go to **Site settings** → **Build & deploy** → **Continuous Deployment**.
4. Click **Manage repository** and ensure it is linked to `TheLabofSun/Private-Employee-Access-Card-midnight`.

### Step 2: Enable Netlify GitHub App Permissions
1. In Netlify, go to **Site settings** → **Build & deploy** → **Deploy notifications**.
2. Click **Add notification** → **GitHub commit status**.
3. Grant the Netlify GitHub App permissions to post deployment status checks to `TheLabofSun/Private-Employee-Access-Card-midnight`.
4. Ensure **Environment Status Reports** are enabled for production deployments (`master` branch).

### Step 3: Configure Netlify Environment Variables
1. Go to **Site settings** → **Environment variables**.
2. Add the following key-value pairs:
   - `VITE_NETWORK`: `devnet` (or `preprod`)
   - `VITE_CONTRACT_ADDRESS`: `b1e156cd7365ed131fbf7efbf97760e2196d5b596b861294093595958bd49113`
   - `VITE_PROOF_SERVER_URL`: `http://localhost:6300`
3. Trigger a new deploy via **Deploys** → **Trigger deploy** → **Deploy site**.

---

## 3. GitHub Repository Homepage Metadata Configuration

To display the live Netlify application URL directly on your GitHub repository header:

1. Open your repository: [https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight](https://github.com/TheLabofSun/Private-Employee-Access-Card-midnight).
2. On the right sidebar, find the **About** section and click the **Gear icon ⚙️**.
3. Check the **Website** checkbox.
4. In the Website input field, paste:
   ```
   https://leafy-chaja-e5b9d4.netlify.app/
   ```
5. Click **Save changes**.

---

## 4. Troubleshooting & Diagnostics

- **404 Page Not Found on Refresh**: Handled via `frontend/public/_redirects` (`/* /index.html 200`) and `netlify.toml`.
- **Lace Wallet Not Detected**: Wallet provider auto-discovers `window.midnight.lace`, `window.midnight.mnLace`, `window.cardano.midnight`, and `window.lace`. Click **Connect Lace Wallet** in header.
- **Contract Address Overrides**: Set `VITE_CONTRACT_ADDRESS` in `.env` or Netlify Environment Variables.
