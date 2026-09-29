---
id: git-workflow
title: Git Workflow
sidebar_position: 3
---

# 🌿 Git Workflow

## Branch Strategy

```
main          ← Production-ready code
  └── dev     ← Integration branch (CI/CD triggers from here)
        ├── feature/phase2-core-backend
        ├── feature/phase2-dashboard-ui
        └── feature/phase3-testing-ci
```

## Flow
1. All new work is done on a `feature/` branch off `dev`.
2. Feature branches are merged into `dev` via Pull Request.
3. `dev` is merged into `main` only for production releases.

## Commit Message Convention
This project uses **Conventional Commits**:

```
<type>(<scope>): <description>

Types:
  feat     → New feature
  fix      → Bug fix
  docs     → Documentation change
  test     → Adding/updating tests
  refactor → Code change (no new feature/fix)
  chore    → Build, CI, tooling changes
  style    → Formatting changes only

Examples:
  feat(backend): add monitor creation endpoint
  fix(frontend): resolve modal close on backdrop click
  docs(adr): add ADR-003 mongodb decision record
  test(backend): add unit tests for monitorService
```
