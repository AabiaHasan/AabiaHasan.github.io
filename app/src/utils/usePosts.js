import { useEffect, useState } from 'react';
import posts from '../data/blogPosts';
import covers from '../data/blogCovers';
import { parseFrontmatter, markdownToHtml, estimateReadingTime } from './markdown';

async function loadPost(post) {
  const res = await fetch(post.url);
  const raw = await res.text();
  const { data, content } = parseFrontmatter(raw);
  return {
    ...post,
    title: data.title || post.slug,
    excerpt: data.excerpt || '',
    date: data.date || post.date,
    cover: covers[post.slug] || null,
    html: markdownToHtml(content),
    readingTime: estimateReadingTime(content),
  };
}

export function useAllPosts() {
  const [state, setState] = useState({ loading: true, posts: [] });

  useEffect(() => {
    let cancelled = false;
    Promise.all(posts.map(loadPost)).then((loaded) => {
      if (!cancelled) setState({ loading: false, posts: loaded });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function usePost(slug) {
  const [state, setState] = useState({ loading: true, post: null, notFound: false });

  useEffect(() => {
    const match = posts.find((p) => p.slug === slug);
    if (!match) {
      setState({ loading: false, post: null, notFound: true });
      return;
    }
    let cancelled = false;
    loadPost(match).then((loaded) => {
      if (!cancelled) setState({ loading: false, post: loaded, notFound: false });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}
