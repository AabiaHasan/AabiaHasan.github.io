import React, { useState } from 'react';
import Lightbox from './Lightbox';
import './GalleryGrid.css';

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, i) => (
          <button
            key={image.src}
            className="gallery-grid-item"
            onClick={() => setActiveIndex(i)}
            aria-label={`Open photo: ${image.title}`}
          >
            <img src={image.src} alt={image.title} loading="lazy" />
            <span className="gallery-grid-caption">{image.title}</span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
