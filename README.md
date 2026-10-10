# mattgrosso.com

A one-page front door: who I am and a directory of the things I've built.
Built with Claude (Claude Code).

Hand-written HTML, CSS and one small script (`sort.js`), no build step. Edit `index.html` / `styles.css`
and push to `master`; GitHub Pages serves it at https://mattgrosso.com.
Styles are mobile first: the base rules are the phone layout, and the media
queries at the bottom of `styles.css` only add columns as screens grow.

`christmas-2019/` is Brock's original page from when he gave me the domain.
Keep it.

Card numbers (commits, first and last commit) come from git: each card names
its repos in `data-repos`, and `npm run stats` rewrites the numbers and puts
the cards in most-work order. Run it before pushing. Screenshots live in
`img/` as 800px (wide) or 480px (phone) WebP.
