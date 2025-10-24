/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',  // simulates a browser environment
    setupFiles: './src/__tests__/setupTests.tsx', // optional, for jest-dom or other setup
    include: ['./src/__tests__/*/*.tsx'],  // adjust to match your file names
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})