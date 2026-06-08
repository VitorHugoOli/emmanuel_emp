# CLAUDE.md — Emmanuel Serviços (Landing Page)

Contexto inicial do projeto para qualquer sessão do Claude Code. **Leia `docs/` antes de trabalhar.**

## O que é

Landing page da **Emmanuel Serviços** (CNPJ 04.778.491/0001-57), empresa de construção civil que:
- Constrói e vende **empreendimentos** próprios (casas e apartamentos) — destaque principal do site.
- Presta **serviços**: Reforma, Consultoria, Construção, Mão de obra e Empréstimo de material.

Cada empreendimento é uma **landing page completa e independente**.

## Documentação (fonte de verdade)

- [`docs/visao-geral.md`](docs/visao-geral.md) — o que é a empresa, o que o site apresenta e como deve funcionar.
- [`docs/estrutura-dados.md`](docs/estrutura-dados.md) — schema padronizado dos empreendimentos e dados globais.
- `docs/design.md` — (a criar) identidade visual, layout e componentes.
- [`docs/dominios.md`](docs/dominios.md) — domínio escolhido (`domanu.com.br`) e levantamento de disponibilidade.

## Decisões já tomadas

- **Framework:** Astro (site estático).
- **Conteúdo:** data-driven — dados padronizados por schema; layout flexível, estrutura estável. Sem CMS.
- **Hospedagem:** Firebase Hosting no início; possível migração futura para Cloudflare Tunnel.
- **Conversão:** WhatsApp (+55 31 98448-4731) com botão flutuante + CTAs; formulário de orçamento.
- **Lançamento:** 1 empreendimento inicial.

## Princípios

- Conteúdo que muda (fotos, preços, mapa, cores, nomes) é **dado**, não código.
- Mobile-first; CTA de WhatsApp sempre acessível.
- Ordem da home: Hero → Empreendimentos → Serviços → Diferenciais → Formulário → Sobre → Rodapé.

## Em aberto

Identidade visual (logo/cores), e-mail/redes sociais, tecnologia do mapa, destino do formulário, dados reais do 1º empreendimento. Ver fim de cada doc em `docs/`. **Domínio definido:** `domanu.com.br` (ver `docs/dominios.md`) — falta registrar no Registro.br.

## Estado atual

Projeto **Astro 5 + Tailwind v4** iniciado. **Home implementada e data-driven** (paleta cozy terracota + areia, tipografia Fraunces/Inter), com paridade visual ao protótipo aprovado.

- **Dados globais:** `src/data/site.ts` (empresa, contato, serviços, diferenciais, hero, sobre).
- **Empreendimentos:** Content Collection em `src/content/empreendimentos/*.yaml`, schema Zod em `src/content.config.ts` (espelha `docs/estrutura-dados.md`). 1 empreendimento de exemplo (`residencial-bela-vista`). Preço "a partir de" é derivado das unidades.
- **Componentes:** `src/components/` (Header, Hero, Empreendimentos, Servicos, Diferenciais, Formulario, Sobre, Footer, WhatsappFloat, Wordmark). Ícones via `astro-icon` + `@iconify-json/lucide` (build-time).
- **Formulário:** redireciona para o WhatsApp (sem backend).
- **Protótipo HTML** original preservado em `docs/prototipo/`.

Comandos: `npm run dev` | `npm run build` | `npm run preview`.

**Próximo:** página de detalhe do empreendimento (hero, plantas, galeria, mapa, tabela de unidades); imagens reais; `og:image`. Nota: o combo Astro 6 + `rolldown-vite` ainda não casa com `@tailwindcss/vite` — manter Astro 5 até estabilizar.
