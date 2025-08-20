# Setup / Manual Steps

This document lists one-time manual tasks needed to run the project end-to-end.

1) Google OAuth (Google Cloud Console)
  - Create or use an existing Google Cloud project.
  - Go to APIs & Services → OAuth consent screen and configure an internal/external consent.
  - In Credentials, create OAuth 2.0 Client IDs → Web application.
    - Authorized JavaScript origins: http://localhost:3000
    - Authorized redirect URIs: http://localhost:4000/auth/google/callback
  - Copy the Client ID and Client Secret into your `.env` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

2) MongoDB
  - Option A: Local Docker (recommended for quick start)
    - Docker Compose already includes a `mongo` service.
    - No extra credentials required for local run. Use the default `MONGO_URI` in `.env.example`.
  - Option B: MongoDB Atlas
    - Create a cluster and a database user.
    - Get the connection string and set `MONGO_URI` in your `.env` (replace <password> and <dbname> accordingly).

3) Environment file
  - Copy `.env.example` to `.env` at repo root.
  - Fill these values at minimum:
    - `MONGO_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`, `COOKIE_SECRET`.

4) Seed data
  - To populate sample drills run (backend):

```bash
cd api
npm install
npm run seed
```

5) Run with Docker Compose

```bash
docker compose up --build
```

6) Notes & troubleshooting
  - If cookies do not persist between frontend and backend, ensure `WEB_BASE_URL` and API CORS origin match and `COOKIE_SECURE=false` for local dev.
  - For production, set `COOKIE_SECURE=true` and use HTTPS.
