// https://docs.astro.build/en/guides/content-collections/

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/products',
  }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'paneles',
      'reflectores',
      'bombillos',
      'ojos-aguila',
      'lamparas',
    ]),
    watts: z.array(z.number()),
    lumens: z.string().optional(),
    voltage: z.string().default('85-265V'),
    shape: z.enum(['Redondo', 'Cuadrado', 'N/A']).default('N/A'),
    mainImage: z.string(),
    isFeatured: z.boolean().default(false),
    specs: z.record(z.string(), z.string()).optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      contents: z.array(z.string()),
      author: z.string(),
      role: z.string().optional(),
      authorImage: image(),
      authorImageAlt: z.string(),
      pubDate: z.date(),
      cardImage: image(),
      cardImageAlt: z.string(),
      readTime: z.number(),
      tags: z.array(z.string()).optional(),
    }),
});

const insightsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/insights',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cardImage: image(),
      cardImageAlt: z.string(),
    }),
});

export const collections = {
  products: productsCollection,
  blog: blogCollection,
  insights: insightsCollection,
};
