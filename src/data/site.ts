/**
 * Dados globais do site (fonte única de verdade).
 * Espelha "Dados globais do site" de docs/estrutura-dados.md e adiciona o
 * conteúdo institucional/marketing consumido pela home (hero, diferenciais,
 * sobre). Mudar textos/números aqui = mudar o site, sem mexer em layout.
 */

export const empresa = {
  nome: 'Emmanuel Serviços',
  cnpj: '04.778.491/0001-57',
  whatsapp: '+5531984484731',
  whatsappDisplay: '+55 (31) 98448-4731',
  email: 'contato@emmanuelservicos.com.br',
  instagram: 'emmanuelservicos',
  cidade: 'Minas Gerais',
} as const;

/** Monta uma URL wa.me com mensagem pré-preenchida. */
export function whatsappUrl(mensagem: string): string {
  const numero = empresa.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Hero / destaque principal. */
export const hero = {
  selo: '+20 anos construindo em Minas Gerais',
  tituloAntes: 'Construímos o lugar que você vai chamar de ',
  tituloDestaque: 'lar.',
  subtitulo:
    'Empreendimentos próprios, reformas e construção com a seriedade de quem entende de obra — e o cuidado de quem entende de família. Da fundação à chave na mão.',
  ctaPrimario: 'Conheça nossos empreendimentos',
  msgWhatsapp: 'Olá! Gostaria de falar com a Emmanuel Serviços.',
  miniProvas: [
    { icone: 'shield-check', texto: 'Obra com garantia' },
    { icone: 'map-pin', texto: 'Minas Gerais' },
    { icone: 'handshake', texto: 'Atendimento próximo' },
  ],
  destaqueNumero: { valor: '300+', texto: 'famílias morando\nem obras nossas' },
} as const;

/** Os 5 serviços prestados (ver docs/visao-geral.md §4). */
export const servicos = [
  {
    slug: 'reforma',
    nome: 'Reforma',
    icone: 'paint-roller',
    descricao: 'Renove ambientes com qualidade e prazo cumprido — do reparo simples à reforma completa.',
  },
  {
    slug: 'consultoria',
    nome: 'Consultoria',
    icone: 'clipboard-list',
    descricao: 'Orientação técnica para planejar, orçar e evitar surpresas na sua obra ou investimento.',
  },
  {
    slug: 'construcao',
    nome: 'Construção',
    icone: 'building-2',
    descricao: 'Construímos do zero com projeto, fundação e acabamento — sua casa do jeito que você sonhou.',
  },
  {
    slug: 'mao-de-obra',
    nome: 'Mão de obra',
    icone: 'users',
    descricao: 'Equipe qualificada e de confiança para a sua obra, com produtividade e segurança.',
  },
  {
    slug: 'emprestimo-material',
    nome: 'Empréstimo de material',
    icone: 'package',
    descricao: 'Escoras, andaimes, formas e equipamentos disponíveis para locação durante a sua obra.',
  },
] as const;

/** Diferenciais — números e pilares de confiança. */
export const diferenciais = {
  numeros: [
    { icone: 'calendar-clock', valor: '+20', label: 'anos de atuação em MG' },
    { icone: 'key-round', valor: '150+', label: 'obras entregues' },
    { icone: 'heart-handshake', valor: '300+', label: 'famílias atendidas' },
    { icone: 'star', valor: '98%', label: 'clientes satisfeitos' },
  ],
  pilares: [
    { icone: 'badge-check', titulo: 'Obra com garantia', texto: 'e contrato claro do início ao fim.' },
    { icone: 'clock', titulo: 'Prazos cumpridos', texto: 'com cronograma acompanhado de perto.' },
    { icone: 'phone-call', titulo: 'Atendimento direto', texto: 'com quem realmente decide.' },
  ],
} as const;

/** Tipos de interesse do formulário de orçamento. */
export const tiposInteresse = [
  'Empreendimento',
  'Reforma',
  'Consultoria',
  'Construção',
  'Mão de obra',
  'Empréstimo de material',
] as const;

/** Sobre (institucional). */
export const sobre = {
  titulo: 'Há mais de 20 anos construindo lares em Minas',
  paragrafos: [
    'A Emmanuel Serviços nasceu do desejo de fazer construção de um jeito diferente: com transparência, capricho e um atendimento que trata cada cliente como gente — não como número. Crescemos pelo boca a boca de quem confiou na gente e indicou.',
    'Hoje unimos a experiência de obra a empreendimentos próprios, sempre com o mesmo compromisso: entregar um lugar que a família tenha orgulho de chamar de lar.',
  ],
  valores: [
    { icone: 'gem', titulo: 'Qualidade', texto: 'em cada detalhe da obra.' },
    { icone: 'eye', titulo: 'Transparência', texto: 'do orçamento à entrega.' },
    { icone: 'home', titulo: 'Proximidade', texto: 'do começo ao fim.' },
  ],
} as const;
