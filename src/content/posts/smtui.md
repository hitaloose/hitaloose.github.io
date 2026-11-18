---
title: 'smtui: a file manager that lives inside tmux, on the server'
description: 'A terminal UI that runs on the server: a mouse-friendly file browser on top, real shell tabs below that follow the folder you are in.'
pubDate: 2026-11-18
number: 1
stack: ['Rust + ratatui', 'Linux · x86_64 / aarch64', 'runs in tmux', 'MIT']
repo: 'https://github.com/hitaloose/smtui'
draft: true
---

<!-- TODO (Hitalo): one or two lines in your own words on why you built it. What was annoying before smtui? -->

My usual way into a server looks like this:

```sh
ssh deploy@edge1
tmux new -s work
smtui            # or: smtui /var/www
```

smtui is a terminal UI that runs **on the server**, inside tmux, with mouse and keyboard support. Every tab is a workspace, like an editor window: a file browser on top and real shells below.

![smtui: a file browser with a terminal below it, in tabs](https://raw.githubusercontent.com/hitaloose/smtui/main/docs/demo.gif)

## Files on top

The top half is a file browser that works the way a desktop one does: click to select, `Ctrl`+click and `Shift`+click for multiple items, double click to open a folder, right click for the context menu.

Copy and move take two steps, like on a desktop: mark the items with `c` or `m`, go to the destination, then paste with `v`. Rename never overwrites an existing name. There's also **Run…**, to run a command on a file, and **Copy scp command**, which builds the `scp` line you need to download that file to your own machine and puts it on your local clipboard through OSC 52.

## A terminal that follows the folder

The bottom half is a real shell (`$SHELL -l`), running through a PTY and a VT100 emulator, so vim, htop and less work as usual.

The first terminal tab is the **navigation shell**. When the folder in Files changes, smtui types ` cd <folder>` into it. The leading space keeps that command out of your shell history with `HISTCONTROL=ignorespace` in bash or `HIST_IGNORE_SPACE` in zsh. It only goes one way: `cd` in the shell doesn't move Files, but "Show shell folder in Files" brings Files there.

## Long commands get their own tab

Commands run where you type them. If one is still running after a second in the navigation shell (`tail -f`, `npm run dev`, a build), or it takes over the whole screen (vim, less, htop), smtui **promotes** it: that terminal becomes a tab named after the command, and a fresh navigation shell opens in the Files folder.

The process never moves, so nothing breaks, and the focus stays on the command in case you're typing a password. Tabs show `●` while running, then `✓` or `✗ <exit code>`, and the workspace tab shows how many commands are running (`apps ●2`).

## Try it

Releases are static Linux binaries for x86_64 and aarch64. Download one from the [releases page](https://github.com/hitaloose/smtui/releases), or run `smtui --demo` for an in-memory sample file system to try the UI without touching your disk.

Two tmux settings make it work best:

```sh
set -g mouse on            # pass clicks and scrolling to smtui
set -g set-clipboard on    # let "Copy scp command" reach your clipboard
```

The [README](https://github.com/hitaloose/smtui#readme) has the full list of keys and the iTerm2 settings for right click.

<!-- TODO (Hitalo): what you'd like to add next, or what you learned building it in Rust. -->
