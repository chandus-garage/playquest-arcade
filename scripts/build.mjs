#!/usr/bin/env node
// Produces a ready-to-host catalog; no runtime fetches or framework build step.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(join(root, path), 'utf8');
export const games = JSON.parse(read('data/games.json'));
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);

const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z"/></svg>';
const downloadIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 17v3h16v-3"/></svg>';

export function validateManifest() {
  if (!Array.isArray(games) || games.length === 0) throw new Error('data/games.json must contain at least one game');
  const slugs = new Set();
  for (const game of games) {
    for (const field of ['slug', 'title', 'author', 'authorRole', 'createdUsing', 'category', 'description', 'controls', 'cover', 'accent']) {
      if (typeof game[field] !== 'string' || !game[field].trim()) throw new Error(`${game.slug || 'Unknown game'}: missing ${field}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug)) throw new Error(`Unsafe slug: ${game.slug}`);
    if (slugs.has(game.slug)) throw new Error(`Duplicate slug: ${game.slug}`);
    slugs.add(game.slug);
    if (!/^assets\/covers\/[a-z0-9-]+\.svg$/.test(game.cover)) throw new Error(`Cover must be a local SVG: ${game.slug}`);
    if (!/^#[0-9a-fA-F]{6}$/.test(game.accent)) throw new Error(`Invalid accent: ${game.slug}`);
    if (!Array.isArray(game.tags) || game.tags.some((tag) => typeof tag !== 'string')) throw new Error(`Invalid tags: ${game.slug}`);
    if (!existsSync(join(root, 'games', game.slug, 'index.html'))) throw new Error(`Game HTML missing: ${game.slug}`);
    if (!existsSync(join(root, game.cover))) throw new Error(`Cover missing: ${game.slug}`);
  }
}

export function renderCard(game) {
  const e = escapeHtml;
  const gamePath = `games/${game.slug}/index.html`;
  const search = [game.title, game.author, game.category, game.description, game.controls, ...game.tags].join(' ').toLocaleLowerCase();
  return `          <article class="game-card" style="--card-accent:${game.accent}" data-search="${e(search)}">
            <a class="cover-link" href="${gamePath}" aria-label="Play ${e(game.title)}"><img src="${e(game.cover)}" alt="${e(game.title)} illustrated game cover" loading="lazy"><span class="cover-pill">✦ ${e(game.category)}</span></a>
            <div class="game-content">
              <h3>${e(game.title)}</h3>
              <p class="game-desc">${e(game.description)}</p>
              <div class="game-controls"><span aria-hidden="true">🎮</span>${e(game.controls)}</div>
              <div class="game-credits"><span><strong>Author (idea &amp; vision):</strong> ${e(game.author)}</span><span><strong>Created using:</strong> ${e(game.createdUsing)}</span></div>
              <div class="game-actions"><a class="play-link" href="${gamePath}">${playIcon} Play game</a><a class="download-link" href="${gamePath}" download="${e(game.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-'))}.html">${downloadIcon} Download</a></div>
            </div>
          </article>`;
}

export function renderIndex() {
  validateManifest();
  return read('templates/catalog.html')
    .replaceAll('{{GAME_COUNT}}', String(games.length))
    .replace('{{GAME_CARDS}}', games.map(renderCard).join('\n'));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const expected = renderIndex();
  const destination = join(root, 'index.html');
  if (process.argv.includes('--check')) {
    if (!existsSync(destination) || readFileSync(destination, 'utf8') !== expected) {
      console.error('index.html is out of date. Run: node scripts/build.mjs');
      process.exitCode = 1;
    } else console.log(`Catalog is current (${games.length} games).`);
  } else {
    writeFileSync(destination, expected);
    console.log(`Generated index.html with ${games.length} games.`);
  }
}
