import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // @ts-expect-error - Type conflict between Vite and Vitest plugins
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '*.config.ts',
        '*.config.js',
        'dist/',
        'index.tsx',
      ],
      thresholds: {
        lines: 15,
        functions: 15,
        branches: 70,
        statements: 15,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
