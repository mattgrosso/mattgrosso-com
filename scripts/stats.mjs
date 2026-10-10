// Refresh each card's numbers from git: total commits, first commit, last commit.
//
//   node scripts/stats.mjs      (or: npm run stats)
//
// Each card names its repos in data-repos (folders under ~/code, space separated).
// This rewrites the card's data-* attributes, which the sort buttons read, and its
// visible stats line, so the page shows real numbers even with JavaScript off.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

const page = new URL('../index.html', import.meta.url);
const code = join(homedir(), 'code');

const git = (repo, ...args) =>
  execFileSync('git', ['-C', join(code, repo), ...args], { encoding: 'utf8' }).trim();

function stats(repos) {
  let commits = 0;
  let first = '9999-99-99';
  let last = '0000-00-00';
  for (const repo of repos) {
    commits += Number(git(repo, 'rev-list', '--count', 'HEAD'));
    const dates = git(repo, 'log', '--format=%cs').split('\n');
    if (dates.at(-1) < first) first = dates.at(-1);
    if (dates[0] > last) last = dates[0];
  }
  return { commits, first, last };
}

const date = (iso, parts) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', parts);
const month = (iso) => date(iso, { month: 'short', year: 'numeric' });
const day = (iso) => date(iso, { month: 'short', day: 'numeric', year: 'numeric' });

const statsLine = ({ commits, first, last }) =>
  `<p class="stats"><span>${commits.toLocaleString('en-US')} commits</span>` +
  `<span>Started ${month(first)}</span><span>Updated ${day(last)}</span></p>`;

const html = readFileSync(page, 'utf8');
const card = /(\s*)<li class="card"([^>]*?)data-repos="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g;

const cards = [...html.matchAll(card)].map(([, indent, before, repoList, body]) => {
  const s = stats(repoList.split(' '));
  const attrs = `data-repos="${repoList}" data-commits="${s.commits}" data-first="${s.first}" data-last="${s.last}"`;
  const inner = body.replace(/<p class="stats">[\s\S]*?<\/p>/, statsLine(s));
  return { commits: s.commits, html: `${indent}<li class="card"${before}${attrs}>${inner}</li>` };
});

// Ship the list in the default order (most work first), so the page is right
// before sort.js runs, or if it never does.
cards.sort((a, b) => b.commits - a.commits);
let i = 0;
const sorted = html.replace(card, () => cards[i++].html);

writeFileSync(page, sorted);
console.log(cards.map((c) => `${c.commits}`).join(' '));
