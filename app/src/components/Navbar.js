import React, { useEffect, useState } from 'react';
import { Link, useActivePath } from './Router';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

function NavLink({ to, label, onClick }) {
  const active = useActivePath(to);
  return (
    <Link to={to} onClick={onClick} className={`navbar-link${active ? ' is-active' : ''}`}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          Aabia Hasan
          <span className="navbar-brand-sub">Photography</span>
        </Link>

        <nav className="navbar-links navbar-links-desktop">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </nav>

        <button
          className={`navbar-toggle${menuOpen ? ' is-open' : ''}`}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar-links-mobile${menuOpen ? ' is-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} {...item} onClick={() => setMenuOpen(false)} />
        ))}
      </nav>
    </header>
  );
}
