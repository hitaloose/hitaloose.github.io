---
title: 'Fixa: spaced-repetition flashcards for your phone, with real formulas'
description: 'An Anki-style flashcard app that runs entirely in the browser: FSRS scheduling, stacked fractions with KaTeX and MathLive, offline, no account, and it opens Anki decks.'
pubDate: 2026-11-18
number: 2
stack: ['React + TypeScript', 'PWA · offline', 'FSRS', 'Anki compatible']
repo: 'https://github.com/hitaloose/fixa'
demo: 'https://hitaloose.github.io/fixa/'
draft: false
---

Fixa is a flashcard app with spaced repetition, built for studying on your phone and for memorizing formulas. It follows the Anki way of thinking (decks, notes, cards, note types, presets) with a touch-first interface, and math is a first-class citizen: `3/4` shows up as a stacked fraction, like it does in your notebook.

It's an installable web app. There's no account and no server, and it works without an internet connection.

<p>
  <img src="https://raw.githubusercontent.com/hitaloose/fixa/main/docs/images/inicio.png" alt="Home screen with the deck tree and today's counts" width="200">
  <img src="https://raw.githubusercontent.com/hitaloose/fixa/main/docs/images/estudo.png" alt="Study card with the sphere volume formula and the four answer buttons" width="200">
  <img src="https://raw.githubusercontent.com/hitaloose/fixa/main/docs/images/formula.png" alt="LaTeX formula editor with preview" width="200">
</p>

## Studying with FSRS

Reviews are scheduled with **FSRS**, the algorithm Anki uses today, through `ts-fsrs`. Each answer shows four buttons with the next interval on them, and you can answer with `1`–`4` on a keyboard or swipe on the phone. Undo, bury, suspend and flag are one tap away.

Beyond the normal queue there's custom study: cards forgotten today, by tag, review ahead, or an infinite practice mode that never touches scheduling. Statistics show true retention, streak, an activity map and a 30-day workload simulation that runs the scheduler itself.

## Formulas that look like formulas

Formulas live inside the card's HTML as LaTeX, with the same delimiters Anki uses: `\( … \)` inline and `\[ … \]` as a block. That keeps `.apkg` files compatible both ways.

To show them, Fixa uses **KaTeX**, which is faster than MathJax on a phone and is only loaded when a card actually has a formula. A broken formula shows its raw LaTeX instead of breaking the card, and a wide one scrolls sideways instead of shrinking.

To write them, you don't have to know LaTeX. Tapping **Σ** in the editor opens a bottom sheet with **MathLive** and its math keyboard: type `3/4` and it becomes a stacked fraction, with a live preview and a switch to raw LaTeX for those who prefer typing it. Cloze deletions work inside formulas too, so `{{c1::\frac{a}{b}}}` hides just that piece.

## Your data stays on your device

There is no backend, so the browser's IndexedDB is the only place your data exists. Most of the design went into making sure you never lose what you studied:

- **Backup to a file** whenever you want, shared through the Web Share API on the phone (save it to Drive, send it to yourself).
- **Automatic backup** to a folder you pick once, on Chrome and Edge, written at the end of every study session.
- **Two devices** work by exporting from one and **merging** into the other. Records keep the newest version, review logs are only ever added, and cards that got reviews on both sides have their state rebuilt by replaying the logs. Deletions are soft, so a card you deleted on one phone doesn't come back from the other one's backup.
- A **reminder** on the home screen tells you when your last backup is getting old.

## It opens your Anki decks

Fixa imports `.apkg` and `.colpkg` (legacy and current formats), CSV and TXT, and exports `.apkg`. The Anki package is opened by **sql.js** (SQLite compiled to WASM) inside a Web Worker, and the WASM file is precached, so importing works offline too. Your scheduling comes along: due dates and intervals are kept, and FSRS memory state is taken from the deck when it's there, or rebuilt from the review history when it isn't.

## Built test-first

The project follows strict TDD: no production code without a failing test first. The scheduling domain is kept pure (no `Date.now()`, no `Math.random()`, enforced by architecture tests and dependency-cruiser), backup and merge have property tests with fast-check, Stryker runs mutation tests on the domain, and Playwright runs the main flows at 390×844, offline.

## Try it

Open [hitaloose.github.io/fixa](https://hitaloose.github.io/fixa/) and use **Add to Home screen** on Android, or **Share → Add to Home Screen** on iPhone. On iPhone, install it before you start studying: Safari's data and the installed app's data are kept separate.

The interface is in Portuguese (Brazil) and English. The [README](https://github.com/hitaloose/fixa#readme) has the full feature list and the design docs.
