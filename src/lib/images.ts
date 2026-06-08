/**
 * Resolve caminhos de imagem (como escritos no conteúdo, ex.:
 * "/empreendimentos/<slug>/fachada.jpg") para `ImageMetadata` importado de
 * `src/assets`, habilitando a otimização do `astro:assets` (WebP, srcset,
 * dimensões automáticas) sem mudar a ergonomia de autoria no YAML.
 *
 * As imagens vivem em `src/assets/empreendimentos/...`; o YAML continua
 * referenciando o caminho público-like `/empreendimentos/...`.
 */
import type { ImageMetadata } from 'astro';

const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/empreendimentos/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

/** Retorna o `ImageMetadata` da imagem, ou `undefined` se não encontrada. */
export function img(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  // Caminho remoto: não há o que resolver localmente.
  if (/^https?:\/\//.test(path)) return undefined;
  const normalized = '/' + path.replace(/^\/+/, '');
  const key = `/src/assets${normalized}`;
  return assets[key]?.default;
}
