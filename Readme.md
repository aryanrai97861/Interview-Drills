# Interview Drills - Full Stack Application

A modern web application for practicing interview questions with Google authentication, real-time scoring, and progress tracking.

## 🎯 What This Application Does

- **Practice Interview Questions**: Take drills with 5 questions each
- **Real-time Scoring**: Get instant feedback based on keyword matching
- **Track Progress**: View your attempt history and scores
- **Secure Authentication**: Sign in with your Google account
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/downloads) for cloning the repository
- Google account for OAuth setup

### 1. Clone and Setup

```bash
git clone <your-repository-url>
cd interview-drills
cp .env.example .env

# Fill required values in .env (see docs/setup.md for details)
```

### 2. Start Services

```bash
docker compose up --build
```

3. Open the frontend at http://localhost:3000 and the API at http://localhost:4000.

### 3. Local Development (Without Docker)

- **Backend**:

```bash
cd api
npm install
npm run seed
npm run dev
```

- **Frontend**:

```bash
cd web
npm install
npm run dev
```

## Documentation

- `docs/setup.md` — Manual one-time steps (Google OAuth, MongoDB credentials)
- `docs/architecture.md` — ERD and sequence diagrams
- `docs/loom.md` — Demo video recording notes

## Folders

- `api/` — Express backend (MongoDB, Mongoose)
- `web/` — Next.js frontend
- `docs/` — documentation and diagrams

## Known Limitations & Next Steps

- Authentication uses Google OAuth via Passport and cookie sessions.
- No tests yet for frontend; backend has basic smoke routes.
- Improvements: CSRF protection, stronger input validation, E2E tests, CI pipeline.
