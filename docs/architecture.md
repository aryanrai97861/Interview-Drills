# Architecture

This project is simple and organized into two services:

- api: Express + MongoDB
- web: Next.js frontend

Entities (ERD):
- User(id, googleId, email, name, avatar)
- Drill(id, title, tags, difficulty, questions[])
- Attempt(id, userId, drillId, answers[], score, createdAt)

Sequence (Login -> Take drill -> Submit):
1. User clicks "Sign in with Google" on frontend.
2. Browser opens `/api/auth/google` which redirects to Google consent.
3. On approve, Google redirects to `/auth/google/callback` which creates/fetches User, sets session cookie and redirects to frontend.
4. User visits `/dashboard` which fetches `/api/drills`.
5. User opens a drill, answers questions, submits to `/api/attempts`.
6. Backend scores answers and stores Attempt.


