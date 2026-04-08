import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-native-tms-enterprise/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})