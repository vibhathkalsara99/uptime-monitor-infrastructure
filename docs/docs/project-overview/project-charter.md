---
id: project-charter
title: Project Charter
sidebar_position: 1
---

# 📋 Project Charter

## Project Name
**Automated Server Uptime Monitor**

## Project Summary
An enterprise-grade, full-stack application that monitors server uptime in real-time. The system periodically pings registered server endpoints, records their availability and response times, and displays the status on a live dashboard — alerting when a server goes down.

## Author
**Vibhath Kalsara**

## Goals
- Build a production-quality, full-stack monitoring application from scratch.
- Gain hands-on experience with enterprise-level development practices.
- Implement CI/CD pipelines, containerization, automated testing, and proper documentation.

## Scope

### In Scope
- REST API backend (Node.js, Express, TypeScript)
- React/TypeScript frontend dashboard
- MongoDB persistence layer
- Docker-based local development environment
- Automated testing (unit, integration)
- CI/CD pipeline via GitHub Actions
- Production deployment on Render
- Full enterprise-grade documentation (this site)

### Out of Scope
- Mobile applications
- SMS/Email alerting system (future phase)
- Multi-tenancy / user accounts (future phase)

## Key Constraints
| Constraint | Detail |
|---|---|
| Budget | Free-tier services only (Render, GitHub, MongoDB Atlas) |
| Timeline | Personal learning project — no hard deadline |
| Team | Solo developer |

## Success Criteria
- [ ] All CRUD operations for monitors working correctly
- [ ] Live uptime status visible on dashboard
- [ ] All unit and integration tests passing
- [ ] CI/CD pipeline deploying to production on push
- [ ] Complete documentation published on this site
