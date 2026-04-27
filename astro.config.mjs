import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ebeli.com',
  image: {
    domains: ['images.unsplash.com'],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
