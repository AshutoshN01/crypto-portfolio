CryptoDashboard — Foundation
=================================

This repository contains the Crypto Portfolio Management Platform. It includes a TypeScript React frontend and a Node.js + Express TypeScript backend.

Installation & quick start
-------------------------
Prerequisites:
- Node.js 18+ installed
- pnpm (recommended) or npm

From repository root, run:

Using pnpm (recommended):

```powershell
pnpm install
pnpm dev

# in a second terminal for the backend

pnpm install
pnpm dev
```

Or using npm:

```powershell
cd frontend
npm install
npm run dev

cd ../server
npm install
npm run dev
```

Project layout (foundation)
- frontend/ — React + Vite + TypeScript + Tailwind
- server/ — Express + TypeScript + Mongoose

Next steps
- Verify .env files using the .env.example in each folder.
- Start frontend and backend, then open http://localhost:5173 (Vite) and backend at port 4000.
