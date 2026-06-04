# RUN_PROJECT.md

This document describes how to run and verify the CryptoDashboard project locally (frontend + backend) after cloning.

---

## Prerequisites

- Node.js **18+** installed
- Package manager:
  - Use **npm** (recommended for zero setup) OR pnpm (if already used by you)
- MongoDB available locally or via a hosted connection

---

## Installation steps

From repository root:

### Frontend
- `cd frontend`
- Install dependencies:
  - `npm install`
  - (or `pnpm install` if you prefer pnpm)

### Backend
- `cd ../server`
- Install dependencies:
  - `npm install`
  - (or `pnpm install` if you prefer pnpm)

---

## Backend setup (Node + Express + MongoDB)

### 1) Environment variables
The backend validates required variables at startup using `server/src/config/env.ts`.

Create a file:
- `server/.env`

### 2) MongoDB configuration
Backend connects to MongoDB using `server/src/db/connection.ts` with `env.MONGO_URI`.

- Ensure MongoDB is running
- Ensure the connection string points to an accessible MongoDB instance/database

---

## Frontend setup (React + Vite)

### 1) Environment variables
The frontend uses `import.meta.env.VITE_API_BASE` in `frontend/src/services/api.ts`.

Create a file:
- `frontend/.env`

If you do not set `VITE_API_BASE`, it defaults to:
- `http://localhost:4000/api/v1`

---

## Environment variables

### Backend required variables (`server/.env`)
`server/src/config/env.ts` requires:

- `NODE_ENV` = `development` | `test` | `production`
- `PORT` = number (default in code: 4000)
- `MONGO_URI` = MongoDB connection string (required)
- `ACCESS_TOKEN_SECRET` = string (min length 32)
- `REFRESH_TOKEN_SECRET` = string (min length 32)
- `CLIENT_ORIGIN` = a fully qualified URL (required; used for CORS)
- `ACCESS_TOKEN_TTL` = default `15m` (optional)
- `REFRESH_TOKEN_TTL` = default `7d` (optional)

### Frontend variables (`frontend/.env`)
- `VITE_API_BASE` = backend base URL (optional)
  - Example default behavior: `http://localhost:4000/api/v1`

---

## MongoDB setup

### Option A: Local MongoDB
- Start MongoDB locally (MongoDB Community Server)
- Use a connection string like:
  - `MONGO_URI=mongodb://127.0.0.1:27017/cryptodashboard`

### Option B: Hosted MongoDB
- Use the provided connection string from your provider

---

## Commands to run the project

### Terminal 1: Backend (dev)
- `cd server`
- `npm run dev`

Backend listens on:
- `http://localhost:${PORT}` (default `4000`)
- API base path: `/api/v1`

### Terminal 2: Frontend (dev)
- `cd frontend`
- `npm run dev`

Frontend dev server listens on:
- `http://localhost:5173`

---

## Commands to build the project

### Build backend
- `cd server`
- `npm run build`

This outputs compiled JS into `server/dist/`.

### Build frontend
- `cd frontend`
- `npm run build`

---

## Common errors and fixes

### 1) Backend fails immediately with missing env vars
Cause: backend validation fails in `server/src/config/env.ts`.

Fix:
- Ensure `server/.env` exists
- Ensure all required keys are present:
  - `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `CLIENT_ORIGIN`

### 2) CORS errors in browser
Cause: `CLIENT_ORIGIN` must match the frontend origin exactly.

Fix:
- If frontend runs on `http://localhost:5173`, set:
  - `CLIENT_ORIGIN=http://localhost:5173`

Backend CORS setup:
- `server/src/app.ts`: `cors({ origin: env.CLIENT_ORIGIN, credentials: true })`

### 3) Authentication / 401 issues
Cause: `Authorization: Bearer <token>` is missing or expired, OR refresh token cookie is not being sent.

Fix:
- Frontend axios is configured with `withCredentials: true`
- Cookie is set on backend with `httpOnly`, `sameSite: 'lax'`
- Ensure frontend and backend origins satisfy CORS + cookie rules

Auth endpoints:
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### 4) MongoDB connection fails
Cause: `MONGO_URI` invalid or MongoDB not reachable.

Fix:
- Verify MongoDB is running
- Verify network access for hosted MongoDB

---

## Expected URLs

- Frontend (dev): `http://localhost:5173`
- Backend health endpoint: `http://localhost:4000/api/v1/health`
- Backend API base: `http://localhost:4000/api/v1`

---

## Full testing checklist

### Step 0: Clone
- Clone repository

### Step 1: Install dependencies
- `cd frontend` -> `npm install`
- `cd ../server` -> `npm install`

### Step 2: Create environment files
- Create `server/.env` with required variables
- Create `frontend/.env` with `VITE_API_BASE` (optional)

### Step 3: Start MongoDB
- Verify MongoDB is reachable

### Step 4: Start backend
- `cd server` -> `npm run dev`
- Verify server logs `MongoDB connected`
- Verify health endpoint loads:
  - open `http://localhost:4000/api/v1/health`

### Step 5: Start frontend
- `cd frontend` -> `npm run dev`
- Open `http://localhost:5173`

### Step 6: Backend-frontend connectivity
- In browser devtools Network tab:
  - confirm API calls target `VITE_API_BASE` (default `http://localhost:4000/api/v1`)

### Step 7: CORS verification
- Confirm no CORS errors in browser console.

### Step 8: Authentication smoke test
- Register (if UI provides it) or call API directly:
  - `POST /api/v1/auth/register`
- Login:
  - `POST /api/v1/auth/login`
- Fetch current user:
  - `GET /api/v1/auth/me`

### Step 9: Build verification
- Backend:
  - `cd server` -> `npm run build`
- Frontend:
  - `cd frontend` -> `npm run build`

---

## Notes / Blocking issues found during analysis

- This environment blocked reading `.env.example` contents via tooling restrictions.
- Required environment variables were derived from:
  - `server/src/config/env.ts`
  - `frontend/src/services/api.ts`

No runtime commands were executed to complete the “final startup verification” in this environment.

