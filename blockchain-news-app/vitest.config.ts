import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: ['src/lib/**/*.ts'],
      thresholds: {
        statements: 80,
        functions: 80,
        branches: 80,
        lines: 80,
      },
    },
  },
});
