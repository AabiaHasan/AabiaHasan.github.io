import React from 'react';
import { Link } from '../components/Router';
import './shared.css';

export default function NotFound() {
  return (
    <div className="page-shell fade-in">
      <div className="container page-header">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>
          That page doesn't exist. <Link to="/">Back to home</Link>.
        </p>
      </div>
    </div>
  );
}
