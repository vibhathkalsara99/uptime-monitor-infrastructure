---
id: database-design
title: Database Design
sidebar_position: 6
---

# 🗄️ Database Design

## Overview
The application uses **MongoDB** as its primary database, accessed via the **Mongoose** ODM.

## Collections

### `monitors` Collection

Stores the configuration for each server being monitored.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Auto | — | Unique identifier |
| `name` | String | ✅ | — | Human-readable display name |
| `url` | String | ✅ | — | The URL to monitor |
| `interval` | Number | ✅ | — | Check frequency in milliseconds |
| `isActive` | Boolean | ✅ | `true` | Whether monitoring is currently active |
| `createdAt` | Date | Auto | `Date.now` | Timestamp of creation |
| `updatedAt` | Date | Auto | `Date.now` | Timestamp of last update |

> See the full [Schema Design](/database/schema-design) page for Mongoose code examples.
