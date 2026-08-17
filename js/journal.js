document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('[data-journal-list]');
  if (!listEl) return;

  const posts = window.BLOG_POSTS || [];

  if (!posts.length) {
    listEl.innerHTML =
      '<p class="home-empty-note">No journal entries yet. Add a <code>.md</code> file to <code>content/blog</code> and run the update script.</p>';
    return;
  }

  listEl.innerHTML = posts
    .map(
      (post) => `
    <a class="journal-card" href="post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="journal-card-media">
        ${
          post.cover
            ? `<img src="${post.cover}" alt="${post.title}" loading="lazy" />`
            : '<div class="journal-card-media-placeholder"></div>'
        }
      </div>
      <div class="journal-card-body">
        <span class="journal-card-date">${window.SiteUtils.formatDate(post.date)} · ${post.readingTime} min read</span>
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <span class="journal-card-link">Read the story →</span>
      </div>
    </a>`
    )
    .join('');
});
