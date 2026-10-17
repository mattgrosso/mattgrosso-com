# mattgrosso.com

A one-page front door: who I am and a directory of the things I've built.

Hand-written HTML, CSS and one small script (`sort.js`), no build step. Edit `index.html` / `styles.css`,
then `yarn deploy` (with `~/aws-cli` on PATH): S3 bucket `mattgrosso-com` behind
CloudFront `E3ETNBYOFAD0IZ`, like every other app (moved off GitHub Pages
2026-10-17). A CloudFront Function (`mattgrosso-com-viewer`) sends www to the
bare domain and serves a folder's `index.html`, redirecting `/folder` to
`/folder/` so relative links inside it still resolve.
Styles are mobile first: the base rules are the phone layout, and the media
queries at the bottom of `styles.css` only add columns as screens grow.

`christmas-2019/` is Brock's original page from when he gave me the domain.
Keep it.

Card numbers (commits, first and last commit) come from git: each card names
its repos in `data-repos`, and `npm run stats` rewrites the numbers and puts
the cards in most-work order. Run it before pushing. Screenshots live in
`img/` as 800px (wide) or 480px (phone) WebP.
