TEAM TASK MANAGER
=================

A professional, full-stack collaborative task management system built with the MERN stack. Features a sleek, modern UI with glassmorphism aesthetics, role-based access control, and a Kanban-style task board.

FEATURES:
- Modern UI/UX: Built with React, Tailwind CSS, and Framer Motion for smooth animations and premium feel.
- Role-Based Access Control:
  - Admins: Full control over projects, members, and task assignment.
  - Members: Focused view of assigned tasks and status updates.
- Interactive Kanban Board: Visual task tracking across "Todo", "In Progress", and "Completed" states.
- Dynamic Dashboard: Real-time statistics on task completion and team productivity.
- Secure Authentication: JWT-based auth with password hashing.

TECH STACK:
- Frontend: React, Vite, Tailwind CSS, Lucide React, Framer Motion, Axios
- Backend: Node.js, Express
- Database: In-Memory Data Store (Optimized for Demo)
- Security: JWT, BcryptJS, Helmet, CORS

GETTING STARTED:

Prerequisites:
- Node.js (v18+)

Installation:

1. Clone and Install Backend
   cd server
   npm install

2. Configure Environment Variables
   Create a .env file in the server directory:
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

3. Install Frontend
   cd client
   npm install

Running Locally:

1. Start Backend
   cd server
   npm run dev (if nodemon installed) or node index.js

2. Start Frontend
   cd client
   npm run dev

DEPLOYMENT (Render.com):

This project is optimized for deployment on Render.com using a unified build process.

1. Create a Web Service: Link your GitHub repository to Render.
2. Environment Variables: Add the following in the Environment tab:
   - JWT_SECRET: A secure random string for tokens.
   - NODE_ENV: production
3. Build Settings:
   - Build Command: npm install && npm run build
   - Start Command: npm start
4. Root Directory: Keep as the repository root (empty or /).

Render will automatically build the frontend and serve it through the backend server.

LICENSE:
MIT
