document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('[data-contact-status]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const { CONTACT_FORM_ENDPOINT, CONTACT_EMAIL } = window.SITE_CONFIG;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent(`New message from ${name || 'your website'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'contact-status';

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        statusEl.textContent = 'Message sent — thank you!';
        statusEl.className = 'contact-status is-success';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      statusEl.innerHTML = `Something went wrong — email me directly at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
      statusEl.className = 'contact-status is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
});
