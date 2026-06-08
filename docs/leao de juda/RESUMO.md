# Residencial Leão de Judá — Resumo & Estrutura

> Documento-fonte do empreendimento **Leão de Judá** e mapa de tudo que o site usa.
> A landing page é **data-driven**: o conteúdo abaixo vive em arquivos de dados; o layout consome.

---

## 1. O empreendimento (resumo)

- **Nome:** Residencial Leão de Judá (Condomínio)
- **Construtora:** Emmanuel Serviços
- **Tipo:** Apartamentos (3 quartos) + Coberturas
- **Status:** Em construção — Conclusão **maio/2026**, entrega das chaves **julho/2026** (+90 dias)
- **Endereço:** R. Luís Dias, 84 — Glória, Belo Horizonte/MG, 30880-070 (esquina com R. Martim Afonso de Souza)
- **Pitch:** Arquitetura de vanguarda, 100% revestido, **apenas 2 apartamentos por andar**.

**Apartamento tipo (63 m²):** 3 quartos (1 suíte), 2 banheiros, sala estar/jantar, cozinha americana espaçosa, água individualizada, ponto para ar-condicionado, 1 vaga privativa.
**Cobertura (126 m²):** 3 quartos, 3 banheiros, 2 vagas, lavabo, ambiente ao ar livre.
**Prédio:** elevador para 8 pessoas, porcelanato de 1ª linha, bancadas em granito, 4 pavimentos + cobertura.

### Tabela de unidades (Tabela de Vendas — Novembro)

| Unidade | Área | Suíte | Entrada (2×) | Financiamento 80% | Valor total | Status |
|---|---|---|---|---|---|---|
| 101 | 82,72 m² | Sim | 2× R$ 65.500 | R$ 524.000 | **R$ 655.000** | Disponível |
| 102 | 63 m² | Sim | — | — | — (interno: R$ 678.000) | Vendido |
| 201 | 63 m² | Sim | 2× R$ 52.500 | R$ 420.000 | **R$ 525.000** | Disponível |
| 202 | 63 m² | Sim | 2× R$ 52.500 | R$ 420.000 | **R$ 525.000** | Disponível |
| 301 | 63 m² | Sim | 2× R$ 52.000 | R$ 416.000 | **R$ 520.000** | Disponível |
| 302 | 63 m² | Sim | 2× R$ 52.000 | R$ 416.000 | **R$ 520.000** | Disponível |
| 401 | 63 m² | Sim | — | — | — | Vendido |
| 402 (Cobertura) | 126 m² | Sim | 2× R$ 75.700 | R$ 605.600 | **R$ 757.000** | Disponível |

*A partir de **R$ 520.000**. Entrega das chaves na assinatura do financiamento; entrada com opção de parcelamento.*
*Preços atualizados em 07/06/2026 (solicitação de Vinicius Oliveira). O valor do apto 102 (R$ 678.000) é correção interna de planilha de custos — não exibido no site (unidade vendida).*

### Localização — pontos de interesse (do flyer)
Mart Minas, EPA Supermercados, Villefort Atacarejo, Feira Minas, Laboratório Hermes Pardini, Fit One Academia, Região da Pampulha, acesso ao Centro e a Contagem.

### Identidade visual (marca do empreendimento)
- **Logo:** leão dourado + "Leão de Judá" (azul-marinho serifado).
- **Cores:** primária navy `#173A5E`, secundária dourado `#B0883E`, fundos creme.
- Aplicada via o campo `tema` do schema (sobrescreve o tema global terracota da Emmanuel).

---

## 2. Estrutura no projeto (o que o site usa)

| Item | Caminho |
|---|---|
| **Dados do empreendimento** | `src/content/empreendimentos/leao-de-juda.yaml` |
| **Schema (Zod)** | `src/content.config.ts` |
| **Página de detalhe (genérica)** | `src/pages/empreendimentos/[slug].astro` → `/empreendimentos/leao-de-juda` |
| **Helpers (formatação/mapa)** | `src/lib/empreendimento.ts` |
| **Imagens (públicas)** | `public/empreendimentos/leao-de-juda/` |
| **Material original** | `docs/leao de juda/` (flyer PDF, tabela, logo) |

### Imagens geradas (`public/empreendimentos/leao-de-juda/`)
- `fachada.jpg` — render da fachada (capa/hero e card da home)
- `planta-1-pavimento.jpg`, `planta-2-3-pavimento.jpg`, `planta-4-pavimento.jpg`, `planta-cobertura.jpg`
- `localizacao.jpg` — mapa anotado do flyer (não usado na página: o mapa é Google embed; mantido como referência)
- `logo.jpg` — logo Leão de Judá (usado no header da página)

### Seções da página de detalhe
1. Header fixo (logo + navegação + CTA WhatsApp + voltar à Emmanuel)
2. Hero/capa (render, status, chamada, specs rápidas, CTAs, previsão de entrega)
3. O empreendimento (descrição + grade de características)
4. Plantas (4 plantas, clique para ampliar)
5. Localização (Google Maps embutido + pontos de interesse + "Como chegar")
6. Unidades (tabela completa com valores, plano de pagamento e status)
7. CTA final + rodapé (realização Emmanuel) + WhatsApp flutuante

### Integração com a home
O Leão de Judá é o empreendimento **em destaque** (`destaque: true`); o card da home mostra a fachada e leva à página. O exemplo fictício "Bela Vista" foi removido.

---

## 3. O que ainda precisamos (pendências)

- [ ] **Fotos internas reais** (apartamento decorado, áreas comuns, hall, elevador) — hoje só há o render da fachada.
- [ ] **`og:image` dedicada** (imagem 1200×630 para compartilhamento) — hoje usa a `fachada.jpg`.
- [ ] **Coordenadas exatas** (lat/lng) — as atuais são aproximadas (o mapa Google usa o endereço, então já aponta certo).
- [ ] **Distâncias dos pontos de interesse** (ex.: "Mart Minas a 600 m") — schema já suporta o campo `distancia`.
- [ ] **Confirmar tabela de vendas vigente** (a atual é de "Novembro") e política de exibição de preços.
- [ ] **Memorial descritivo / itens de acabamento** detalhados, se houver.
- [ ] **Vídeo ou tour 360°**, se disponível.
- [ ] **Redes sociais/Instagram do empreendimento**, se houver.

---

## 4. Como editar

Tudo do empreendimento está em **`src/content/empreendimentos/leao-de-juda.yaml`** — trocar preços, status de unidades, características, pontos de interesse e até as cores da marca (`tema`) é editar esse arquivo. Adicionar fotos: colocar em `public/empreendimentos/leao-de-juda/` e referenciar em `galeria`. Rodar `npm run build` valida os dados pelo schema automaticamente.
