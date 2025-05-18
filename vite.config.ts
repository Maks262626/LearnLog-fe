import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  theme_color: '#8936FF',
  background_color: '#2EC6FE',
  icons: [
    { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
    { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
  ],
  orientation: 'any',
  display: 'standalone',
  lang: 'en-US',
  name: 'LearnLog',
  short_name: 'LL',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,css,js,ico,png,svg}'],
      },
      manifest,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
