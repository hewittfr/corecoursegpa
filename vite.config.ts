import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/corecoursegpa/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa',
      closeBundle() {
        const dist = resolve(process.cwd(), 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
        writeFileSync(resolve(dist, '.nojekyll'), '')
      },
    },
  ],
})
