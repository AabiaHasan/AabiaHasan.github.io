<<<<<<< HEAD
import React, { useMemo } from 'react';
import HeroRotator from '../components/HeroRotator';
import GalleryGrid from '../components/GalleryGrid';
import { Link } from '../components/Router';
import { allImages } from '../data/galleryImages';
import { shuffle } from '../utils/format';
import { useAllPosts } from '../utils/usePosts';
import { formatDate } from '../utils/markdown';
import './Home.css';

export default function Home() {
  const featured = useMemo(() => shuffle(allImages).slice(0, 6), []);
  const { posts } = useAllPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <div className="fade-in">
      <HeroRotator>
        <span className="eyebrow">Photography Portfolio</span>
        <h1>Light, water, and everything in between.</h1>
        <p>
          I'm Aabia Hasan — a photographer drawn to soft blues, quiet
          landscapes, and the small moments in between. This is a running
          collection of that work.
        </p>
        <Link to="/gallery" className="btn btn-solid">
          View the Gallery
        </Link>
      </HeroRotator>

      <section className="container home-section">
        <div className="home-section-head">
          <div>
            <span className="eyebrow">Featured Work</span>
            <h2>A few recent favorites</h2>
          </div>
          <Link to="/gallery" className="btn">
            See full gallery
          </Link>
        </div>
        {featured.length > 0 ? (
          <GalleryGrid images={featured} />
        ) : (
          <p className="home-empty-note">
            No photos yet — drop some into <code>src/assets/images/gallery/&lt;category&gt;</code> to
            get started.
          </p>
        )}
      </section>

      <section className="home-about-teaser">
        <div className="container home-about-teaser-inner">
          <div>
            <span className="eyebrow">About</span>
            <h2>Behind the lens</h2>
            <p>
              My work leans toward natural light, muted color, and stillness —
              coastlines, tree lines, and the everyday, photographed slowly.
              I share the full story and the gear I shoot with on the About page.
            </p>
            <Link to="/about" className="btn">
              Read more
            </Link>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="container home-section">
          <div className="home-section-head">
            <div>
              <span className="eyebrow">From the Journal</span>
              <h2>Recent notes</h2>
            </div>
            <Link to="/journal" className="btn">
              Visit the journal
            </Link>
          </div>
          <div className="home-journal-list">
            {latestPosts.map((post) => (
              <Link to={`/journal/${post.slug}`} key={post.slug} className="home-journal-card">
                {post.cover && <img src={post.cover} alt={post.title} loading="lazy" />}
                <div className="home-journal-card-body">
                  <span className="home-journal-date">{formatDate(post.date)}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
=======
import React from 'react';
import logo from '../aabia.jpg';
import './Home.css';

function Home() {
  return (
    <div className="content">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="text-container">
          <p>
            Hello my name is Aabia, I'm a BME and CSE student at UofM! This here is a website I have been working on featuring me. Click on the sidebar at the top left and explore some more pages! Enjoy your stay :) 
          </p>
          <br></br>
          <p>
            Website Under Construction, stay tuned!
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
>>>>>>> 33e1659a66c37c911fde49f0e153d280117a4285
