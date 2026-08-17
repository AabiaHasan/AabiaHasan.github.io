// A small, dependency-free lightbox. Call Lightbox.open(images, startIndex).
window.Lightbox = (() => {
  let images = [];
  let index = 0;
  let root = null;

  function render() {
    const image = images[index];
    if (!image || !root) return;
    root.querySelector('.lightbox-figure img').src = image.src;
    root.querySelector('.lightbox-figure img').alt = image.title || '';
    root.querySelector('.lightbox-figure figcaption').textContent = image.title || '';

    const songEl = root.querySelector('.lightbox-song');
    if (image.spotify) {
      songEl.hidden = false;
      songEl.innerHTML = `
        <span class="lightbox-song-label">♪ Paired song</span>
        <iframe src="${image.spotify}" width="100%" height="80" frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy" title="Paired Spotify song"></iframe>
      `;
    } else {
      songEl.hidden = true;
      songEl.innerHTML = '';
    }
  }

  function goPrev() {
    index = (index - 1 + images.length) % images.length;
    render();
  }

  function goNext() {
    index = (index + 1) % images.length;
    render();
  }

  function close() {
    if (!root) return;
    root.remove();
    root = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  }

  function open(imageList, startIndex) {
    images = imageList;
    index = startIndex || 0;

    root = document.createElement('div');
    root.className = 'lightbox';
    root.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      ${images.length > 1 ? '<button class="lightbox-nav lightbox-nav-prev" aria-label="Previous photo">&lsaquo;</button>' : ''}
      <figure class="lightbox-figure">
        <img alt="" />
        <figcaption></figcaption>
        <div class="lightbox-song" hidden></div>
      </figure>
      ${images.length > 1 ? '<button class="lightbox-nav lightbox-nav-next" aria-label="Next photo">&rsaquo;</button>' : ''}
    `;
    document.body.appendChild(root);
    document.body.style.overflow = 'hidden';
    render();

    root.addEventListener('click', (e) => {
      if (e.target === root) close();
    });
    root.querySelector('.lightbox-close').addEventListener('click', close);
    const prevBtn = root.querySelector('.lightbox-nav-prev');
    const nextBtn = root.querySelector('.lightbox-nav-next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goNext(); });

    document.addEventListener('keydown', onKeyDown);
  }

  return { open, close };
})();
