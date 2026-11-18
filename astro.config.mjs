// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hitaloose.github.io',
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: false },
  },
});
