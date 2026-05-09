# Team Task Manager

A professional, full-stack collaborative task management system built with the MERN stack. Features a sleek, modern UI with glassmorphism aesthetics, role-based access control, and a Kanban-style task board.

## 🚀 Features

- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for smooth animations and premium feel.
- **Role-Based Access Control**:
  - **Admins**: Full control over projects, members, and task assignment.
  - **Members**: Focused view of assigned tasks and status updates.
- **Interactive Kanban Board**: Visual task tracking across "Todo", "In Progress", and "Completed" states.
- **Dynamic Dashboard**: Real-time statistics on task completion and team productivity.
- **Secure Authentication**: JWT-based auth with password hashing.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Framer Motion, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Security**: JWT, BcryptJS, Helmet, CORS

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone and Install Backend**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **Install Frontend**
   ```bash
   cd client
   npm install
   ```

### Running Locally

1. **Start Backend**
   ```bash
   cd server
   npm run dev (if nodemon installed) or node index.js
   ```

2. **Start Frontend**
   ```bash
   cd client
   npm run dev
   ```

## 🚀 Deployment (Railway)

1. Connect your GitHub repository to Railway.
2. Add environment variables in the Railway dashboard.
3. Railway will automatically detect the `server` and `client` folders (you may need to configure the build commands if deploying as a monorepo).
4. Recommended: Deploy Backend first, then Frontend. Update the frontend `vite.config.js` or environment variables to point to the deployed backend URL.

## 📄 License
MIT
