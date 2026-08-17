// Fun easter egg: pops up a random photo from the gallery, polaroid-style.
// Triggered by any element with [data-random-photo-trigger].
window.RandomPhoto = (() => {
  let root = null;
  let lastIndex = -1;

  function getAll() {
    const data = window.GALLERY_IMAGES || {};
    return Object.keys(data).flatMap((c) => data[c]);
  }

  function pick() {
    const all = getAll();
    if (!all.length) return null;
    if (all.length === 1) return all[0];
    let i;
    do {
      i = Math.floor(Math.random() * all.length);
    } while (i === lastIndex);
    lastIndex = i;
    return all[i];
  }

  function render(photo) {
    if (!root || !photo) return;
    const img = root.querySelector('.random-photo-img');
    const caption = root.querySelector('.random-photo-caption');
    const card = root.querySelector('.random-photo-card');

    img.style.opacity = '0';
    window.setTimeout(() => {
      img.src = photo.src;
      img.alt = photo.title || '';
      caption.textContent = photo.title || '';
      img.style.opacity = '1';
    }, 150);

    card.style.setProperty('--tilt', `${(Math.random() * 6 - 3).toFixed(2)}deg`);
  }

  function shuffleAgain() {
    render(pick());
  }

  function close() {
    if (!root) return;
    const el = root;
    el.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
    window.setTimeout(() => el.remove(), 220);
    root = null;
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') close();
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      shuffleAgain();
    }
  }

  function open() {
    if (root) return;
    const first = pick();
    if (!first) return;

    root = document.createElement('div');
    root.className = 'random-photo-overlay';
    root.innerHTML = `
      <div class="random-photo-card">
        <span class="random-photo-tape" aria-hidden="true"></span>
        <button class="random-photo-close" aria-label="Close">&times;</button>
        <div class="random-photo-frame">
          <img class="random-photo-img" alt="" />
        </div>
        <p class="random-photo-caption"></p>
        <button class="random-photo-shuffle btn btn-solid" type="button">🎲 Another one</button>
      </div>
    `;
    document.body.appendChild(root);
    document.body.style.overflow = 'hidden';
    render(first);
    requestAnimationFrame(() => root.classList.add('is-open'));

    root.addEventListener('click', (e) => {
      if (e.target === root) close();
    });
    root.querySelector('.random-photo-close').addEventListener('click', close);
    root.querySelector('.random-photo-shuffle').addEventListener('click', shuffleAgain);
    document.addEventListener('keydown', onKeyDown);
  }

  return { open, close };
})();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-random-photo-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => window.RandomPhoto.open());
  });
});
