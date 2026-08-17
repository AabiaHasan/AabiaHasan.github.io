import React, { useEffect, useState } from 'react';
import heroImages from '../data/heroImages';
import './HeroRotator.css';

const ROTATE_MS = 6000;

export default function HeroRotator({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-rotator">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`hero-rotator-slide${i === index ? ' is-active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="hero-rotator-overlay" />
      <div className="hero-rotator-content container">{children}</div>

      {heroImages.length > 1 && (
        <div className="hero-rotator-dots">
          {heroImages.map((src, i) => (
            <button
              key={src}
              aria-label={`Show hero image ${i + 1}`}
              className={`hero-rotator-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
