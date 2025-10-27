# Zapta Auth Backend

Express + MongoDB authentication backend scaffold for the Zapta frontend practice project.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: npm install
3. Start in development: npm run dev

Available endpoints
- GET /health - health check
- POST /auth/register - register user (name, email, password, role)
- POST /auth/login - login (email, password)

Notes
- This is a minimal scaffold (CommonJS). Update validation and add production hardening before use.
