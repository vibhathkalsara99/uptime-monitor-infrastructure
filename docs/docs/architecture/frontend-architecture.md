---
id: frontend-architecture
title: Frontend Architecture
sidebar_position: 4
---

# 🎨 Frontend Architecture

## Technology Stack
- **React 18** — Component-based UI framework
- **TypeScript** — Static typing
- **Vite** — Build tool and dev server
- **Axios** — HTTP client for API calls
- **Vitest + React Testing Library** — Testing

## Folder Structure

```
frontend/src/
├── App.tsx               ← Root component, main state manager
├── main.tsx              ← React DOM entry point
├── index.css             ← Global styles & design system
├── components/           ← Reusable UI components
├── services/             ← API communication layer
├── types/                ← TypeScript type definitions
└── __tests__/            ← Component tests
```

## State Management
This project uses **local React state** (`useState`, `useEffect`) managed in `App.tsx`. No external state library (Redux, Zustand) is used, keeping the architecture simple and appropriate for the project scope.

## Design Pattern
The frontend follows a **container/presentational** pattern:
- `App.tsx` acts as the **container** — owns all state, fetches data, passes props down.
- `components/` are **presentational** — receive props and render UI only.
