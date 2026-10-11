# AI agent instructions — PlayQuest Arcade

Scope: the repository root and all descendants.

## Mission

Build small, delightful **standalone static 2D web games** from kid-authored ideas. Preserve the idea author's creative vision and display their approved credit. The site itself is a simple catalog; each game is independently playable/downloadable from a single HTML file.

## Hard contracts

1. **Each game lives at `games/<slug>/index.html`.** All gameplay HTML, CSS, JS, art (Canvas, CSS shapes, inline SVG), and synthesized audio must fit in that file. No build output or server is needed to play it, including with `file://` offline.
2. **No remote dependencies**: no frameworks, CDNs, Google Fonts, external asset URLs, fetch, XHR, analytics, ad scripts, third-party trackers, account systems, forms collecting data, or paid APIs.
3. **2D only**: Canvas 2D, SVG, CSS, or simple DOM graphics; no WebGL/3D or game engine requirement. Avoid heavy assets.
4. **Keyboard and touch** controls are mandatory; use visible hints and mobile-sized controls. Implement start, success, and replay (and pause for long sessions). Respect `prefers-reduced-motion` when feasible.
5. **Positive, age-appropriate play** for kids of different ages. No gory/scary visuals, dark patterns, personal data collection, public leaderboards, or inaccessible difficulty spikes. Give short instructions and kind failure messages.
6. **Credits are part of the artifact**: display idea/vision author and "Created using" in both catalog and game. Don't guess the author or silently modify approved names.
7. **Update catalog only using generator**: edit `data/games.json` and run `node scripts/build.mjs`. Never manually edit generated root `index.html`, except to fix the generator/template.
8. **Do not overwrite a supplied game** or unintentionally alter game mechanics while working on the catalog. Keep changes scoped and review regressions.
9. Don't auto-publish. GitHub Pages deployment occurs when changes are pushed to `main` after the owner configures the public repository and Pages. Do not add a remote without explicit instructions.

## Preferred workflow

1. Read `README.md` and `docs/GAME_BRIEF_TEMPLATE.md` before designing a game.
2. Capture the creative brief; agree on the controls and success condition.
3. Run `node scripts/new-game.mjs <slug> "Title" "Approved author"` to scaffold; it does **not** register/publish the game.
4. Build and manually playtest the game, including the win/replay state.
5. Replace the starter cover, then add metadata to `data/games.json` (copy a prior entry).
6. Run `node scripts/build.mjs`, `node scripts/validate.mjs`, and `node --test tests/*.test.mjs`.
7. Manually check the catalog, Play link, Download link, offline file launch, narrow viewport, and sound/focus behavior.
8. Update `plan.md` and documentation if functionality or conventions changed.

## Architecture

- `templates/catalog.html` + `data/games.json` -> `scripts/build.mjs` -> committed `index.html`.
- Browser renders index and `assets/styles.css`; `assets/catalog.js` enables optional search; cards remain visible without JavaScript.
- Game HTML is **independent** of all catalog files, hosting domain, folder path, and server.
- Covers in `assets/covers/` are only for the catalog; never reference them from a downloadable game.
- `tests/` and `scripts/validate.mjs` contain zero-dependency publish checks.

## Security & privacy review

Treat all text/metadata as untrusted input and HTML-escape in generated content. Do not add links to unknown services, upload player data, include photos/contact details of children, store unnecessary user information, or expose build-time secrets. Ask owner permission before including new identifiable information about minors on the public site.

## Done means

A game is playable, finishable, replayable, mobile/keyboard friendly, credited, offline, discoverable in the catalog, downloadable as a single `.html` file, and passes repository validation.
