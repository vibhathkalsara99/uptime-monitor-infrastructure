---
id: environment-variables
title: Environment Variables
sidebar_position: 3
---

# 🔑 Environment Variables

## Backend (`backend/.env`)

| Variable | Required | Example | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port the Express server listens on. Defaults to 5000. |
| `MONGODB_URI` | ✅ | `mongodb://localhost:27017/uptime-monitor` | Full MongoDB connection string |
| `NODE_ENV` | No | `development` | `development` or `production` |

## Frontend (`frontend/.env`)

| Variable | Required | Example | Description |
|---|---|---|---|
| `VITE_API_URL` | ✅ | `http://localhost:5000` | Base URL of the backend API |

:::caution
Never commit `.env` files to the repository. Use `.env.example` files as templates.
:::
