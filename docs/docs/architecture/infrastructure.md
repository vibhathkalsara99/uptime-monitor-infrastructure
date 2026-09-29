---
id: infrastructure
title: Infrastructure
sidebar_position: 7
---

# 🏭 Infrastructure

## Local Development

```
Developer Machine
├── Docker Compose
│   └── mongodb:7 container → Port 27017
├── Backend Dev Server (ts-node-dev) → Port 5000
└── Frontend Dev Server (Vite) → Port 5173
```

## Production

```
Internet
└── Render (Free Tier)
    ├── Backend Service (Node.js) → Auto-assigned URL
    └── MongoDB Atlas (Free Tier M0) → Cloud DB
```

## Port Reference

| Service | Local Port | Production |
|---|---|---|
| Frontend | 5173 | GitHub Pages |
| Backend API | 5000 | Render URL |
| MongoDB | 27017 | Atlas |
| Docs Site | 3000 | GitHub Pages |
