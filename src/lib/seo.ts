/**
 * Camada de SEO centralizada e *data-driven*.
 *
 * Princípio: os dados estruturados (JSON-LD) são DERIVADOS dos dados que o site
 * já possui (`empresa`, schema dos empreendimentos). Uma nova landing page de
 * empreendimento ganha SEO completo só de existir o YAML — nada de marcação
 * manual por página. O bloco `seo` do YAML serve apenas como override de
 * título/descrição/imagem.
 *
 * Referências de melhores práticas (2026):
 * - Imóveis não têm rich result próprio no Google; o caminho que gera rich
 *   result com preço/disponibilidade é `Product` + `AggregateOffer`.
 *   (https://developers.google.com/search/docs/appearance/structured-data/product-snippet)
 * - Construção civil: usar o tipo mais específico `GeneralContractor`
 *   (subtipo de LocalBusiness), com address, geo, telephone (E.164),
 *   areaServed e CNPJ via `identifier`/`PropertyValue`.
 */
import { empresa } from '../data/site';
import { precoAPartir, tipoPlural } from './empreendimento';
import { img } from './images';

/**
 * URL canônica do site — fonte única de verdade: o `site` de astro.config.mjs,
 * exposto pelo Astro como `import.meta.env.SITE`. NUNCA hardcode o domínio aqui;
 * assim o build temporário (SITE_URL=...) e o oficial geram URLs coerentes.
 */
export const SITE = (import.meta.env.SITE ?? 'https://domanu.com.br').replace(/\/$/, '');

/** Converte um caminho de raiz em URL absoluta. */
export const abs = (path: string): string => new URL(path, SITE).toString();

/** URL canônica (com barra final) de uma página de empreendimento. */
const empreendimentoUrl = (slug: string): string => abs(`/empreendimentos/${slug}/`);

const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

const AVAILABILITY = {
  disponivel: 'https://schema.org/InStock',
  reservado: 'https://schema.org/LimitedAvailability',
  vendido: 'https://schema.org/SoldOut',
} as const;

/**
 * Negócio local de construção civil — presente em TODAS as páginas.
 * `@id` estável permite que produtos referenciem o vendedor por @id.
 */
export function organizationLd() {
  return {
    '@type': 'GeneralContractor',
    '@id': ORG_ID,
    name: empresa.nome,
    url: SITE,
    image: abs('/og/home.png'),
    logo: abs('/og/home.png'),
    telephone: empresa.whatsapp,
    email: empresa.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'State', name: 'Minas Gerais' },
    sameAs: [
      `https://www.instagram.com/${empresa.instagram}`,
      `https://wa.me/${empresa.whatsapp.replace(/\D/g, '')}`,
    ],
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CNPJ',
      value: empresa.cnpj,
    },
  };
}

/** WebSite — ajuda o Google a entender o site e o nome do site nos resultados. */
export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: empresa.nome,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  };
}

type Empreendimento = {
  nome: string;
  tipo: 'casa' | 'apartamento';
  chamada: string;
  descricao: string;
  galeria: { src: string; alt: string }[];
  localizacao: {
    endereco: string;
    bairro?: string;
    cidade?: string;
    lat?: number;
    lng?: number;
  };
  unidades: { preco: number | null; status: 'disponivel' | 'reservado' | 'vendido' }[];
  seo?: { titulo?: string; descricao?: string; imagem?: string };
};

/**
 * Empreendimento como `Product` + `AggregateOffer` (rich result de preço).
 * Tudo derivado de `unidades`/`localizacao` — zero marcação manual.
 */
export function empreendimentoLd(d: Empreendimento, slug: string, ogImage: string) {
  const pageUrl = empreendimentoUrl(slug);
  const precos = d.unidades.map((u) => u.preco).filter((p): p is number => p != null);
  const low = precoAPartir(d.unidades);
  const high = precos.length ? Math.max(...precos) : null;

  const availability =
    d.unidades.some((u) => u.status === 'disponivel')
      ? AVAILABILITY.disponivel
      : d.unidades.some((u) => u.status === 'reservado')
        ? AVAILABILITY.reservado
        : AVAILABILITY.vendido;

  // Resolve galeria para a URL final servida pelo astro:assets (hashed .webp);
  // descarta imagens não encontradas para nunca emitir link morto.
  const galeriaUrls = d.galeria
    .map((g) => img(g.src)?.src)
    .filter((s): s is string => Boolean(s))
    .map((s) => abs(s));

  const product: Record<string, unknown> = {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: d.nome,
    description: d.seo?.descricao ?? d.chamada,
    url: pageUrl,
    image: [ogImage, ...galeriaUrls],
    category: tipoPlural[d.tipo] ?? d.tipo,
    brand: { '@type': 'Organization', name: empresa.nome, '@id': ORG_ID },
  };

  if (precos.length) {
    product.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'BRL',
      lowPrice: low,
      highPrice: high,
      offerCount: d.unidades.length,
      availability,
      seller: { '@id': ORG_ID },
    };
  }

  return product;
}

/**
 * Reforço semântico do imóvel (sem rich result, mas útil para agregadores/LLMs):
 * tipo, endereço e geolocalização.
 */
export function residenceLd(d: Empreendimento, slug: string) {
  const node: Record<string, unknown> = {
    '@type': d.tipo === 'apartamento' ? 'ApartmentComplex' : 'House',
    '@id': `${empreendimentoUrl(slug)}#place`,
    name: d.nome,
    address: {
      '@type': 'PostalAddress',
      streetAddress: d.localizacao.endereco,
      addressLocality: (d.localizacao.cidade ?? 'Belo Horizonte').split('/')[0].trim(),
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
  };
  if (d.localizacao.lat != null && d.localizacao.lng != null) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: d.localizacao.lat,
      longitude: d.localizacao.lng,
    };
  }
  return node;
}

/** Trilha de navegação (BreadcrumbList). */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

/**
 * Empacota nós num grafo `@graph` único com `@context`. BaseLayout serializa
 * isso num único `<script type="application/ld+json">`.
 */
export function jsonLdGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
