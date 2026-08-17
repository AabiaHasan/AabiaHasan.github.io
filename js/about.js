document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('[data-about-portrait]');
  if (!wrap) return;
  if (window.ABOUT_IMAGE) {
    wrap.innerHTML = `<img class="about-portrait" src="${window.ABOUT_IMAGE}" alt="Aabia Hasan" />`;
  } else {
    wrap.innerHTML = `<div class="about-portrait about-portrait-placeholder"></div>`;
  }
});
