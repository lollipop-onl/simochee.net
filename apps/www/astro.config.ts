import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'
import lit from '@astrojs/lit';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://simochee.net',
  integrations: [
    mdx(),
    lit(),
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
    robotsTxt(),
  ],
});
