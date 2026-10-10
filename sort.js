// Sorts the app cards. The HTML already arrives in "most work" order, so with
// JavaScript off the page is complete; this only adds the other two orders.
const list = document.querySelector('.grid');
const picker = document.querySelector('.sort');
const status = document.getElementById('sort-status');

const commits = (li) => Number(li.dataset.commits);
const name = (li) => li.querySelector('h3').textContent;
// Ties fall back to most work, then the name, so the order never wobbles.
const work = (a, b) => commits(b) - commits(a) || name(a).localeCompare(name(b));
const orders = {
  work: { label: 'most work', compare: work },
  recent: { label: 'latest update', compare: (a, b) => b.dataset.last.localeCompare(a.dataset.last) || work(a, b) },
  age: { label: 'oldest first', compare: (a, b) => a.dataset.first.localeCompare(b.dataset.first) || work(a, b) },
};

function sortBy(key) {
  const cards = [...list.children].sort(orders[key].compare);
  const apply = () => list.append(...cards);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !calm) document.startViewTransition(apply);
  else apply();
  status.textContent = `Sorted by ${orders[key].label}.`;
}

// Each card needs its own view-transition-name for the cards to glide into place.
[...list.children].forEach((li, i) => { li.style.viewTransitionName = `card-${i}`; });

picker.hidden = false;
picker.addEventListener('change', (e) => sortBy(e.target.value));
