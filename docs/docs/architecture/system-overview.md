---
id: system-overview
title: System Overview
sidebar_position: 1
---

# 🏗️ System Overview

## High-Level Architecture

The Automated Server Uptime Monitor is a full-stack web application built with a clear separation of concerns across three layers: **Frontend**, **Backend**, and **Database**.

```mermaid
graph TD
    User["👤 User (Browser)"]
    FE["Frontend\nReact + TypeScript\nPort :5173 (dev)"]
    BE["Backend\nNode.js + Express + TypeScript\nPort :5000"]
    DB["MongoDB\nPort :27017 (Docker)"]
    Render["☁️ Render\nProduction Hosting"]
    Atlas["☁️ MongoDB Atlas\nCloud Database"]

    User -->|HTTPS| FE
    FE -->|REST API (JSON)| BE
    BE -->|Mongoose ODM| DB
    BE -.->|Production| Render
    DB -.->|Production| Atlas
```

## Component Responsibilities

| Component | Responsibility |
|---|---|
| **Frontend** | Renders the dashboard UI. Displays monitor status, handles user interactions (add/edit/delete monitors). Communicates with the backend via REST API. |
| **Backend** | Exposes REST API endpoints. Manages business logic (scheduling health checks, recording results). Persists data to MongoDB. |
| **Database** | Stores all monitor configurations and uptime check results. |
| **Docker Compose** | Spins up a local MongoDB instance for development. |
| **GitHub Actions** | Runs tests on every push. Deploys the app and docs automatically. |

## Key Architectural Decisions

- **Monorepo**: Frontend and backend co-located in a single repository for simplicity.
- **REST over GraphQL**: REST was chosen for its simplicity given the straightforward data model.
- **MongoDB over SQL**: Flexible document model suits the evolving schema of monitoring data.

> See the [Architecture Decisions (ADR)](/adr/overview) section for the full reasoning behind each decision.
