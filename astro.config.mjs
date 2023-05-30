import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import prefetch from '@astrojs/prefetch';
import unocss from 'unocss/astro';

export default defineConfig({
  site: 'https://www.astrid.sh',
  markdown: {
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
  integrations: [unocss(), mdx(), sitemap(), react(), prefetch()],
});
