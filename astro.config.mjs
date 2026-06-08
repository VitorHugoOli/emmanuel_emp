// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domínio oficial por padrão; sobrescreva no build temporário com
  // `SITE_URL=https://domanu.pro163d.com.br npm run build`. Todas as URLs
  // absolutas (canonical, og:image, JSON-LD, sitemap) derivam daqui.
  site: process.env.SITE_URL ?? 'https://domanu.com.br',
  integrations: [
    icon(),
    sitemap({
      // Rotas de imagem OG (.png) não são páginas indexáveis — fora do sitemap.
      filter: (page) => !page.includes('/og/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
