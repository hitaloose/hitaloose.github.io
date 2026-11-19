---
title: 'Pick the architecture before you vibe code'
description: 'A coding agent copies whatever is already in the repo, so the first decisions become the pattern for everything after. How I set them up, for regular apps and for games.'
pubDate: 2026-11-19
number: 3
stack: ['Vibe coding', 'Architecture', 'Claude Code', 'Notes']
draft: false
---

Something I noticed after building a few apps with a coding agent: what matters most is how the project is organized before the first feature exists. Once the structure is more or less in place, the model follows its own code. It reads what's in the repo and copies it, so the first decisions become the pattern for everything that comes after.

The good news is that this works both ways. A messy start spreads through the whole project, and a clean one spreads just as well. So I now spend the first session on structure, not features.

## Simple layers are enough for most apps

For most of what I build (APIs, CRUDs, dashboards, bots, small SaaS), **controller → service → repository** is a good default, in any language:

- **The model knows it very well.** It has seen this structure thousands of times, so it makes fewer mistakes.
- **It's only a few files per feature.** Every extra layer costs context and gives the model one more place to drift from the pattern.
- **It's easy to review.** You can tell at a glance whether business logic leaked into a controller or whether there's SQL inside a service.

Full **Clean Architecture** or **hexagonal** only pays off when the domain is complex (lots of rules, little CRUD) or when the same logic has many ways in and out: HTTP, CLI, queues, swappable providers. Without that, you get a pile of interfaces, DTOs and mappers. The model writes them without complaining, but then you have to maintain them.

The middle ground I use: simple layers, plus the one part of hexagonal that's worth it everywhere, which is **putting anything external behind an interface**. The LLM API, WhatsApp, payments, storage. Everything else can talk to the ORM directly.

Two caveats:

- **If the framework has opinions, follow them.** In Rails, Laravel, Django, NestJS or Next.js, the framework's conventions beat any architecture you try to put on top.
- **Organize by feature, not by type.** With a `users/` folder holding its controller, service and repository, the model finds everything about a feature in one place. With global `controllers/` and `services/` folders, it has to hunt.

## How I set it up

1. **Talk before coding.** Describe the app and ask for a proposal of stack, folders and layers, with no code yet. Argue with it and cut what's excessive.
2. **Write a short rules file** (`CLAUDE.md`, `AGENTS.md` or whatever your tool reads) with the stack and folder layout, what each layer can and can't do ("controllers only validate and call a service"), and naming, error handling and where tests live.
3. **Build one reference feature end to end**, from the route to the database with a test, and review it carefully. After that, "follow the pattern in `users/`" does more than any description. A real example beats prose.
4. **Automate whatever you can.** Lint, type checks and tests running on every change hold the pattern better than written instructions. You can even forbid imports between layers with dependency-cruiser, ESLint rules or import-linter in Python. In [Fixa](/builds/fixa/), the scheduling domain can't call `Date.now()` or `Math.random()`, and that's enforced by architecture tests and dependency-cruiser, not by asking nicely.
5. **Fix drift right away.** A deviation that stays in the code becomes the example the model copies next.

## What actually matters

The choice between MVC and hexagonal matters less than having the architecture written down, shown in a real example and checked automatically. A simple structure the model follows consistently beats a sophisticated one it follows halfway.