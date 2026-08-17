import React from 'react';
import { Link } from '../components/Router';
import './About.css';

// Drop a photo of yourself into src/assets/images/about and it becomes the
// portrait on this page automatically (the first image found is used).
const aboutContext = require.context('../assets/images/about', false, /\.(png|jpe?g|webp)$/i);
const aboutKeys = aboutContext.keys();
const portrait = aboutKeys.length ? aboutContext(aboutKeys[0]) : null;

export default function About() {
  return (
    <div className="page-shell fade-in">
      <div className="container about-layout">
        <div className="about-portrait-wrap">
          {portrait ? (
            <img className="about-portrait" src={portrait} alt="Aabia Hasan" />
          ) : (
            <div className="about-portrait about-portrait-placeholder" />
          )}
        </div>

        <div className="about-copy">
          <span className="eyebrow">About</span>
          <h1>Hi, I'm Aabia.</h1>
          <p>
            I picked up a camera looking for an excuse to slow down, and it
            turned into the thing I notice the world through now. I'm drawn
            to water, tree lines, quiet architecture, and the particular blue
            that shows up right before or after golden hour — the in-between
            light most people miss.
          </p>
          <p>
            My work spans landscape, portrait, and street photography, but
            it's all trying to do the same thing: find the calm, considered
            frame inside a busy scene. Most of what's here was shot on
            location, natural light only, minimal editing beyond color and
            tone.
          </p>
          <p>
            When I'm not shooting, I'm probably scouting the next coastline,
            editing with too much tea, or writing about it on the{' '}
            <Link to="/journal">journal</Link>.
          </p>

          <div className="about-facts">
            <div>
              <span className="about-fact-label">Based in</span>
              <span className="about-fact-value">Available worldwide</span>
            </div>
            <div>
              <span className="about-fact-label">Focus</span>
              <span className="about-fact-value">Landscape · Portrait · Street</span>
            </div>
            <div>
              <span className="about-fact-label">Style</span>
              <span className="about-fact-value">Natural light, cool tones</span>
            </div>
          </div>

          <Link to="/contact" className="btn btn-solid">
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
