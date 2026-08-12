import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false
  },
  server: {
    allowedHosts: [
      'f0cb-2401-4900-8fdc-2d68-f1eb-d12a-f752-7f17.ngrok-free.app',
      'a075-2401-4900-8fdc-2d68-8534-50f7-4058-bf48.ngrok-free.app',
    ],
  },
})