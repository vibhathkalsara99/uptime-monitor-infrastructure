import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: '01 · Project Overview',
      collapsed: false,
      items: [
        'project-overview/project-charter',
        'project-overview/vision-and-goals',
        'project-overview/tech-stack',
        'project-overview/project-timeline',
      ],
    },
    {
      type: 'category',
      label: '02 · Architecture',
      items: [
        'architecture/system-overview',
        'architecture/component-diagram',
        'architecture/data-flow-diagram',
        'architecture/frontend-architecture',
        'architecture/backend-architecture',
        'architecture/database-design',
        'architecture/infrastructure',
      ],
    },
    {
      type: 'category',
      label: '03 · API Reference',
      items: [
        'api-reference/overview',
        'api-reference/authentication',
        {
          type: 'category',
          label: 'Endpoints',
          items: [
            'api-reference/endpoints/monitors',
            'api-reference/endpoints/health-checks',
            'api-reference/endpoints/status',
          ],
        },
        'api-reference/error-codes',
      ],
    },
    {
      type: 'category',
      label: '04 · Frontend',
      items: [
        'frontend/component-library',
        'frontend/state-management',
        'frontend/routing',
        'frontend/services',
        'frontend/styling-guide',
      ],
    },
    {
      type: 'category',
      label: '05 · Backend',
      items: [
        'backend/server-setup',
        'backend/controllers',
        'backend/services',
        'backend/models',
        'backend/routes',
        'backend/utils',
      ],
    },
    {
      type: 'category',
      label: '06 · Database',
      items: [
        'database/schema-design',
        'database/indexing-strategy',
        'database/data-seeding',
        'database/migrations',
      ],
    },
    {
      type: 'category',
      label: '07 · DevOps & Infrastructure',
      items: [
        'devops/local-setup',
        'devops/docker',
        'devops/environment-variables',
        'devops/ci-cd-pipeline',
        'devops/deployment',
      ],
    },
    {
      type: 'category',
      label: '08 · Testing',
      items: [
        'testing/testing-strategy',
        'testing/unit-tests',
        'testing/integration-tests',
        'testing/e2e-tests',
        'testing/test-coverage-report',
      ],
    },
    {
      type: 'category',
      label: '09 · Security',
      items: [
        'security/security-overview',
        'security/authentication',
        'security/data-protection',
        'security/dependency-audit',
      ],
    },
    {
      type: 'category',
      label: '10 · Operations',
      items: [
        'operations/monitoring-and-alerts',
        'operations/logging',
        'operations/incident-response',
        'operations/backup-and-recovery',
      ],
    },
    {
      type: 'category',
      label: '11 · Developer Guide',
      items: [
        'developer-guide/contributing',
        'developer-guide/coding-standards',
        'developer-guide/git-workflow',
        'developer-guide/code-review-checklist',
        'developer-guide/debugging-guide',
      ],
    },
    {
      type: 'category',
      label: '12 · Changelog',
      items: [
        'changelog/changelog',
      ],
    },
    {
      type: 'category',
      label: '13 · Architecture Decisions (ADR)',
      items: [
        'adr/overview',
        'adr/ADR-001-monorepo-structure',
        'adr/ADR-002-tech-stack-selection',
        'adr/ADR-003-mongodb-over-sql',
        'adr/ADR-004-docker-for-local-db',
      ],
    },
  ],
};

export default sidebars;
