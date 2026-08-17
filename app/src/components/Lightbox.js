import React, { useEffect, useCallback } from 'react';
import './Lightbox.css';

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  const image = images[index];
  if (!image) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>
        ×
      </button>

      {images.length > 1 && (
        <button
          className="lightbox-nav lightbox-nav-prev"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
        >
          ‹
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.title} />
        <figcaption>{image.title}</figcaption>
      </figure>

      {images.length > 1 && (
        <button
          className="lightbox-nav lightbox-nav-next"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
