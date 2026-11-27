---
title: 'Roleta Premiada: a prize wheel that works without internet'
description: 'A friend needed a prize wheel to capture leads at a trade show where the Wi-Fi could not be trusted. So it runs fully offline: a kiosk in Chrome or a Tauri desktop app, with every lead kept on the machine and exported to CSV. Day one: 78 leads and no technical problems.'
pubDate: 2026-11-27
number: 5
stack: ['React · TypeScript', 'Vite', 'Tauri 2', 'Offline kiosk']
repo: 'https://github.com/hitaloose/roleta-premiada'
demo: 'https://hitaloose.github.io/roleta-premiada/'
draft: false
---

This one isn't a portfolio piece. A friend was taking a booth at a trade show and wanted a prize wheel to pull people in and capture leads: the visitor types in their name, phone and CPF, spins the wheel on a big TV, and maybe walks away with a discount or a gift.

The catch was the venue. Trade show Wi-Fi is famously bad, and the booth couldn't count on a stable connection. A wheel that freezes halfway through a spin, or a lead that vanishes because a request timed out, is worse than having no wheel at all. So the main requirement was that **it has to work with no internet at all**.

On the first day it captured **78 leads, with no technical problems**.

## What it does

The flow is short on purpose, because people at a booth are standing up and in a hurry:

1. The idle screen shows the wheel with a big flashing call to action ("Girou, ganhou!"), with lights and the brand on top.
2. Someone presses Enter and fills in the form one field at a time: name, phone, CPF. Phone and CPF are masked as you type, and the CPF is validated and can only play once.
3. The wheel spins, slows down and lands on the slice. Winning shows fireworks and confetti, a "super prize" gets its own bigger celebration, and losing shows a short message that doesn't repeat from one loss to the next.
4. After a few seconds it goes back to the idle screen by itself.

Each slice has a weight, so the team decides how often each prize comes out. The result is drawn **before** the wheel moves, and the animation is then computed to stop on that slice, with a bit of jitter so it doesn't always land dead center. The wheel only looks random; the odds are whatever was configured.

There's also a quick mode with data collection turned off, where Enter or Space just spins. It's useful when the goal is a crowd, not a list.

## Offline, two ways

The app is a React + TypeScript build made with Vite, with no backend. Fonts, sounds and images are all bundled, and the sounds that aren't mp3 files are synthesized in the browser with Web Audio. Nothing is loaded from a CDN, so once it's open, the network can disappear.

There were two ways to run it at the booth:

- **A Chrome kiosk.** On Windows, `iniciar-evento.bat` installs the dependencies, builds, starts a local server on `localhost:4173` and opens Chrome in kiosk mode pointing to it. That's one double click and no browser chrome on the screen.
- **A desktop app.** A Tauri 2 build opens straight into fullscreen with no window borders, no Chrome and no server. A GitHub Actions workflow builds the Windows installer, and Windows 10/11 already ships with the WebView2 it uses.

There's also a copy on GitHub Pages, which is handy for showing the thing to someone before the event, but that one needs internet to open.

## Not losing leads

With no backend, the leads live on the machine running the wheel, in `localStorage`. That's simple, but it's also exactly where data gets lost, so most of the care went there:

- **Every entry is written immediately**, winners and losers alike. If a write fails (a full disk or a blocked storage), a red banner appears at the top telling the team to export right away. The entries stay in memory until then.
- **It asks for persistent storage** with `navigator.storage.persist()`, so Chrome doesn't clear the site's data when the disk gets tight.
- **CSV export and import.** A hidden shortcut exports everyone to a CSV (name, phone, CPF, prize, result, date and time) with a BOM so Excel opens the accents correctly. Importing merges instead of replacing, and duplicates (same CPF and timestamp) are skipped, so importing the same file twice is safe. That's also how leads from two machines end up in one list.
- **Resetting is hard on purpose.** Clearing the data asks you to type `ZERAR` and offers "export and clear" as the default path.

The routine for the team was simple: export at the end of each day.

## Built for staff, not for visitors

Everything a visitor shouldn't see is behind hidden shortcuts. `Ctrl + Shift + K` opens the team's settings screen, protected by a PIN, and it always opens on the general tab so nobody standing nearby sees the odds. From there the team can change the theme, the screen orientation, the sounds, the call to action, the wheel's slices and their weights, and see the participant list.

A few other shortcuts came from imagining what goes wrong at a booth: `F1` goes back to fullscreen after an accidental `Esc`, and `F2` cancels the form when someone realizes their CPF has already played.

Each client is a "brand" with its own colors, fonts, background, logo, prizes and losing messages, so the same app can be reused at another event by adding a folder. The layout also works on a TV standing vertically.

## How it's built

The screens are driven by a small state machine (idle → form → spinning → win or lose → idle) in a reducer, which keeps the kiosk from ending up in a weird state when someone mashes keys. The parts that decide things are plain functions with tests: the weighted draw, the final wheel angle, CPF and phone validation, the input masks and the CSV parsing and merging. The test suite runs before every deploy.

The priorities were clear from the start: first that it never breaks or loses a lead, then that it looks good spinning on a TV.

## Try it

The [online version](https://hitaloose.github.io/roleta-premiada/) runs in the browser. To run it locally:

```sh
npm install
npm run event   # build + local server on http://localhost:4173
```

The [README](https://github.com/hitaloose/roleta-premiada#readme) (in Portuguese) has every shortcut and the steps to build the Windows app.
