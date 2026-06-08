/**
 * Imagens Open Graph (1200×630) desenhadas em build-time com Satori + resvg.
 *
 * Card de empreendimento: logo, badge de status, nome, localização, chips de
 * highlights e preço inicial em destaque. Card da home: marca + tagline + chips
 * de serviços. Tudo derivado dos dados (YAML / site.ts) — expansível.
 *
 * URLs geradas: /og/home.png e /og/<slug>.png
 */
import type { APIContext } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import { empresa, hero, servicos } from '../../data/site';
import { brl, precoAPartir, statusInfo } from '../../lib/empreendimento';

// Lê a partir da raiz do projeto: no build, este módulo é empacotado em dist/,
// então caminhos relativos a import.meta.url não acham src/assets.
const ASSETS = join(process.cwd(), 'src/assets');

// --- Fontes estáticas (WOFF; Satori não lê fontes variáveis nem WOFF2) ---
const fontInter400 = readFileSync(join(ASSETS, 'fonts/Inter-400.woff'));
const fontInter700 = readFileSync(join(ASSETS, 'fonts/Inter-700.woff'));
const fontFraunces600 = readFileSync(join(ASSETS, 'fonts/Fraunces-600.woff'));

const CREAM = '#F3EDE2';
const TERRACOTA = '#B5532E';

/** Lê uma imagem de src/assets e devolve data URI (para <img> do Satori). */
function dataUri(path?: string): string | undefined {
  if (!path) return undefined;
  try {
    const buf = readFileSync(join(ASSETS, path));
    // Detecta o formato pelos magic bytes — a extensão pode mentir
    // (ex.: arquivos .jpg que na verdade são PNG).
    const mime =
      buf[0] === 0x89 && buf[1] === 0x50
        ? 'image/png'
        : buf[0] === 0x52 && buf[1] === 0x49
          ? 'image/webp'
          : 'image/jpeg';
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch {
    return undefined;
  }
}

/** Escurece um hex por um fator (0–1) para o gradiente do fundo. */
function darken(hex: string, factor: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.round(((n >> 16) & 255) * factor);
  const g = Math.round(((n >> 8) & 255) * factor);
  const b = Math.round((n & 255) * factor);
  return `rgb(${r},${g},${b})`;
}

/** Hyperscript mínimo no formato de elemento que o Satori entende. */
const h = (type: string, props: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { ...props, ...(children !== undefined ? { children } : {}) },
});

type OgProps =
  | { kind: 'home' }
  | {
      kind: 'empreendimento';
      nome: string;
      status: string | null;
      local: string;
      highlights: string[];
      preco: string | null;
      primary: string;
      gold: string;
      logo?: string;
    };

export async function getStaticPaths() {
  const empreendimentos = await getCollection('empreendimentos');

  const paths: { params: { name: string }; props: OgProps }[] = [
    { params: { name: 'home' }, props: { kind: 'home' } },
  ];

  for (const e of empreendimentos) {
    const d = e.data;
    const precoNum = precoAPartir(d.unidades);
    paths.push({
      params: { name: e.id },
      props: {
        kind: 'empreendimento',
        nome: d.nome,
        status: statusInfo[d.status]?.label ?? null,
        local: [d.localizacao.bairro, d.localizacao.cidade].filter(Boolean).join(' · '),
        highlights: d.caracteristicas.slice(0, 4).map((c) => c.texto),
        preco: precoNum != null ? brl.format(precoNum) : null,
        primary: d.tema?.cor_primaria ?? '#173A5E',
        gold: d.tema?.cor_secundaria ?? '#B0883E',
        logo: dataUri(d.tema?.logo),
      },
    });
  }

  return paths;
}

/** Monta a árvore de elementos do card conforme o tipo de página. */
function buildTree(props: OgProps) {
  if (props.kind === 'home') {
    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundImage: `linear-gradient(135deg, ${TERRACOTA}, ${darken(TERRACOTA, 0.62)})`,
          fontFamily: 'Inter',
          color: '#FFFFFF',
        },
      },
      [
        h('div', { style: { fontFamily: 'Fraunces', fontSize: 84, lineHeight: 1.05 } }, empresa.nome),
        h(
          'div',
          { style: { fontSize: 32, lineHeight: 1.4, marginTop: 24, color: CREAM, maxWidth: '900px' } },
          hero.subtitulo
        ),
        h(
          'div',
          { style: { display: 'flex', gap: '14px', marginTop: 40, flexWrap: 'wrap' } },
          servicos.slice(0, 5).map((s) =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  fontSize: 24,
                  padding: '10px 20px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.28)',
                },
              },
              s.nome
            )
          )
        ),
      ]
    );
  }

  const p = props;
  // Topo: logo (ou marca) à esquerda + badge de status à direita
  const topo = h(
    'div',
    { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
    [
      p.logo
        ? h('img', { src: p.logo, width: 140, height: 72, style: { borderRadius: 12, objectFit: 'contain' } })
        : h('div', { style: { fontFamily: 'Fraunces', fontSize: 32, color: '#FFFFFF' } }, empresa.nome),
      p.status
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: 24,
                fontWeight: 700,
                padding: '10px 22px',
                borderRadius: 999,
                backgroundColor: p.gold,
                color: '#1B2A3A',
              },
            },
            p.status
          )
        : h('div', {}, ''),
    ]
  );

  // Meio: nome + localização
  const meio = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' } },
    [
      h('div', { style: { fontFamily: 'Fraunces', fontSize: 68, lineHeight: 1.04, maxWidth: '1000px' } }, p.nome),
      p.local
        ? h('div', { style: { fontSize: 30, marginTop: 12, color: CREAM } }, p.local)
        : h('div', {}, ''),
      h(
        'div',
        { style: { display: 'flex', gap: '14px', marginTop: 32, flexWrap: 'wrap' } },
        p.highlights.map((t) =>
          h(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: 25,
                padding: '10px 20px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.28)',
              },
            },
            t
          )
        )
      ),
    ]
  );

  // Base: preço à esquerda + marca à direita
  const base = h(
    'div',
    { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
    [
      p.preco
        ? h('div', { style: { display: 'flex', flexDirection: 'column' } }, [
            h('div', { style: { fontSize: 24, color: CREAM, opacity: 0.85 } }, 'A partir de'),
            h('div', { style: { fontFamily: 'Fraunces', fontSize: 56, color: p.gold, lineHeight: 1.1 } }, p.preco),
          ])
        : h('div', {}, ''),
      h('div', { style: { fontSize: 24, color: CREAM, opacity: 0.85 } }, `por ${empresa.nome}`),
    ]
  );

  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '70px',
        backgroundImage: `linear-gradient(135deg, ${p.primary}, ${darken(p.primary, 0.62)})`,
        fontFamily: 'Inter',
        color: '#FFFFFF',
      },
    },
    [topo, meio, base]
  );
}

export async function GET({ props }: APIContext) {
  const svg = await satori(buildTree(props as OgProps) as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fontInter400, weight: 400, style: 'normal' },
      { name: 'Inter', data: fontInter700, weight: 700, style: 'normal' },
      { name: 'Fraunces', data: fontFraunces600, weight: 600, style: 'normal' },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
