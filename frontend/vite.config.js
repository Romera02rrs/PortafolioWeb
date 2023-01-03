import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  transformers: {
    gltf: {
      test: /\.gltf$/,
      transform: (src) => {
        return `export default ${JSON.stringify(src)}`;
      },
    },
  }
})