import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Uptime Monitor Docs',
  tagline: 'Enterprise-grade documentation for the Automated Server Uptime Monitor',
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment config
  url: 'https://vibhathkalsara99.github.io',
  baseUrl: '/uptime-monitor-infrastructure/',

  organizationName: 'vibhathkalsara99',
  projectName: 'uptime-monitor-infrastructure',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/vibhathkalsara99/uptime-monitor-infrastructure/tree/dev/docs/',
        },
        blog: false, // We don't need a blog section
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Uptime Monitor',
      logo: {
        alt: 'Uptime Monitor Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/vibhathkalsara99/uptime-monitor-infrastructure',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Project Overview', to: '/project-overview/project-charter' },
            { label: 'Architecture', to: '/architecture/system-overview' },
            { label: 'API Reference', to: '/api-reference/overview' },
            { label: 'Developer Guide', to: '/developer-guide/contributing' },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/vibhathkalsara99/uptime-monitor-infrastructure',
            },
            {
              label: 'Report an Issue',
              href: 'https://github.com/vibhathkalsara99/uptime-monitor-infrastructure/issues',
            },
          ],
        },
        {
          title: 'Author',
          items: [
            { label: 'Vibhath Kalsara', href: 'https://github.com/vibhathkalsara99' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vibhath Kalsara. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'typescript', 'json', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
