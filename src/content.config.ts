import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Coleção de empreendimentos.
 * Espelha docs/estrutura-dados.md. O `slug` vem do nome do arquivo (id).
 *
 * Evoluções de apresentação em relação ao doc (aditivas, retrocompatíveis):
 *  - `caracteristicas` aceita { texto, icone? } para exibir ícone por item.
 *  - `localizacao` ganha `bairro?` e `cidade?` para o rótulo dos cards.
 * O preço "a partir de" é derivado do menor preço das unidades (não é dado).
 */

const tipoPontoInteresse = z.enum(['educacao', 'saude', 'compras', 'transporte', 'lazer']);

const empreendimentos = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/empreendimentos' }),
  schema: z.object({
    nome: z.string(),
    tipo: z.enum(['casa', 'apartamento']),
    status: z.enum(['lancamento', 'em_construcao', 'entregue']),
    destaque: z.boolean().default(false),

    chamada: z.string(),
    descricao: z.string(),

    // Previsão de entrega (ex.: "Conclusão maio/2026 · Chaves julho/2026")
    previsao_entrega: z.string().optional(),

    caracteristicas: z
      .array(
        z.object({
          texto: z.string(),
          icone: z.string().optional(), // nome do ícone lucide (ex.: "bed-double")
        })
      )
      .default([]),

    // Identidade visual específica (opcional — sobrescreve o tema global)
    tema: z
      .object({
        cor_primaria: z.string().optional(),
        cor_secundaria: z.string().optional(),
        logo: z.string().optional(),
      })
      .optional(),

    galeria: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),

    plantas: z
      .array(
        z.object({
          nome: z.string(),
          area_m2: z.number(),
          imagem: z.string().optional(),
        })
      )
      .default([]),

    localizacao: z.object({
      endereco: z.string(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      pontos_de_interesse: z
        .array(
          z.object({
            nome: z.string(),
            tipo: tipoPontoInteresse,
            distancia: z.string().optional(),
          })
        )
        .default([]),
    }),

    unidades: z
      .array(
        z.object({
          identificacao: z.string(),
          planta: z.string().optional(),
          area_m2: z.number(),
          suite: z.boolean().optional(),
          // Plano de pagamento (opcional) — alimenta a tabela de vendas
          entrada: z.number().nullable().optional(), // valor de cada parcela de entrada
          entrada_parcelas: z.number().optional(), // qtd de parcelas de entrada
          financiamento: z.number().nullable().optional(), // valor financiado
          preco: z.number().nullable(), // valor total
          status: z.enum(['disponivel', 'reservado', 'vendido']),
        })
      )
      .default([]),

    contato: z.object({
      whatsapp: z.string(),
      mensagem_padrao: z.string(),
    }),

    seo: z
      .object({
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        imagem: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { empreendimentos };
