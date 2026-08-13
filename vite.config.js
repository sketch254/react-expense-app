import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test :{
    environment : "jsdom",
    setupFiles: "./src/test/setup.js",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: { lines: 50, functions: 50, branches: 50, statements: 50 },
      exclude: ["src/main.jsx", "**/*.css", "vite.config.js"],
    },
  }
})
