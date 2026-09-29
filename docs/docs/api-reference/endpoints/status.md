---
id: status
title: Status API
sidebar_position: 3
---

# 💚 Status API

## GET /api/status
Returns the health status of the backend application itself. Used by monitoring and load balancers.

**Response `200 OK`**
```json
{
  "status": "ok",
  "uptime": 3600,
  "timestamp": "2026-09-28T10:00:00.000Z"
}
```
