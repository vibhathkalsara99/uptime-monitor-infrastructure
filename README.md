# 🖥️ Automated Server Uptime Monitor

An enterprise-grade, full-stack application for monitoring server uptime in real-time. Built with a React/TypeScript frontend, Node.js/Express/TypeScript backend, and MongoDB for persistence — all orchestrated via Docker.

---

## 📁 Monorepo Structure

```
uptime-monitor-infrastructure/
├── backend/                  # Node.js + Express + TypeScript API server
│   ├── src/
│   │   └── server.ts         # Express app entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   └── .prettierrc
├── frontend/                 # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── main.tsx
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── .eslintrc.js
│   └── .prettierrc
├── docker-compose.yml        # Spins up local MongoDB on port 27017
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) & Docker Compose
- [npm](https://www.npmjs.com/) v9+

---

### 1. Start the Database

```bash
docker-compose up -d
```

This spins up a MongoDB instance accessible at `mongodb://localhost:27017`.

---

### 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

The Express API server starts at `http://localhost:5000`.

---

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server starts at `http://localhost:5173`.

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, TypeScript, Vite              |
| Backend    | Node.js, Express, TypeScript            |
| Database   | MongoDB (Docker)                        |
| Code Style | ESLint, Prettier                        |
| Container  | Docker, Docker Compose                  |

---

## 👤 Author

**Vibhath Kalsara** — Fourth X Born

---

## 📄 License

[MIT](./LICENSE)
