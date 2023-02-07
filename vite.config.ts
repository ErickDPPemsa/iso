import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://desarrollo.pem-sa.com.mx/monweb',
  build: {
    outDir: 'monweb'
  }
})
