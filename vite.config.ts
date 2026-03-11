/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Watches ChatBar.css during dev and re-generates ChatBar.styles.ts on save.
const syncStylesPlugin = {
  name: 'sync-chat-styles',
  handleHotUpdate({ file, server }: { file: string; server: { ws: { send: (msg: object) => void } } }) {
    if (file.endsWith('ChatBar.css')) {
      execSync('node scripts/sync-styles.mjs')
      server.ws.send({ type: 'full-reload' })
    }
  },
}

export default defineConfig({
  plugins: [react(), syncStylesPlugin],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
