# Estrutura de Dados — Empreendimentos

> Schema padronizado para os empreendimentos. O **layout consome estes dados**; mudar conteúdo (fotos, preços, mapa, cores, nome) é editar dados, não código. O visual pode evoluir livremente desde que respeite esta estrutura.

Esta é uma **proposta inicial** para revisarmos juntos. Campos opcionais marcados com `?`.

---

## 1. Empreendimento (raiz)

```yaml
slug: residencial-exemplo            # identificador na URL (/empreendimentos/residencial-exemplo)
nome: "Residencial Exemplo"
tipo: apartamento                    # "casa" | "apartamento"
status: em_construcao                # "lancamento" | "em_construcao" | "entregue"
destaque: true                       # aparece em destaque na home?

chamada: "Apartamentos de 2 e 3 quartos no coração do bairro"   # frase do hero
descricao: |                         # texto descritivo (markdown)
  Texto completo sobre o imóvel...

caracteristicas:                     # lista de destaques rápidos
  - "2 e 3 quartos"
  - "Lazer completo"
  - "Vaga de garagem"

# Identidade visual específica do empreendimento (opcional — sobrescreve o tema padrão)
tema?:
  cor_primaria: "#1A4D2E"
  cor_secundaria: "#E8B86D"
  logo?: "/empreendimentos/exemplo/logo.svg"

galeria:                             # fotos
  - src: "/empreendimentos/exemplo/foto-1.jpg"
    alt: "Fachada"
  - src: "/empreendimentos/exemplo/foto-2.jpg"
    alt: "Área de lazer"

plantas:                             # plantas baixas
  - nome: "Planta 2 quartos"
    area_m2: 62
    imagem: "/empreendimentos/exemplo/planta-2q.jpg"
  - nome: "Planta 3 quartos"
    area_m2: 78
    imagem: "/empreendimentos/exemplo/planta-3q.jpg"

localizacao:
  endereco: "Rua Exemplo, 123 - Bairro, Cidade/UF"
  lat: -19.912998
  lng: -43.940933
  pontos_de_interesse:               # marcados no mapa com distância
    - nome: "Escola Municipal"
      tipo: educacao                 # categoria p/ ícone (educacao|saude|compras|transporte|lazer)
      distancia: "500 m"
    - nome: "Supermercado"
      tipo: compras
      distancia: "1,2 km"

unidades:                            # tabela de preços/disponibilidade
  - identificacao: "Apto 101"
    planta: "Planta 2 quartos"       # referencia a plantas[].nome
    area_m2: 62
    preco: 320000                    # número (formatado no layout); ou null se "sob consulta"
    status: disponivel               # "disponivel" | "reservado" | "vendido"
  - identificacao: "Apto 201"
    planta: "Planta 3 quartos"
    area_m2: 78
    preco: 410000
    status: reservado

contato:
  whatsapp: "+5531984494731"
  mensagem_padrao: "Olá! Tenho interesse no Residencial Exemplo."   # texto pré-preenchido no WhatsApp

seo?:
  titulo: "Residencial Exemplo - Apartamentos em Cidade/UF"
  descricao: "Apartamentos de 2 e 3 quartos..."
  imagem: "/empreendimentos/exemplo/og.jpg"
```

---

## 2. Princípios do schema

- **Mesmos campos para casa e apartamento.** O campo `tipo` diferencia; o layout adapta termos (ex.: "unidades" vs. "lotes/casas") sem mudar a estrutura.
- **Tudo que muda com frequência é dado:** fotos, preços, status, pontos de interesse, cores e logo do empreendimento.
- **Imagens por pasta:** cada empreendimento tem sua pasta de assets (`/empreendimentos/<slug>/`).
- **Preço flexível:** número para exibir valor, ou `null` para "sob consulta".
- **Tema opcional por empreendimento:** se ausente, usa o tema global do site.

---

## 3. Dados globais do site (proposta)

```yaml
empresa:
  nome: "Emmanuel Serviços"
  cnpj: "04.778.491/0001-57"
  whatsapp: "+5531984494731"
  email?: ""
  instagram?: ""
  facebook?: ""

servicos:                            # os 5 serviços prestados
  - slug: reforma
    nome: "Reforma"
    descricao: "..."
  - slug: consultoria
    nome: "Consultoria"
    descricao: "..."
  - slug: construcao
    nome: "Construção"
    descricao: "..."
  - slug: mao-de-obra
    nome: "Mão de obra"
    descricao: "..."
  - slug: emprestimo-material
    nome: "Empréstimo de material"
    descricao: "..."

tema:                                # tema visual padrão (definido no doc de design)
  cor_primaria: ""
  cor_secundaria: ""
```

---

## 4. Em aberto

- [ ] Validar campos com você (faltou algo? sobra algo?).
- [ ] Definir formato técnico final (Astro Content Collections com schema Zod é o caminho natural — valida os dados automaticamente).
- [ ] Definir categorias de pontos de interesse e seus ícones.
- [ ] Decidir exibição de preço (mostrar valor x "sob consulta").
