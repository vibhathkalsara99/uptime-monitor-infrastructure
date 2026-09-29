---
id: monitors
title: Monitors API
sidebar_position: 1
---

# 📡 Monitors API

Base path: `/api/monitors`

---

## GET /api/monitors
Retrieves all configured monitors.

**Response `200 OK`**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "My Production Server",
    "url": "https://myapp.com",
    "interval": 60000,
    "isActive": true,
    "createdAt": "2026-09-01T10:00:00.000Z"
  }
]
```

---

## POST /api/monitors
Creates a new monitor.

**Request Body**
```json
{
  "name": "My Server",
  "url": "https://myapp.com",
  "interval": 60000
}
```

**Response `201 Created`**
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "My Server",
  "url": "https://myapp.com",
  "interval": 60000,
  "isActive": true,
  "createdAt": "2026-09-01T10:00:00.000Z"
}
```

**Validation Errors `400 Bad Request`**
```json
{ "error": "name, url, and interval are required" }
```

---

## PUT /api/monitors/:id
Updates an existing monitor.

**URL Parameter**: `id` — MongoDB ObjectId of the monitor.

**Request Body** _(all fields optional)_
```json
{
  "name": "Updated Name",
  "interval": 30000
}
```

**Response `200 OK`**: Returns the updated monitor object.

**Error `404 Not Found`**:
```json
{ "error": "Monitor not found" }
```

---

## DELETE /api/monitors/:id
Deletes a monitor permanently.

**URL Parameter**: `id` — MongoDB ObjectId.

**Response `200 OK`**
```json
{ "message": "Monitor deleted successfully" }
```
