// Shared behavior for every page: mobile nav toggle, scroll shadow on the
// navbar, active-link highlighting, and the footer year. Plain JS, no
// build step, no dependencies — works by just opening the HTML file.

window.SiteUtils = {
  shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = result[i];
      result[i] = result[j];
      result[j] = tmp;
    }
    return result;
  },

  formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  },

  qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const mobileLinks = document.querySelector('.navbar-links-mobile');

  if (toggle && mobileLinks) {
    toggle.addEventListener('click', () => {
      const open = mobileLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileLinks.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Active nav link: every <body> sets data-page="home|gallery|about|contact|journal"
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach((el) => el.classList.add('is-active'));
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
