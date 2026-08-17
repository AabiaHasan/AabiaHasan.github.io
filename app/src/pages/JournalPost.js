import React from 'react';
import { Link } from '../components/Router';
import { usePost } from '../utils/usePosts';
import { formatDate } from '../utils/markdown';
import './JournalPost.css';

export default function JournalPost({ params }) {
  const { loading, post, notFound } = usePost(params.slug);

  if (loading) {
    return (
      <div className="page-shell fade-in">
        <div className="container page-header">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="page-shell fade-in">
        <div className="container page-header">
          <span className="eyebrow">Journal</span>
          <h1>Post not found</h1>
          <p>
            That entry doesn't exist. <Link to="/journal">Back to the journal</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="page-shell fade-in">
      <div className="container journal-post-header">
        <Link to="/journal" className="journal-post-back">
          ← Journal
        </Link>
        <span className="eyebrow">{formatDate(post.date)} · {post.readingTime} min read</span>
        <h1>{post.title}</h1>
      </div>

      {post.cover && (
        <div className="container journal-post-cover-wrap">
          <img className="journal-post-cover" src={post.cover} alt={post.title} />
        </div>
      )}

      <div className="container journal-post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
