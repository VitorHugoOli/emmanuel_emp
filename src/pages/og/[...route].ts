/**
 * Geração de imagens Open Graph (1200×630) em build-time, via astro-og-canvas.
 *
 * Gera automaticamente uma imagem por página de compartilhamento:
 *   - /og/home.png            → home institucional
 *   - /og/<slug>.png          → cada empreendimento (deriva nome/chamada/cor)
 *
 * Expansível: novos empreendimentos ganham OG automaticamente — basta o YAML.
 */
import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { empresa, hero } from '../../data/site';

/** Hex (#RRGGBB) → [r, g, b] para o bgGradient do og-canvas. */
function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '');
  const n = parseInt(
    m.length === 3
      ? m.split('').map((c) => c + c).join('')
      : m,
    16
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type OgPage = {
  title: string;
  description: string;
  primary: [number, number, number];
};

const empreendimentos = await getCollection('empreendimentos');

const pages: Record<string, OgPage> = {
  home: {
    title: empresa.nome,
    description: hero.subtitulo,
    primary: hexToRgb('#B5532E'),
  },
};

for (const e of empreendimentos) {
  pages[e.id] = {
    title: e.data.nome,
    description: e.data.chamada,
    primary: hexToRgb(e.data.tema?.cor_primaria ?? '#173A5E'),
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page: OgPage) => ({
    title: page.title,
    description: page.description,
    bgGradient: [page.primary, page.primary.map((c) => Math.round(c * 0.7)) as [number, number, number]],
    padding: 80,
    font: {
      title: {
        families: ['Fraunces'],
        weight: 'SemiBold',
        size: 72,
        color: [255, 255, 255],
        lineHeight: 1.1,
      },
      description: {
        families: ['Inter'],
        weight: 'Normal',
        size: 32,
        color: [240, 235, 226],
        lineHeight: 1.4,
      },
    },
    fonts: ['./src/assets/fonts/Fraunces.ttf', './src/assets/fonts/Inter.ttf'],
  }),
});
