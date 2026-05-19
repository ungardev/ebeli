// https://docs.astro.build/en/guides/content-collections/

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/products',
  }),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      category: z.enum([
        'bombillos',
        'lamparas',
        'tubos',
        'reflectores',
        'cintas',
        'paneles',
      ]),
      subCategory: z.string().optional(),
      watts: z.array(z.number()),
      colorTemperature: z.string().default('3000K / 6500K'),
      voltage: z.string().default('AC85-285V'),
      warranty: z.string().default('2 Años de Garantía'),
      mainImage: image(),
      isFeatured: z.boolean().default(false),
      specs: z
        .object({
          flux: z.string().optional(),
          base: z.string().optional(),
          shape: z.string().optional(),
        })
        .optional(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      cardImage: image(),
      cardImageAlt: z.string(),
      author: z.string().optional(),
      authorImage: image().optional(),
      authorImageAlt: z.string().optional(),
      description: z.string().optional(),
      role: z.string().optional(),
    }),
});

const insightsCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/insights' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      cardImage: image(),
      cardImageAlt: z.string(),
      description: z.string().optional(),
    }),
});

export const collections = {
  products: productsCollection,
  blog: blogCollection,
  insights: insightsCollection,
};
