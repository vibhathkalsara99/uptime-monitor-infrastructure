---
id: local-setup
title: Local Setup Guide
sidebar_position: 1
---

# 🖥️ Local Setup Guide

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | v18+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Bundled with Node.js |
| Docker | Latest | [docker.com](https://docker.com) |
| Docker Compose | V2 | Bundled with Docker Desktop |
| Git | Latest | [git-scm.com](https://git-scm.com) |

## Step 1: Clone the Repository

```bash
git clone https://github.com/vibhathkalsara99/uptime-monitor-infrastructure.git
cd uptime-monitor-infrastructure
git checkout dev
```

## Step 2: Start the Database

```bash
docker-compose up -d
```
This starts a MongoDB instance at `mongodb://localhost:27017`.

## Step 3: Configure Environment Variables

```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

## Step 4: Start the Backend

```bash
cd backend
npm install
npm run dev
# API running at http://localhost:5000
```

## Step 5: Start the Frontend

```bash
cd frontend
npm install
npm run dev
# Dashboard at http://localhost:5173
```
