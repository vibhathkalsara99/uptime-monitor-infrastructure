module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',   // React 17+ JSX transform — no need to import React
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Must be last
  ],
  env: {
    browser: true,
    es2020: true,
  },
  rules: {
    // ── Prettier integration ────────────────────────────────
    'prettier/prettier': 'error',

    // ── React specific ──────────────────────────────────────
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',            // TypeScript handles this
    'react/display-name': 'warn',

    // ── TypeScript specific ─────────────────────────────────
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports' },
    ],

    // ── General ─────────────────────────────────────────────
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
  },
  ignorePatterns: ['dist/', 'node_modules/', 'vite.config.ts'],
};
