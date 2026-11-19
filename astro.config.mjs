// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Fonts come from Fontsource and are downloaded at build time and self-hosted.
// Astro generates the @font-face rules, preload links and metric-matched
// fallbacks (size-adjust etc.), so the swap from fallback to web font
// doesn't shift the layout.
const fontsource = fontProviders.fontsource();
const subsets = /** @type {[string]} */ (['latin']);

export default defineConfig({
  site: 'https://hitaloose.github.io',
  fonts: [
    {
      provider: fontsource,
      name: 'Anton',
      cssVariable: '--font-anton',
      weights: [400],
      subsets,
      fallbacks: ['Impact', 'Arial Narrow', 'sans-serif'],
    },
    {
      provider: fontsource,
      name: 'Big Shoulders Display',
      cssVariable: '--font-big-shoulders',
      weights: [700, 800, 900],
      subsets,
      fallbacks: ['Arial Narrow', 'Impact', 'sans-serif'],
    },
    {
      provider: fontsource,
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets,
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontsource,
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets,
      fallbacks: ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
    },
    {
      provider: fontsource,
      name: 'Permanent Marker',
      cssVariable: '--font-marker',
      weights: [400],
      subsets,
      fallbacks: ['Marker Felt', 'cursive'],
    },
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: false },
  },
});
