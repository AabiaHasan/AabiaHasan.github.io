import React, { useState } from 'react';
import { CONTACT_FORM_ENDPOINT, CONTACT_EMAIL } from '../config';
import './Contact.css';

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SENT: 'sent',
  ERROR: 'error',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(STATUS.IDLE);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent(`New message from ${form.name || 'your website'}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus(STATUS.SENDING);
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus(STATUS.SENT);
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(STATUS.ERROR);
      }
    } catch (err) {
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className="page-shell fade-in">
      <div className="container page-header">
        <span className="eyebrow">Contact</span>
        <h1>Let's work together</h1>
        <p>
          Available for portrait sessions, editorial work, and travel
          commissions. Tell me a bit about what you have in mind.
        </p>
      </div>

      <div className="container contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              required
              value={form.name}
              onChange={update('name')}
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={update('message')}
              placeholder="A little about your project, dates, and location..."
            />
          </label>

          <button type="submit" className="btn btn-solid" disabled={status === STATUS.SENDING}>
            {status === STATUS.SENDING ? 'Sending…' : 'Send message'}
          </button>

          {status === STATUS.SENT && <p className="contact-status is-success">Message sent — thank you!</p>}
          {status === STATUS.ERROR && (
            <p className="contact-status is-error">
              Something went wrong — email me directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          )}
        </form>

        <div className="contact-side">
          <h3>Prefer email?</h3>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <p>I typically reply within 1–2 days.</p>
        </div>
      </div>
    </div>
  );
}
