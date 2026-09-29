---
id: deployment
title: Deployment Guide
sidebar_position: 5
---

# 🚀 Deployment Guide

## Backend — Render

The backend is deployed on [Render](https://render.com) (free tier).

### Configuration
| Setting | Value |
|---|---|
| **Service Type** | Web Service |
| **Runtime** | Node.js |
| **Build Command** | `cd backend && npm install && npm run build` |
| **Start Command** | `cd backend && npm start` |
| **Environment Variables** | Set `MONGODB_URI`, `NODE_ENV=production`, `PORT` |

### MongoDB — Atlas
The production database is hosted on MongoDB Atlas (Free M0 cluster).

## Documentation — GitHub Pages

The documentation site (this site) is deployed automatically to GitHub Pages on every push to `dev`.

**Live URL**: `https://vibhathkalsara99.github.io/uptime-monitor-infrastructure/`
