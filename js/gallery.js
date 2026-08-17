// Renders the filterable gallery grid on gallery.html (and is reused for
// the "featured work" section on the homepage).
window.GalleryView = (() => {
  function titleCaseCategory(cat) {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  function renderGrid(container, images) {
    container.innerHTML = '';
    if (!images.length) {
      container.innerHTML =
        '<p class="home-empty-note">No photos in this category yet — drop some into <code>images/gallery/&lt;category&gt;/</code> and run the update script.</p>';
      return;
    }
    images.forEach((image, i) => {
      const btn = document.createElement('button');
      btn.className = 'gallery-grid-item';
      btn.setAttribute('aria-label', `Open photo: ${image.title}`);
      btn.innerHTML = `<img src="${image.src}" alt="${image.title}" loading="lazy" /><span class="gallery-grid-caption">${image.title}</span>`;
      btn.addEventListener('click', () => window.Lightbox.open(images, i));
      container.appendChild(btn);
    });
  }

  // Renders a full gallery page: category tabs + grid, wired to
  // window.GALLERY_IMAGES.
  function mountFullGallery(tabsEl, gridEl) {
    const data = window.GALLERY_IMAGES || {};
    const categories = Object.keys(data).sort();
    const allImages = categories.flatMap((c) => data[c]);

    function renderTabs(active) {
      tabsEl.innerHTML = '';
      const allBtn = document.createElement('button');
      allBtn.className = `gallery-tab${active === 'all' ? ' is-active' : ''}`;
      allBtn.textContent = `All (${allImages.length})`;
      allBtn.addEventListener('click', () => selectCategory('all'));
      tabsEl.appendChild(allBtn);

      categories.forEach((cat) => {
        const btn = document.createElement('button');
        btn.className = `gallery-tab${active === cat ? ' is-active' : ''}`;
        btn.textContent = `${titleCaseCategory(cat)} (${data[cat].length})`;
        btn.addEventListener('click', () => selectCategory(cat));
        tabsEl.appendChild(btn);
      });
    }

    function selectCategory(cat) {
      renderTabs(cat);
      const source = cat === 'all' ? allImages : data[cat] || [];
      renderGrid(gridEl, window.SiteUtils.shuffle(source));
    }

    selectCategory('all');
  }

  return { renderGrid, mountFullGallery };
})();
