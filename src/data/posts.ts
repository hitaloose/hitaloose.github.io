import { getCollection } from 'astro:content';

// Drafts are visible while writing (`npm run dev`) and never on the live site.
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const pad = (n: number) => String(n).padStart(2, '0');

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
