Moodsic (no-auth) - Minimal version

This package includes a minimal backend (Node/Express) and a simple frontend (single HTML file).
The app removed login/registration: users can directly interact with the AI (keyword-based analyzer).

How to run locally:

1) Backend:
   cd backend
   npm install
   npm start
   Backend will run on http://localhost:5000 by default

2) Frontend:
   Open frontend/index.html in your browser (or serve it with a static server).
   The frontend assumes the backend is at the same origin under /api; if you run backend on localhost:5000,
   change the line in the HTML:
     const API_URL = (window.__API_URL__ || "") || (location.origin) + "/api";
   to:
     const API_URL = "http://localhost:5000/api";

Deployment on Render:
 - Create a Web Service that points to backend directory.
 - Build command: npm install
 - Start command: npm start
 - For the frontend, you can either host it as a Static Site (root: frontend, publish dir: .) or serve from backend by copying the HTML to backend/public.

Note: This is a demo AI (keyword based). For production you can replace the analyzer function with calls to an external AI service (OpenAI, Google GenAI), using environment variables for keys.
