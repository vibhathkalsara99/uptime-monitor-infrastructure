---
id: ADR-004-docker-for-local-db
title: "ADR-004: Docker for Local Database"
sidebar_position: 5
---

# ADR-004: Docker for Local Database

**Date**: 2026-09-01  
**Status**: ✅ Accepted

## Context
Developers need a local MongoDB instance for development. The options were: install MongoDB natively, use MongoDB Atlas in dev, or use Docker.

## Decision
Use **Docker Compose** to run a local MongoDB container for development.

## Consequences

### Positive
- **Zero native install**: Any developer with Docker can spin up the database with one command (`docker-compose up -d`).
- **Isolated environment**: The dev database is completely isolated from the developer's machine.
- **Reproducible**: Every developer gets the exact same MongoDB version.
- **Easy reset**: `docker-compose down -v` wipes all data for a clean slate.

### Negative
- Requires Docker to be installed (adds a prerequisite).
- Slightly more complex than `mongod` running natively.
