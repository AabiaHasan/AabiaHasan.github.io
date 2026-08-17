import React, { useMemo, useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import byCategory, { categories, allImages } from '../data/galleryImages';
import { shuffle, titleCase } from '../utils/format';
import './Gallery.css';

export default function Gallery() {
  const [active, setActive] = useState('all');

  const images = useMemo(() => {
    const source = active === 'all' ? allImages : byCategory[active] || [];
    return shuffle(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="page-shell fade-in">
      <div className="container page-header">
        <span className="eyebrow">Gallery</span>
        <h1>The full collection</h1>
        <p>
          A running archive, organized loosely by category. New folders under{' '}
          <code>src/assets/images/gallery/</code> become new tabs here automatically.
        </p>
      </div>

      <div className="container gallery-tabs">
        <button
          className={`gallery-tab${active === 'all' ? ' is-active' : ''}`}
          onClick={() => setActive('all')}
        >
          All ({allImages.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`gallery-tab${active === cat ? ' is-active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {titleCase(cat)} ({byCategory[cat].length})
          </button>
        ))}
      </div>

      <div className="container">
        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <p className="home-empty-note">
            No photos in this category yet — drop some into{' '}
            <code>src/assets/images/gallery/{active === 'all' ? '<category>' : active}</code>.
          </p>
        )}
      </div>
    </div>
  );
}
