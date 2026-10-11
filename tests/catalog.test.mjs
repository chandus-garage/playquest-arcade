import test from 'node:test';
import assert from 'node:assert/strict';
import { games, renderCard, renderIndex } from '../scripts/build.mjs';

test('catalog preserves both supplied games in specified order', () => {
  assert.deepEqual(games.map(g => g.title), ['Rainbow Danger', 'Astro Adventure']);
});
test('credits exactly match the requested vision authors and Muse AI', () => {
  assert.equal(games[0].author, 'Sriya Yalamanchili');
  assert.equal(games[1].author, 'Sriyaan Yalamanchili');
  assert.ok(games.every(g => g.createdUsing === 'Muse AI'));
});
test('cards provide accessible local play and standalone download', () => {
  const html = renderIndex();
  assert.equal((html.match(/class="game-card"/g) || []).length, games.length);
  for (const game of games) {
    assert.ok(html.includes(`href="games/${game.slug}/index.html"`));
    assert.ok(html.includes(game.author));
  }
  assert.ok(html.includes('download="Rainbow-Danger.html"'));
  assert.ok(html.includes('download="Astro-Adventure.html"'));
});
test('HTML-escapes data to avoid injecting markup into catalog', () => {
  const rendered = renderCard({ ...games[0], title: '<script>alert(1)</script>' });
  assert.ok(rendered.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(!rendered.includes('<script>'));
});
