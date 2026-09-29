---
id: ci-cd-pipeline
title: CI/CD Pipeline
sidebar_position: 4
---

# ⚙️ CI/CD Pipeline

## Overview
This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment.

## Workflows

### 1. CI — Run Tests (`ci.yml`)
**Trigger**: Every push and pull request to `dev` and `main`.

**Steps**:
1. Checkout code
2. Setup Node.js 18
3. Install backend dependencies
4. Run backend tests (`npm test`)
5. Install frontend dependencies
6. Run frontend tests (`npm test`)

### 2. CD — Deploy Docs (`deploy-docs.yml`)
**Trigger**: Every push to `dev`.

**Steps**:
1. Checkout code
2. Setup Node.js 18
3. Install docs dependencies
4. Build Docusaurus site
5. Deploy to GitHub Pages (`gh-pages` branch)

> See [Deployment](/devops/deployment) for the production backend deployment setup.
