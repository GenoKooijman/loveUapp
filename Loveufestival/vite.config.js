import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [tailwindcss(), react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'loveUfestival',
      short_name: 'loveUfestival',
      description: 'loveUfestival',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'ArminvanBuuren.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'ArminvanBuuren.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    workbox: {
      globPatterns: [
        '**/*.{js,css,html,svg,png,ico,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,mp3,mp4,webm,ogg}'
      ],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      navigateFallback: 'index.html', 
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})