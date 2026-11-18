import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Setlist number: the order the post was published in.
    number: z.number().int().positive(),
    // Shown as gaffer-tape labels: stack, hardware, platform.
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Drafts show in `npm run dev` only, never on the live site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
