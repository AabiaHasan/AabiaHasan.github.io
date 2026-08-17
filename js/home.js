document.addEventListener('DOMContentLoaded', () => {
  // --- Hero rotator ---
  const heroImages = window.HERO_IMAGES || [];
  const slidesEl = document.querySelector('.hero-rotator-slides');
  const dotsEl = document.querySelector('.hero-rotator-dots');
  let heroIndex = 0;

  if (slidesEl && heroImages.length) {
    heroImages.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = `hero-rotator-slide${i === 0 ? ' is-active' : ''}`;
      div.style.backgroundImage = `url(${src})`;
      slidesEl.appendChild(div);
    });

    if (dotsEl && heroImages.length > 1) {
      heroImages.forEach((src, i) => {
        const dot = document.createElement('button');
        dot.className = `hero-rotator-dot${i === 0 ? ' is-active' : ''}`;
        dot.setAttribute('aria-label', `Show hero image ${i + 1}`);
        dot.addEventListener('click', () => showHero(i));
        dotsEl.appendChild(dot);
      });
    }

    function showHero(i) {
      heroIndex = i;
      slidesEl.querySelectorAll('.hero-rotator-slide').forEach((el, idx) => {
        el.classList.toggle('is-active', idx === i);
      });
      if (dotsEl) {
        dotsEl.querySelectorAll('.hero-rotator-dot').forEach((el, idx) => {
          el.classList.toggle('is-active', idx === i);
        });
      }
    }

    if (heroImages.length > 1) {
      setInterval(() => showHero((heroIndex + 1) % heroImages.length), 6000);
    }
  }

  // --- Featured work (random slice of the full gallery) ---
  const featuredGrid = document.querySelector('[data-featured-grid]');
  if (featuredGrid) {
    const data = window.GALLERY_IMAGES || {};
    const all = Object.keys(data).flatMap((c) => data[c]);
    const featured = window.SiteUtils.shuffle(all).slice(0, 6);
    if (featured.length) {
      window.GalleryView.renderGrid(featuredGrid, featured);
    } else {
      featuredGrid.innerHTML =
        '<p class="home-empty-note">No photos yet. Drop some into <code>images/gallery/&lt;category&gt;/</code> and run the update script.</p>';
    }
  }

  // --- Journal teaser (latest 2 posts) ---
  const journalTeaser = document.querySelector('[data-journal-teaser]');
  const journalSection = document.querySelector('[data-journal-section]');
  if (journalTeaser) {
    const posts = (window.BLOG_POSTS || []).slice(0, 2);
    if (!posts.length) {
      if (journalSection) journalSection.style.display = 'none';
    } else {
      journalTeaser.innerHTML = posts
        .map(
          (post) => `
        <a class="home-journal-card" href="post.html?slug=${encodeURIComponent(post.slug)}">
          ${post.cover ? `<img src="${post.cover}" alt="${post.title}" loading="lazy" />` : ''}
          <div class="home-journal-card-body">
            <span class="home-journal-date">${window.SiteUtils.formatDate(post.date)}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
          </div>
        </a>`
        )
        .join('');
    }
  }
});
