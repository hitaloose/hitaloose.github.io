export type Project = {
  name: string;
  summary: string;
  stack: string;
  repo: string;
  demo?: string;
};

// "On the bench": shown two per row, in this order.
export const projects: Project[] = [
  {
    name: 'smtui',
    summary: 'A TUI that runs on your server inside tmux: a file browser with copy/move/paste plus real terminal tabs that follow it.',
    stack: 'Rust · ratatui',
    repo: 'https://github.com/hitaloose/smtui',
  },
  {
    name: 'universal-midi-controller',
    summary: 'Turns the browser into a MIDI foot controller: preset and FX pads, tap tempo, a tempo-synced looper and a songbook.',
    stack: 'TypeScript · Web MIDI',
    repo: 'https://github.com/hitaloose/universal-midi-controller',
    demo: 'https://hitaloose.github.io/universal-midi-controller/',
  },
  {
    name: 'megaman-celeste-like',
    summary: 'A libretro frontend that changes how an NES platformer plays from outside the emulator: checkpoints, a death counter, no slowdown.',
    stack: 'C · libretro · SDL2',
    repo: 'https://github.com/hitaloose/megaman-celeste-like',
  },
  {
    name: 'linksawakening-portable',
    summary: "My fork of a static recompilation of Link's Awakening DX to C, running natively on cheap Linux handhelds with Switch-style controls and quality-of-life tweaks.",
    stack: 'C · static recompilation · RG35XX',
    repo: 'https://github.com/hitaloose/linksawakening-portable',
  },
  {
    name: 'raycasting',
    summary: 'A from-scratch raycaster on HTML5 Canvas, with the first-person view and the top-down map side by side.',
    stack: 'TypeScript · Canvas',
    repo: 'https://github.com/hitaloose/raycasting',
    demo: 'https://hitaloose.github.io/raycasting/',
  },
  {
    name: 'over-engineered-crud',
    summary: 'Clean Architecture API where the same controllers serve a REST API and an MCP server for AI assistants.',
    stack: 'TypeScript · MCP',
    repo: 'https://github.com/hitaloose/over-engineered-crud',
  },
];
