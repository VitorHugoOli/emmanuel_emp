# Emmanuel Serviços — Documento de Visão Geral

> Documento descritivo do projeto da landing page. Define **o que é a empresa**, **o que será apresentado** e **como o site deve funcionar**. É a fonte de verdade do produto; decisões de layout/visual ficam no documento de design (a ser criado).

---

## 1. A empresa

**Emmanuel Serviços**
- **CNPJ:** 04.778.491/0001-57
- **Telefone / WhatsApp:** +55 (31) 98449-4731
- **Ramo:** Construção civil e serviços relacionados — constrói e vende empreendimentos (casas e prédios de apartamentos) e presta serviços para terceiros.

A empresa atua em duas frentes:
1. **Empreendimentos próprios** — imóveis que a Emmanuel constrói e vende (casas e apartamentos).
2. **Serviços prestados** — trabalhos contratados por clientes.

---

## 2. Objetivos da landing page

Em ordem de prioridade:

1. **Vender imóveis/empreendimentos** — destaque principal do site.
2. **Gerar contato via WhatsApp** — botão flutuante + CTAs em todas as páginas, levando direto para conversa.
3. **Captar pedidos de orçamento** — formulário para serviços e empreendimentos.
4. **Apresentação institucional (Sobre)** — passar credibilidade. Vem **por último** na navegação.

**Métrica de sucesso:** número de contatos qualificados (cliques no WhatsApp + envios de formulário).

---

## 3. Estrutura do site

### 3.1 Página inicial (Home)
Ordem das seções:

1. **Hero / Destaque** — chamada principal + empreendimento atual em evidência + CTA WhatsApp.
2. **Empreendimentos** — listagem dos empreendimentos (no lançamento: **1 empreendimento**). Cada card leva para a página completa do empreendimento.
3. **Serviços prestados** — os 5 serviços (ver seção 4), cada um com descrição curta e CTA de orçamento/WhatsApp.
4. **Por que a Emmanuel / Diferenciais** — provas de confiança (anos de atuação, obras entregues, etc.).
5. **Formulário de orçamento / contato.**
6. **Sobre (institucional)** — história e valores da empresa.
7. **Rodapé** — contato, WhatsApp, e-mail e redes sociais (a definir), CNPJ.

### 3.2 Página de empreendimento (uma por empreendimento)
Cada empreendimento é uma **landing page completa e independente**, gerada a partir de uma estrutura de dados padronizada (ver `estrutura-dados.md`). Seções:

1. **Capa / Hero** — nome, tipo (casa ou apartamento), status da obra, chamada e CTA WhatsApp.
2. **Descrição do imóvel** — texto descritivo + principais características.
3. **Plantas** — plantas baixas (imagens), por tipo de unidade.
4. **Galeria de fotos** — fotos da obra/empreendimento.
5. **Localização (mapa)** — mapa com o empreendimento e **pontos de interesse marcados com distância** (ex.: escola a 500 m, supermercado a 1 km).
6. **Tabela de unidades / preços** — unidades disponíveis, plantas, valores e disponibilidade.
7. **CTA de WhatsApp** — para tirar dúvidas ou fechar negócio (presente ao longo da página).

### 3.3 Tipos de empreendimento
- **Casa** — imóvel residencial unifamiliar.
- **Apartamento** — unidade em prédio construído pela empresa.

A estrutura de dados deve acomodar os dois tipos com os mesmos campos base, variando apenas onde necessário.

---

## 4. Serviços prestados

Cada serviço terá descrição e CTA (orçamento/WhatsApp). Podem virar seções na home e, futuramente, páginas próprias.

1. **Reforma**
2. **Consultoria**
3. **Construção**
4. **Mão de obra**
5. **Empréstimo de material**

---

## 5. Como o site deve funcionar (princípios)

- **Data-driven:** o conteúdo dos empreendimentos vive em arquivos de dados padronizados (schema). O **layout consome os dados** — trocar fotos, preços, cores, mapa, nome etc. é editar dados, não código de layout.
- **Layout flexível, estrutura estável:** o visual pode mudar livremente, mas **respeita o schema** de conteúdo já definido. Ver `estrutura-dados.md`.
- **Site estático:** sem backend obrigatório. Gera HTML estático — rápido, barato, ótimo para SEO.
- **Mobile-first:** a maioria dos acessos virá de celular (links de WhatsApp/Instagram).
- **Conversão sempre à mão:** botão de WhatsApp flutuante em todas as páginas.

---

## 6. Decisões técnicas

| Tema | Decisão | Observação |
|------|---------|------------|
| Framework | **Astro** | Estático, rápido, ótimo SEO, ideal para site de marketing/imóveis. |
| Estilo | A definir no documento de design | Provável Tailwind ou CSS por tokens (cores/temas configuráveis). |
| Conteúdo | **Arquivos de dados padronizados** (Markdown/MDX + schema) | Sem CMS — leve e sem custo. Estrutura validada por schema. |
| Hospedagem | **Firebase Hosting** (início) | Migração futura para **Cloudflare Tunnel** possível sem reescrever (site é estático). |
| Mapa | A definir | Opções: imagem estática anotada, ou mapa interativo (Leaflet/Google Maps). |

---

## 7. Itens em aberto (a decidir)

- [ ] **Identidade visual:** logo e cores — será criada no documento de design.
- [ ] **Domínio:** ainda não definido — discutir nomes (ver `dominios.md` quando criado).
- [ ] **E-mail e redes sociais** (Instagram/Facebook) para o rodapé.
- [ ] **Tecnologia do mapa** (estático vs. interativo).
- [ ] **Formulário:** para onde enviar (e-mail, WhatsApp, serviço como Formspree)?
- [ ] **Dados reais** do primeiro empreendimento (fotos, plantas, preços, pontos de interesse).

---

## 8. Próximos passos

1. Criar **documento de design** (identidade visual, layout, componentes).
2. Definir a **estrutura de dados** do empreendimento — ver `estrutura-dados.md`.
3. Discutir **nomes de domínio**.
4. Iniciar o projeto Astro e montar o esqueleto do site.
