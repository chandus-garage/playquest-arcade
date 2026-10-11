# Quality gate for every game

Test the standalone HTML itself, not only the catalog preview.

## Playability

- [ ] All levels/challenges are achievable (test full win path, not only start)
- [ ] Start/restart/replay flow works more than once
- [ ] Errors, collisions, and scoring behave as expected
- [ ] No unwinnable state caused by missing collectibles or inaccessible platforms
- [ ] No game-over loops, runaway timers, or multiplying animation loops
- [ ] Loss screen encourages retry without shaming the player

## Devices and accessibility

- [ ] Keyboard controls (arrows/WASD/space or documented keys)
- [ ] Touch or pointer buttons, minimum practical 44px targets
- [ ] Portrait and landscape phone views; tablet and desktop views
- [ ] High-DPI canvas not blurry when feasible
- [ ] Clear on-screen instructions and `aria-label`s where useful
- [ ] Reduced-motion users aren't forced through flashing animation
- [ ] No unnecessary rapid flashes, frightening content, or aggressive audio
- [ ] Pause/resume on focus loss when relevant

## Standalone/privacy

- [ ] No required third-party fonts, libraries, images, audio files, or CDN
- [ ] No fetch, network requests, analytics, ads, account system, or personal data collection
- [ ] Opening only `games/<slug>/index.html` with no network works
- [ ] File size remains sensible and browser memory stays stable
- [ ] Author idea/vision and creator-tool credits are correct

## Catalog & publishing

- [ ] Add metadata/cover to `data/games.json`
- [ ] `node scripts/build.mjs`
- [ ] `node scripts/build.mjs --check`
- [ ] `node scripts/validate.mjs`
- [ ] `node --test tests/*.test.mjs`
- [ ] Open `index.html`; Play and Download buttons both work
- [ ] Run browser checks at desktop and mobile widths
