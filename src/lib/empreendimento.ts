/** Helpers compartilhados para exibição de empreendimentos. */

export const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

/** Formata número como m² no padrão pt-BR (vírgula decimal). */
export function m2(area: number): string {
  return `${area.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`;
}

/** Menor preço entre as unidades com valor definido (ou null). */
export function precoAPartir(unidades: { preco: number | null }[]): number | null {
  const precos = unidades.map((u) => u.preco).filter((p): p is number => p != null);
  return precos.length ? Math.min(...precos) : null;
}

export const tipoPlural: Record<string, string> = {
  casa: 'Casas',
  apartamento: 'Apartamentos',
};

export const statusInfo: Record<string, { label: string; icone: string }> = {
  lancamento: { label: 'Lançamento', icone: 'sparkles' },
  em_construcao: { label: 'Em construção', icone: 'hard-hat' },
  entregue: { label: 'Pronto para morar', icone: 'key-round' },
};

export const statusUnidade: Record<string, { label: string; classe: string }> = {
  disponivel: { label: 'Disponível', classe: 'disponivel' },
  reservado: { label: 'Reservado', classe: 'reservado' },
  vendido: { label: 'Vendido', classe: 'vendido' },
};

/** Ícone (lucide) por categoria de ponto de interesse. */
export const iconePontoInteresse: Record<string, string> = {
  educacao: 'graduation-cap',
  saude: 'heart-pulse',
  compras: 'shopping-cart',
  transporte: 'bus',
  lazer: 'trees',
};

/** Constrói a URL de embed do Google Maps a partir de um endereço (sem API key). */
export function mapsEmbedUrl(endereco: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`;
}

/** Constrói a URL "como chegar" do Google Maps. */
export function mapsDirectionsUrl(endereco: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}
