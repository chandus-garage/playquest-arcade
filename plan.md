# PlayQuest Arcade — plan and roadmap

## Vision

A welcoming, free public catalog of imaginative 2D browser games built from kids' ideas. A game should run on GitHub Pages, on any basic static host, and offline after a single `.html` download. No account, subscription, back end, analytics, or installation.

## V1 — implemented

- [x] Created a standalone repository project
- [x] Responsive static index listing Rainbow Danger and Astro Adventure
- [x] Both games playable directly and downloadable individually
- [x] Credited Sriya Yalamanchili and Sriyaan Yalamanchili for their respective ideas/vision, and Muse AI as creator tool
- [x] Updated AstroGamer & Friends display/title to Astro Adventure
- [x] Removed external Google Fonts dependencies from the games for offline use
- [x] Illustrated cover art and accessible search in game catalog
- [x] Manifest-driven static index generator; generated HTML works without a server
- [x] Game brief, standalone starter, local scaffold, agent guidance and quality checklist
- [x] Zero-dependency validation/tests and GitHub Pages workflow

## V1 owner launch tasks

- [ ] Review the games and confirm public display of each author credit
- [x] Create public `chandus-garage/playquest-arcade` repository
- [ ] Publish the initial files to the public `main` branch
- [ ] Enable GitHub Pages with **GitHub Actions** as deployment source
- [ ] Check published catalog, play buttons, and HTML downloads on phone/desktop
- [ ] Choose and add a LICENSE if public reuse/contributions are intended

## Future backlog (not implemented)

### P1 — improve kids' play experience

- [ ] Collect feedback and playtest full level/mission completion on both games
- [ ] Add optional accessibility settings within individual games (slower speed, bigger controls, mute/reduced motion)
- [ ] Add optional how-to-play illustrations or mini-tutorial before each game
- [ ] Add a short, consistent success screenshot/recap screen within future games when relevant

### P2 — grow the arcade

- [ ] Add a new game using `docs/GAME_BRIEF_TEMPLATE.md` + `scripts/new-game.mjs`
- [ ] Add category filters only once catalog is large enough to benefit
- [ ] Add optional age/difficulty hints after hands-on user testing (avoid assuming age is ability)
- [ ] Add translated game instructions as needed

### P3 — support contributors

- [ ] Add optional automated browser smoke test for every standalone game
- [ ] Add screenshot comparisons of catalog/game loading on desktop/mobile
- [ ] Provide a collection of truly self-contained example game mechanics (runner, puzzle, platformer)

## Explicitly out of scope

Back end, user identity, chat, social sharing of personal data, ads, telemetry, player profiles, cloud saves, leaderboards, external runtime dependencies, and 3D games.
