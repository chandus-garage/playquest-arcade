#!/usr/bin/env node
// Generate a self-contained starter game and catalog cover without publishing it.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root, escapeHtml } from './build.mjs';

const [slug, title, author, createdUsing='Muse AI'] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !title || !author) {
  console.error('Usage: node scripts/new-game.mjs <slug> "Game title" "Idea author" ["Created using"]');
  process.exit(1);
}
const dir = join(root, 'games', slug);
const cover = join(root, 'assets', 'covers', `${slug}.svg`);
if (existsSync(dir) || existsSync(cover)) {
  console.error(`Cannot overwrite existing game: ${slug}`);
  process.exit(1);
}
mkdirSync(dir, { recursive:true });
const html=readFileSync(join(root, 'templates', 'standalone-game.html'),'utf8')
  .replaceAll('{{GAME_TITLE}}',escapeHtml(title))
  .replaceAll('{{AUTHOR_NAME}}',escapeHtml(author))
  .replaceAll('{{CREATED_USING}}',escapeHtml(createdUsing));
writeFileSync(join(dir,'index.html'),html);
writeFileSync(cover,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" rx="28" fill="#453b98"/><circle cx="640" cy="98" r="90" fill="#ffb3dc"/><path d="M130 315l28-74 28 74 74 28-74 28-28 74-28-74-74-28z" fill="#ffd971"/><text x="400" y="220" font-size="52" font-family="system-ui,sans-serif" font-weight="800" fill="white" text-anchor="middle">${escapeHtml(title)}</text></svg>\n`);
console.log(`Created games/${slug}/index.html and assets/covers/${slug}.svg`);
console.log('Now implement your game, replace the placeholder cover, then add a game entry to data/games.json and run: node scripts/build.mjs');
