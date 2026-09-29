---
id: coding-standards
title: Coding Standards
sidebar_position: 2
---

# 📏 Coding Standards

## Language
- **TypeScript** is mandatory across all layers. No `any` types unless absolutely justified with a comment.

## Linting & Formatting
- **ESLint** is configured for both frontend and backend. Run `npm run lint` to check.
- **Prettier** handles all formatting. Run `npm run format` to auto-format.
- Both run automatically in the CI pipeline. PRs with lint errors will fail.

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Files (components) | PascalCase | `MonitorCard.tsx` |
| Files (utils/services) | camelCase | `apiService.ts` |
| Variables & Functions | camelCase | `fetchMonitors()` |
| Types & Interfaces | PascalCase | `Monitor`, `ApiResponse` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_INTERVAL` |
| MongoDB Collections | camelCase plural | `monitors` |

## TypeScript Rules
- All function parameters and return types must be explicitly typed.
- Use `interface` for object shapes, `type` for unions and primitives.
- Prefer `readonly` for immutable properties.
