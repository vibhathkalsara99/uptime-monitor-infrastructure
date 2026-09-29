---
id: docker
title: Docker Guide
sidebar_position: 2
---

# 🐳 Docker Guide

## docker-compose.yml Overview

The `docker-compose.yml` at the root of the project spins up the local development database.

```yaml
# Key service: MongoDB
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
```

## Common Commands

```bash
# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove all data volumes
docker-compose down -v

# View logs
docker-compose logs -f mongodb
```
