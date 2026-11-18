# hitaloose.github.io

My blog: write-ups of the gear, games and code I build. Built with [Astro](https://astro.build), deployed to GitHub Pages on every push to `main`.

## Writing a post

1. Add a Markdown file to `src/content/posts/`. The file name becomes the URL: `smtui.md` → `/builds/smtui/`.
2. Fill in the frontmatter:

   ```yaml
   ---
   title: 'smtui: a file manager that lives inside tmux'
   description: 'One or two sentences for the setlist and for link previews.'
   pubDate: 2026-11-18
   number: 1                      # setlist number, in publishing order
   stack: ['Rust + ratatui', 'Linux', 'MIT']   # gaffer-tape labels
   repo: 'https://github.com/hitaloose/smtui'  # optional
   demo: 'https://…'                           # optional
   draft: true                    # visible in `npm run dev` only
   ---
   ```

3. Run `npm run dev` and open http://localhost:4321 to preview it, drafts included.
4. When it's ready, set `draft: false`, commit and push. The site updates in about a minute.

Images and GIFs go in `public/` (`public/builds/smtui/demo.gif` → `/builds/smtui/demo.gif`) or can link to the project's repo.

## Projects on the home page

The "On the bench" list lives in `src/data/projects.ts`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.23+) |
| `npm run dev` | Local preview at http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve the built site |
