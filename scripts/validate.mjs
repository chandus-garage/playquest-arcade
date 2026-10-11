#!/usr/bin/env node
// Fast, zero-dependency content checks before publishing a kids' game.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { games, root, renderIndex, validateManifest } from './build.mjs';

const fail = (msg) => { throw new Error(msg); };
validateManifest();
const index = readFileSync(join(root, 'index.html'), 'utf8');
if (index !== renderIndex()) fail('Catalog out of date. Run node scripts/build.mjs');

for (const game of games) {
  const html = readFileSync(join(root, 'games', game.slug, 'index.html'), 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (title !== game.title) fail(`${game.slug}: document title does not match catalog`);
  for (const credit of [game.author, game.createdUsing]) if (!html.includes(credit)) fail(`${game.slug}: missing credit ${credit}`);
  if (!/<canvas\b/i.test(html)) fail(`${game.slug}: expected a 2D canvas game`);
  if (!/<script\b[^>]*>[\s\S]*?<\/script>/i.test(html)) fail(`${game.slug}: game JavaScript must be inline`);
  if (!/<style\b[^>]*>[\s\S]*?<\/style>/i.test(html)) fail(`${game.slug}: game CSS must be inline`);
  if (/<(?:script|link|img|iframe|audio|video|source)\b[^>]*(?:src|href)\s*=\s*["']https?:\/\//i.test(html)) fail(`${game.slug}: remote asset dependency`);
  if (/@import\s+(?:url\()?\s*['"]?https?:\/\//i.test(html)) fail(`${game.slug}: remote stylesheet dependency`);
  // The W3C SVG namespace is a harmless identifier; all other remote URLs are disallowed.
  const remoteUrls = [...html.matchAll(/https?:\/\/[^\s'"<>)]*/gi)].map(m => m[0]);
  if (remoteUrls.some(url => url !== 'http://www.w3.org/2000/svg')) fail(`${game.slug}: external URL detected`);
  if (/\b(?:fetch\s*\(|XMLHttpRequest\s*\(|navigator\.sendBeacon\s*\()/i.test(html)) fail(`${game.slug}: network request detected; games must be standalone/offline`);
  if (!/addEventListener\(['"]key(?:up|down)/i.test(html)) fail(`${game.slug}: provide keyboard controls`);
  if (!/pointerdown/i.test(html)) fail(`${game.slug}: provide pointer/touch controls`);
  console.log(`PASS: ${game.title} — title, credits, local-only assets, canvas, controls`);
}
if (!index.includes('download="Rainbow-Danger.html"') || !index.includes('download="Astro-Adventure.html"')) fail('Download links missing');
console.log(`PASS: catalog, download links, manifest (${games.length} games)`);
