---
id: ADR-002-tech-stack-selection
title: "ADR-002: Tech Stack Selection"
sidebar_position: 3
---

# ADR-002: Tech Stack Selection

**Date**: 2026-09-01  
**Status**: ✅ Accepted

## Context
The project required choosing a frontend framework, backend runtime/framework, and a shared language strategy.

## Decision
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Shared Language**: TypeScript on both sides

## Consequences

### Positive
- **TypeScript everywhere** enables shared type definitions and full-stack type safety.
- **React** is the most widely used frontend framework — builds a highly relevant skill.
- **Vite** provides extremely fast hot-module replacement during development.
- **Express** is minimal and gives full control, good for learning HTTP fundamentals.

### Negative
- Two separate `node_modules` installs are required.
- Express requires manual setup of patterns that opinionated frameworks (NestJS) would provide.
