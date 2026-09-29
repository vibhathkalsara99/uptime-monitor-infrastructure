import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type DocSection = {
  icon: string;
  title: string;
  description: string;
  path: string;
  tag?: string;
};

const sections: DocSection[] = [
  {
    icon: '📋',
    title: 'Project Overview',
    description: 'Project charter, vision, goals, tech stack, and timeline.',
    path: '/project-overview/project-charter',
    tag: 'Start here',
  },
  {
    icon: '🏗️',
    title: 'Architecture',
    description: 'System design, component diagrams, data-flow, infrastructure.',
    path: '/architecture/system-overview',
  },
  {
    icon: '🔌',
    title: 'API Reference',
    description: 'REST endpoints, authentication, request/response schemas.',
    path: '/api-reference/overview',
  },
  {
    icon: '⚛️',
    title: 'Frontend',
    description: 'Component library, state management, routing, and services.',
    path: '/frontend/component-library',
  },
  {
    icon: '🖥️',
    title: 'Backend',
    description: 'Server setup, controllers, services, models, and routes.',
    path: '/backend/server-setup',
  },
  {
    icon: '🗄️',
    title: 'Database',
    description: 'Schema design, indexing strategy, migrations, and seeding.',
    path: '/database/schema-design',
  },
  {
    icon: '🚀',
    title: 'DevOps & Infrastructure',
    description: 'Local setup, Docker, CI/CD pipeline, and deployment.',
    path: '/devops/local-setup',
  },
  {
    icon: '🧪',
    title: 'Testing',
    description: 'Testing strategy, unit tests, integration tests, and coverage.',
    path: '/testing/testing-strategy',
  },
  {
    icon: '🔐',
    title: 'Security',
    description: 'Authentication, data protection, and dependency audit.',
    path: '/security/security-overview',
  },
  {
    icon: '📡',
    title: 'Operations',
    description: 'Monitoring, logging, incident response, and backup.',
    path: '/operations/monitoring-and-alerts',
  },
  {
    icon: '👨‍💻',
    title: 'Developer Guide',
    description: 'Contributing, coding standards, git workflow, and debugging.',
    path: '/developer-guide/contributing',
  },
  {
    icon: '📝',
    title: 'ADR',
    description: 'Architecture Decision Records: key design choices explained.',
    path: '/adr/overview',
    tag: 'Why we chose X',
  },
];

const stats = [
  { value: '13', label: 'Doc Sections' },
  { value: '50+', label: 'Pages' },
  { value: 'TS', label: 'Type-Safe' },
  { value: 'CI/CD', label: 'Automated' },
];

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function SectionCard({ icon, title, description, path, tag }: DocSection) {
  return (
    <Link to={path} className={styles.card}>
      {tag && <span className={styles.cardTag}>{tag}</span>}
      <span className={styles.cardIcon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardArrow}>→</span>
    </Link>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Enterprise-grade documentation for the Automated Server Uptime Monitor — a full-stack TypeScript application with React, Node.js, MongoDB, Docker, and GitHub Actions CI/CD."
    >
      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🟢 Live Documentation</div>
          <h1 className={styles.heroTitle}>
            Uptime Monitor
            <span className={styles.heroTitleAccent}> Docs</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Enterprise-grade documentation for the Automated Server Uptime Monitor.
            A full-stack TypeScript application with real-time monitoring, CI/CD,
            and production deployment.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.heroCta} to="/project-overview/project-charter">
              Get Started →
            </Link>
            <Link className={styles.heroSecondary} to="/architecture/system-overview">
              Architecture
            </Link>
            <a
              className={styles.heroSecondary}
              href="https://github.com/vibhathkalsara99/uptime-monitor-infrastructure"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>

          {/* stats row */}
          <div className={styles.statsRow}>
            {stats.map((s) => (
              <StatBadge key={s.label} {...s} />
            ))}
          </div>
        </div>
      </header>

      {/* ── Grid ── */}
      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse Documentation</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to understand, run, and contribute to the project.
          </p>
        </div>
        <div className={styles.grid}>
          {sections.map((s) => (
            <SectionCard key={s.path} {...s} />
          ))}
        </div>
      </main>

      {/* ── Footer CTA ── */}
      <section className={styles.footerCta}>
        <h2 className={styles.footerCtaTitle}>Ready to dive in?</h2>
        <p className={styles.footerCtaText}>
          Start with the Project Charter to understand the scope, goals, and key
          decisions behind the Uptime Monitor.
        </p>
        <Link className={styles.heroCta} to="/project-overview/project-charter">
          Read the Project Charter →
        </Link>
      </section>
    </Layout>
  );
}
