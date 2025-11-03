# Moodsic - Backend

## Setup local
- Install dependencies: `npm install`
- Copy `.env.example` to `.env` and fill DATABASE_URL, JWT_SECRET, OPENAI_API_KEY
- Create DB table `users`:
  ```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
  );
  ```
- Run: `npm run dev` (requires nodemon) or `npm start` for production.
