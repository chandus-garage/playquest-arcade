# Contributing a game

PlayQuest Arcade welcomes imaginative, family-friendly 2D games. Each game is **one standalone HTML file**; please keep artwork, styles, and scripts inside it so a download works without an internet connection.

To propose an idea, create a brief from `docs/GAME_BRIEF_TEMPLATE.md`. Avoid publishing a child's photo, school, age, contact information, or location. Only use author names that are approved for public credit.

To develop, run:

```bash
node scripts/new-game.mjs candy-comet "Candy Comet" "Approved display name"
```

This creates `games/candy-comet/index.html` and an editable SVG catalog cover. It deliberately does **not** add an unfinished game to the visible catalog. Finish and playtest the game, then add its manifest entry to `data/games.json` and regenerate:

```bash
node scripts/build.mjs
node scripts/validate.mjs
node --test tests/*.test.mjs
```

Open `index.html` and the game HTML in browsers, and use `docs/QUALITY_CHECKLIST.md` before a PR. In a PR, explain the game's idea, credit, controls, and which devices you tested. A contributor retains responsibility for not copying proprietary code or unlicensed art/music. Public visibility does not itself grant an open-source license; the repository owner will choose licensing separately.
