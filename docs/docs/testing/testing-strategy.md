---
id: testing-strategy
title: Testing Strategy
sidebar_position: 1
---

# 🧪 Testing Strategy

## Philosophy
This project follows the **Testing Trophy** model:
- Heavy emphasis on **integration tests** (most value per effort)
- Supported by **unit tests** for isolated business logic
- **End-to-end** tests for critical user flows

## Test Coverage Target
| Layer | Target Coverage |
|---|---|
| Backend Services | ≥ 85% |
| Backend Controllers | ≥ 75% |
| Frontend Components | ≥ 70% |

## Tools
| Tool | Layer | Purpose |
|---|---|---|
| **Jest** | Backend | Test runner & assertions |
| **Supertest** | Backend | HTTP integration testing |
| **Vitest** | Frontend | Vite-native test runner |
| **React Testing Library** | Frontend | Component rendering & interaction |
| **@testing-library/jest-dom** | Frontend | Custom DOM matchers |
