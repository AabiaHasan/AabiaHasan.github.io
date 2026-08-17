import React from 'react';
import { Link } from '../components/Router';
import { useAllPosts } from '../utils/usePosts';
import { formatDate } from '../utils/markdown';
import './Journal.css';

export default function Journal() {
  const { loading, posts } = useAllPosts();

  return (
    <div className="page-shell fade-in">
      <div className="container page-header">
        <span className="eyebrow">Journal</span>
        <h1>Notes from the field</h1>
        <p>
          Stories, process notes, and behind-the-scenes from shoots. Drop a
          new Markdown file into <code>src/content/blog</code> to publish a
          post here.
        </p>
      </div>

      <div className="container">
        {loading && <p className="home-empty-note">Loading posts…</p>}

        {!loading && posts.length === 0 && (
          <p className="home-empty-note">
            No journal entries yet — add a <code>.md</code> file to{' '}
            <code>src/content/blog</code>.
          </p>
        )}

        <div className="journal-list">
          {posts.map((post) => (
            <Link to={`/journal/${post.slug}`} key={post.slug} className="journal-card">
              <div className="journal-card-media">
                {post.cover ? (
                  <img src={post.cover} alt={post.title} loading="lazy" />
                ) : (
                  <div className="journal-card-media-placeholder" />
                )}
              </div>
              <div className="journal-card-body">
                <span className="journal-card-date">
                  {formatDate(post.date)} · {post.readingTime} min read
                </span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="journal-card-link">Read the story →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
