# Prompt — Logo da Emmanuel Serviços (para o Claude design)

> Cole o bloco abaixo no Claude (claude.ai) para gerar **conceitos de logo** como um único artifact HTML com SVGs limpos e editáveis. O objetivo é explorar direções; depois escolhemos uma e refinamos.

---

## PROMPT (copiar a partir daqui)

Você é um designer de identidade visual sênior. Crie **conceitos de logo** para uma empresa de construção civil, entregues como **um único arquivo HTML autocontido** que exibe cada conceito em **SVG inline** (vetor limpo, editável, com `currentColor` onde fizer sentido). Organize numa "folha de marca" visual fácil de comparar.

### A marca — dois nomes que precisam conversar
- **Nome oficial / jurídico (CNPJ):** **Emmanuel Serviços** — empresa de construção civil em Minas Gerais que constrói e vende empreendimentos próprios (casas e apartamentos) e presta serviços (reforma, consultoria, construção, mão de obra, empréstimo de material). Passa **credibilidade e tradição**.
- **Nome do domínio / marca curta:** **domanu** (`domanu.com.br`). É a fusão de **domus** (casa/lar, em latim) + **Manu** (apelido de Emmanuel). Curto, fácil de falar, carrega o sentido de **casa/lar** — central para o ramo.
- A identidade deve **honrar os dois**: o nome oficial dá peso institucional; "domanu" / a ideia de *casa-lar* dá o conceito e o símbolo.

### Conceito a transmitir
Tom **confiável e familiar** ("construímos o lar que você sonha") — sério, mas próximo e acolhedor ("cozy", aconchego de lar). Evite clichês frios de construtora (capacete, guindaste, prédio corporativo genérico). Prefira o universo **casa / lar / telhado / porta / chave / abrigo**, com calor humano.

### Direções a explorar (entregue conceitos para AS DUAS)
1. **Direção A — Emmanuel Serviços em destaque:** wordmark "Emmanuel Serviços" como protagonista + um **símbolo/monograma** inspirado em casa/lar (ex.: telhado, porta, a letra **"E"** ou **"M"** construída como casa). "domanu" pode aparecer discretamente (ex.: associado ao endereço do site).
2. **Direção B — domanu como marca, Emmanuel Serviços como descritor:** "domanu" como wordmark principal (explorando o **"o"** como uma porta/janela/casa, ou o conjunto formando um telhado), com "Emmanuel Serviços" / "Construção e empreendimentos" como linha descritora menor abaixo.

Para cada direção, mostre: **(a)** versão horizontal (símbolo + texto), **(b)** versão empilhada/centralizada, **(c)** **símbolo isolado** (que funcione como favicon/ícone de app em 32×32), **(d)** versão **monocromática** (1 cor) para carimbo/fundo escuro.

### Identidade visual (seguir — é a mesma do site já existente)
**Paleta quente/aconchegante:**
- Terracota (primária): `#B5532E` · Terracota escura: `#8E3F22`
- Areia/creme (fundo): `#F5EDE2` · Verde-oliva (apoio): `#6B7548`
- Âmbar (realce, com parcimônia): `#E0A458` · Marrom quase-preto (texto): `#2B2420`

**Tipografia (Google Fonts, carregue no HTML):**
- **Fraunces** (serif humanista, quente) para o wordmark/títulos.
- **Inter** para linha descritora/tagline.
(Pode testar o wordmark em Fraunces; se propuser outra fonte para o nome, justifique e mantenha algo seguro e legível.)

**Estilo do símbolo:** geométrico mas acolhedor — cantos levemente arredondados, traço de peso consistente, sem degradês pesados. Deve ler bem **pequeno** (favicon) e **grande** (fachada/placa de obra). Referência atual do site: um ícone simples de **telhado/casa** em linha, terracota — pode evoluir a partir dele ou propor algo melhor.

### Requisitos de entrega
- Um único arquivo `.html`, fundo neutro, cada conceito num "card" rotulado (Direção A / B, e a, b, c, d).
- Mostre cada lockup **sobre fundo claro (areia) E sobre fundo escuro (#2B2420)** para validar contraste.
- SVGs limpos (sem rasterizar texto quando possível; se converter o wordmark em path, diga).
- Inclua uma faixa com o **símbolo isolado em 32×32 e 16×16** para provar legibilidade em tamanho de favicon.
- Ao final, um resumo curto: o raciocínio de cada direção, qual você recomendaria e por quê, e o que ficou em aberto para decisão.

Não invente slogan novo nem dados da empresa além dos fornecidos. Se precisar de texto de apoio, use "Construção e empreendimentos · Minas Gerais".

## (fim do prompt)
