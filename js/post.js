document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.querySelector('[data-post-header]');
  const coverWrapEl = document.querySelector('[data-post-cover-wrap]');
  const bodyEl = document.querySelector('[data-post-body]');
  if (!headerEl || !bodyEl) return;

  const slug = window.SiteUtils.qs('slug');
  const posts = window.BLOG_POSTS || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    headerEl.innerHTML = `
      <span class="eyebrow">Journal</span>
      <h1>Post not found</h1>
      <p>That entry doesn't exist. <a href="journal.html">Back to the journal</a>.</p>
    `;
    return;
  }

  document.title = `${post.title} — Aabia Hasan Photography`;

  headerEl.innerHTML = `
    <a href="journal.html" class="journal-post-back">← Journal</a>
    <span class="eyebrow">${window.SiteUtils.formatDate(post.date)} · ${post.readingTime} min read</span>
    <h1>${post.title}</h1>
  `;

  if (post.cover && coverWrapEl) {
    coverWrapEl.innerHTML = `<img class="journal-post-cover" src="${post.cover}" alt="${post.title}" />`;
  }

  bodyEl.innerHTML = post.html;
});
