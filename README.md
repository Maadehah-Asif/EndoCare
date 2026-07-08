# EndoCare

EndoCare is a modular health platform for endometriosis care.

This repo is scaffolded as a modular monorepo:

- `apps/mobile`: React Native frontend (Expo-based)
- `apps/api`: Node/Express backend as a modular monolith
- `packages/contracts`: shared TypeScript contracts between frontend and backend
- `services/*`: future extracted microservices such as AI risk scoring and imaging analysis

Why this structure:

- frontend and backend stay clearly separated
- each feature module has its own boundary
- you can start simple as one backend app
- later you can extract one module into its own service without rebuilding the whole system

Start here:

- Read [folder-setup.md](./folder-setup.md)
- Build UI screens inside `apps/mobile/src/modules/*`
- Build API logic inside `apps/api/src/modules/*`
- Move heavy AI workloads into `services/*` when needed

Current scaffold also includes:

- `apps/mobile/src/services` for app-wide API/auth/storage helpers
- `apps/mobile/src/navigation/RootNavigator.tsx`, `AuthStack.tsx`, and `MainTabs.tsx`
- `apps/api/src/ml-services` for wrappers that call external Python/ML services

## Prerequisites

- Node.js `20.x` or `22.x`
- npm `10+`
- Expo Go on a phone, or an Android/iOS simulator
- MongoDB Atlas if you plan to wire the backend to a real database

Tested locally in this workspace with:

- Node `v22.14.0`
- npm `10.9.2`

## Install

From the repo root:

```bash
npm install
```

If Windows PowerShell blocks `npm` with a script execution error, use:

```powershell
npm.cmd install
```

This project uses npm workspaces, so one install at the repo root installs the root, mobile, API, and shared package dependencies together.

Important:

- Do not use `npm install --force` or `--legacy-peer-deps` for this project unless you are intentionally bypassing compatibility checks.
- The mobile app uses pinned Expo/React Native native-package versions to avoid dependency drift and peer-resolution failures on fresh installs.

## Environment Setup

Create local env files from the examples:

```bash
cp apps/mobile/.env.example apps/mobile/.env
cp apps/api/.env.example apps/api/.env
```

Windows PowerShell:

```powershell
Copy-Item apps/mobile/.env.example apps/mobile/.env
Copy-Item apps/api/.env.example apps/api/.env
```

### Mobile env

`apps/mobile/.env`

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
```

### API env

`apps/api/.env`

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority&appName=EndoCareCluster
MONGODB_DB_NAME=endocare
```

Notes:

- Keep the database name in `MONGODB_DB_NAME`.
- Leave `?retryWrites=true&w=majority` in the Atlas URI unless you have a specific reason to change write behavior.
- The scaffold includes MongoDB env configuration, but a real database connection file has not been wired yet.

## Run The Project

Start the backend:

```bash
npm run dev:api
```

Start the mobile app in a second terminal:

```bash
npm run dev:mobile
```

Useful workspace commands:

- `npm run dev:api` starts the Express API with `tsx watch`
- `npm run dev:mobile` starts the Expo development server
- `npm run typecheck` runs TypeScript checks across workspaces that expose a typecheck script

On Windows PowerShell, use `npm.cmd` instead of `npm` if execution policy blocks the default PowerShell shim.

## Current Status

What is ready now:

- monorepo structure
- frontend and backend module boundaries
- Expo mobile scaffold
- Express API scaffold
- shared TypeScript contracts
- ML service placeholders

What is not wired yet:

- authentication
- production build pipeline
- real feature module implementation

Backend startup behavior:

- the API now attempts a real MongoDB connection before it starts listening
- if MongoDB credentials are invalid or Atlas network access is not configured, the API will exit instead of starting in a broken state

## Safe Setup Notes For Other Developers

- Install from the repo root, not from inside `apps/mobile` or `apps/api`.
- Keep frontend module code inside `apps/mobile/src/modules/*`.
- Keep backend business logic inside `apps/api/src/modules/*`.
- Do not make one frontend module import directly from another frontend module.
- Do not make one backend module query another module's tables or collections directly.
- If you later extract a backend module into a service, keep the public API contract stable so the mobile app does not need to change.
