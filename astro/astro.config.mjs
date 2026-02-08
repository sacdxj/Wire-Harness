import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trycay.com',
  integrations: [tailwind(), sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Remote images for CDN
    remotePatterns: []
  },
  build: {
    format: 'directory',
    assets: '_assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]'
        }
      }
    }
  }
});
