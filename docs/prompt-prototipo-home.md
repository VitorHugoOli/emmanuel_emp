# Prompt — Protótipo de alta fidelidade (Home) — Emmanuel Serviços

> Cole o bloco abaixo no Claude (claude.ai) para gerar o protótipo da **página inicial** como um único arquivo HTML autocontido (Tailwind via CDN + Google Fonts). É só protótipo visual — sem backend, sem páginas de empreendimento. Depois o Claude Code refina e migra para Astro.

---

## PROMPT (copiar a partir daqui)

Você é um designer de produto sênior. Quero um **protótipo de alta fidelidade da página INICIAL** de uma landing page, entregue como **um único arquivo HTML autocontido**, usando **Tailwind via CDN** e **Google Fonts**. Sem build, sem frameworks JS — apenas HTML + Tailwind + um mínimo de JS vanilla para o menu mobile e o carrossel/galeria. Deve abrir direto no navegador.

### A empresa
**Emmanuel Serviços** — construção civil em Minas Gerais. Atua em duas frentes: (1) constrói e **vende empreendimentos próprios** (casas e apartamentos) — esse é o destaque do site; (2) presta **serviços**: Reforma, Consultoria, Construção, Mão de obra e Empréstimo de material.
- WhatsApp / telefone: **+55 (31) 98449-4731**
- CNPJ: 04.778.491/0001-57
- Não há logo — use um **wordmark tipográfico** "Emmanuel Serviços" (pode ter um detalhe sutil, ex. um traço/ícone simples de telhado/casa em terracota).

### Objetivo e tom
Objetivo nº 1: **vender empreendimentos**. Objetivo nº 2: **gerar contato por WhatsApp** (botão flutuante sempre visível + CTAs). Tom da marca: **confiável e familiar** — empresa séria, mas próxima e acolhedora ("construímos o lar que você sonha"). Textos em **português do Brasil**. Pode usar conteúdo fictício realista (placeholders) onde faltar informação.

### Identidade visual (seguir à risca)
**Paleta quente/aconchegante ("cozy", lembrar casa):**
- Primária (terracota): `#B5532E`
- Primária escura (hover/realce): `#8E3F22`
- Fundo principal (areia/creme): `#F5EDE2`
- Fundo alternativo de seção (areia mais clara): `#FBF6EE`
- Apoio (verde-oliva): `#6B7548`
- Destaque (âmbar — usar com parcimônia em selos/realces): `#E0A458`
- Texto principal (marrom quase preto): `#2B2420`
- Texto secundário: `#6E6258`
- Bordas/linhas sutis: `#E3D5C3`

**Tipografia (Google Fonts):**
- Títulos / headings: **Fraunces** (serif humanista, quente, editorial) — pesos 500–700. Pode usar `font-optical-sizing`.
- Corpo / UI: **Inter** — pesos 400–600.

**Estilo visual:** acolhedor e moderno. Cantos arredondados generosos (`rounded-2xl`/`rounded-3xl`), sombras suaves e quentes (nada de sombra azulada dura), bastante respiro/whitespace, fotos grandes com cantos arredondados. Use imagens placeholder (Unsplash de casas/construção/interiores aconchegantes, ou blocos com cor sólida da paleta + ícone). Ícones: usar [Lucide](https://lucide.dev) via `<i data-lucide="...">` com o script CDN, ou SVG inline.

### Layout
**Mobile-first** (a maioria dos acessos é celular), mas com versão desktop bem resolvida. Header fixo com wordmark à esquerda, navegação âncora no centro/direita e um botão WhatsApp. Menu hamburguer no mobile. **Botão flutuante de WhatsApp** fixo no canto inferior direito em todas as resoluções (ícone WhatsApp, cor verde do WhatsApp ou terracota).

### Seções da home — NESTA ORDEM
1. **Hero / Destaque** — chamada principal forte (ex.: "Construímos o lugar que você vai chamar de lar"), subtítulo curto, 2 CTAs (primário "Conheça nossos empreendimentos", secundário "Falar no WhatsApp"). Imagem grande de fachada/empreendimento. Pode ter um selo discreto ("+20 anos construindo em MG" — placeholder).
2. **Empreendimentos** — no lançamento há **1 empreendimento em destaque**. Mostre um **card grande/destaque** (foto, nome, tipo, status "Em construção", 3–4 características rápidas, faixa de preço "a partir de R$ ...", botão "Ver empreendimento"). Deixe espaço/grid preparado para mais cards no futuro.
3. **Serviços prestados** — grid com os **5 serviços** (Reforma, Consultoria, Construção, Mão de obra, Empréstimo de material), cada um com ícone, título, descrição curta e um CTA "Pedir orçamento" (WhatsApp).
4. **Por que a Emmanuel / Diferenciais** — 3 a 4 provas de confiança com números (ex.: anos de atuação, obras entregues, famílias atendidas — placeholders) e ícones.
5. **Formulário de orçamento / contato** — campos: nome, telefone/WhatsApp, tipo de interesse (select: Empreendimento / Reforma / Consultoria / Construção / Mão de obra / Empréstimo de material), mensagem. Botão "Enviar pedido". (Só visual, sem backend.)
6. **Sobre (institucional)** — história e valores curtos, transmitindo credibilidade e proximidade. Pode ter foto da equipe/obra.
7. **Rodapé** — wordmark, contato (WhatsApp, e-mail placeholder), redes sociais placeholder (Instagram), CNPJ, links de âncora, ano.

### Requisitos técnicos do protótipo
- Um único arquivo `.html` autocontido.
- Todos os links de WhatsApp apontando para `https://wa.me/5531984494731?text=...` com mensagem pré-preenchida coerente com o contexto do botão.
- Navegação por âncoras com scroll suave.
- Acessível: contraste adequado, `alt` nas imagens, foco visível, tags semânticas.
- Responsivo de verdade (testar mental nos breakpoints sm/md/lg).
- Comentários no HTML separando cada seção.

Entregue o arquivo completo e, no fim, um resumo curto das decisões de design que tomou e do que ficou como placeholder para eu preencher depois.

## (fim do prompt)
