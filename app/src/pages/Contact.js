// src/pages/Contact.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <header className="Contact-header">
        <h1>Contact Me!</h1>
        <p style={{ fontFamily: 'Fira Sans' }}>
          I'd love to 
          <span role="img" aria-label="coffee">
            {'\u2615'}
          </span>
          chat! 
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <a href="mailto:aabiahasan8@gmail.com" style={{ color: '#9370DB', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-envelope" style={{ marginRight: '5px' }}></i>
          </a>
          <a href="https://www.linkedin.com/in/aabiahasan/" style={{ color: '#9370DB', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <i className="fab fa-linkedin" style={{ marginRight: '5px' }}></i>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Contact;
