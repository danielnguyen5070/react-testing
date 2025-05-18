/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',  // simulates a browser environment
    setupFiles: './src/__tests__/setupTests.tsx', // optional, for jest-dom or other setup
    include: ['./src/__tests__/final/*.tsx', './src/__tests__/excercise/*.tsx'],  // adjust to match your file names
  },
})