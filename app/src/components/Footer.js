import React from 'react';
import { Link } from './Router';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">Aabia Hasan</div>
          <p className="footer-tagline">Photography &amp; visual stories, in light and blue.</p>
        </div>

        <div className="footer-links">
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-social">
          <a href="mailto:aabiahasan8@gmail.com">Email</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {year} Aabia Hasan. All rights reserved.</span>
      </div>
    </footer>
  );
}
