---
id: overview
title: API Overview
sidebar_position: 1
---

# 🔌 API Reference

## Base URLs

| Environment | URL |
|---|---|
| Local Development | `http://localhost:5000` |
| Production | `https://your-app.onrender.com` |

## Content Type
All requests and responses use `application/json`.

## API Versioning
The current version is **v1** (unversioned). Future versions will be prefixed with `/api/v2/`.

## Available Resources

| Resource | Base Path | Description |
|---|---|---|
| Monitors | `/api/monitors` | CRUD operations for server monitors |
| Health Checks | `/api/health-checks` | Health check results |
| Status | `/api/status` | Application health status |
