---
id: ADR-001-monorepo-structure
title: "ADR-001: Monorepo Structure"
sidebar_position: 2
---

# ADR-001: Monorepo Structure

**Date**: 2026-09-01  
**Status**: ✅ Accepted

## Context
The project has two distinct applications: a React frontend and a Node.js backend. The question was whether to house them in separate repositories or in a single monorepo.

## Decision
Use a **single monorepo** (`uptime-monitor-infrastructure`) with `frontend/` and `backend/` as subdirectories.

## Consequences

### Positive
- Single `git clone` to get the full project.
- Easier to make cross-cutting changes (e.g., updating shared TypeScript types).
- Simpler CI/CD — one pipeline file can test both layers.
- One place for all documentation, configuration, and issues.

### Negative
- Repository grows larger over time.
- Developers must be careful to run commands from the correct subdirectory.
- `node_modules` for each sub-project are separate (no workspace sharing currently).
