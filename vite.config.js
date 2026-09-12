import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://ganga-enterprises-snowy.vercel.app',
      changefreq: 'weekly',
      priority: 0.8,
      include: ['/', '/#about', '/#services', '/#products', '/#contact'],
      dynamicRoutes: [],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 4173,
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
