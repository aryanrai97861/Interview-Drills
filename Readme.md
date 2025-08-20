# Interview Drills — Mini Full-stack App

This repository contains a minimal full-stack app for practicing coding interview drills with Google SSO, a dashboard of drills, drill-taking flow, keyword-based scoring, and history of attempts.

Folders:
- `api/` — Express backend (MongoDB, Mongoose)
- `web/` — Next.js frontend
- `docs/` — documentation and diagrams

Quick start (Docker):

1. Copy `.env.example` to `.env` and fill required values (see `docs/setup.md`).
2. Start services:

```bash
docker compose up --build
```

3. Open the frontend at http://localhost:3000 and the API at http://localhost:4000.

Local dev (without Docker):

- Backend:

```bash
cd api
npm install
cp ../.env.example .env
# edit .env to point MONGO_URI to your local Mongo or Mongo Atlas
npm run seed
npm run dev
```

- Frontend:

```bash
cd web
npm install
npm run dev
```

Docs:
- `docs/setup.md` — manual one-time steps (Google OAuth, MongoDB credentials)
- `docs/architecture.md` — ERD and sequence diagrams

If you want a demo video, see `docs/loom.md` for recording notes.

Known limitations & next steps:
- Authentication uses Google OAuth via Passport and cookie sessions.
- No tests yet for frontend; backend has basic smoke routes.
- Improvements: CSRF protection, stronger input validation, E2E tests, CI pipeline.
