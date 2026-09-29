---
id: backend-architecture
title: Backend Architecture
sidebar_position: 5
---

# ⚙️ Backend Architecture

## Technology Stack
- **Node.js 18+** — JavaScript runtime
- **Express 4.x** — HTTP framework
- **TypeScript** — Static typing
- **Mongoose** — MongoDB ODM
- **Jest** — Testing framework

## Folder Structure

```
backend/src/
├── server.ts             ← App entry point, Express bootstrap
├── config/               ← Database connection, environment config
├── controllers/          ← Request handlers (HTTP layer)
├── services/             ← Business logic layer
├── models/               ← Mongoose schema definitions
├── routes/               ← Route definitions and middleware attachment
├── utils/                ← Shared utility functions
└── __tests__/            ← Unit and integration tests
```

## Layered Architecture

The backend follows a strict **layered architecture**:

```
Request → Router → Controller → Service → Model → Database
```

| Layer | Responsibility |
|---|---|
| **Router** | Defines URL paths and HTTP methods. Delegates to controllers. |
| **Controller** | Handles HTTP concerns: parsing requests, sending responses, error catching. |
| **Service** | Contains all business logic. Framework-agnostic. |
| **Model** | Defines data shape. Handles all DB operations via Mongoose. |
