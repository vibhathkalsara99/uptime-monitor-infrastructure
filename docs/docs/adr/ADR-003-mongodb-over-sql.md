---
id: ADR-003-mongodb-over-sql
title: "ADR-003: MongoDB over SQL"
sidebar_position: 4
---

# ADR-003: MongoDB over SQL

**Date**: 2026-09-01  
**Status**: ✅ Accepted

## Context
The application needs to store monitor configurations and health check results. The choice was between a relational (PostgreSQL) and a document (MongoDB) database.

## Decision
Use **MongoDB** as the primary database, accessed via the **Mongoose** ODM.

## Consequences

### Positive
- **Flexible schema**: The monitoring data structure can evolve without painful migrations.
- **JSON-native**: Data maps naturally to JavaScript/TypeScript objects — no ORM impedance mismatch.
- **Free Atlas tier**: MongoDB Atlas provides a free cloud tier suitable for this project's production needs.
- **Learning value**: Adds NoSQL to the skill set alongside the SQL knowledge already possessed.

### Negative
- No ACID transactions across multiple collections (not needed for this use case).
- Less strict schema enforcement compared to SQL (mitigated by Mongoose schema validation).
