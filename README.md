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

## 🚀 Deployment (Render.com)

This project is optimized for deployment on **Render.com** using a unified build process.

1. **Create a Web Service**: Link your GitHub repository to Render.
2. **Environment Variables**: Add the following in the **Environment** tab:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for tokens.
   - `NODE_ENV`: `production`
3. **Build Settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. **Root Directory**: Keep as the repository root (empty or `/`).

Render will automatically build the frontend and serve it through the backend server.

## 📄 License
MIT
