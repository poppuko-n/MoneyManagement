import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",  // ✅ ここを追加！S3 での 404 対策
  plugins: [react()],
})
