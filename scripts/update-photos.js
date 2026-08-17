#!/usr/bin/env node
/**
 * Scans the images/ and content/blog/ folders and regenerates the
 * plain-JS data files the site reads (data/*.js).
 *
 * Run this any time you add, remove, or rename photos or journal posts:
 *
 *   node scripts/update-photos.js
 *
 * (or just double-click update-photos.bat on Windows)
 *
 * No npm install, no dependencies — uses only Node's built-in modules.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const SPOTIFY_LINKS_FILE = path.join(ROOT, 'content', 'spotify-links.json');
const DATA_DIR = path.join(ROOT, 'data');

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort();
}

function titleCase(str) {
  return str
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ---------- Frontmatter + tiny Markdown parser (no dependencies) ----------

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw.trim() };
  const [, block, content] = match;
  const data = {};
  block.split(/\r?\n/).forEach((line) => {
    const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!m) return;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  });
  return { data, content: content.trim() };
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" loading="lazy" />');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlParts = [];
  let listBuffer = [];
  let paragraphBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      htmlParts.push(`<ul>${listBuffer.join('')}</ul>`);
      listBuffer = [];
    }
  };
  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      htmlParts.push(`<p>${inlineMarkdown(paragraphBuffer.join(' '))}</p>`);
      paragraphBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed === '') {
      flushParagraph();
      flushList();
      return;
    }
    const headerMatch = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (headerMatch) {
      flushParagraph();
      flushList();
      const level = headerMatch[1].length + 1;
      htmlParts.push(`<h${level}>${inlineMarkdown(headerMatch[2])}</h${level}>`);
      return;
    }
    const listMatch = /^[-*]\s+(.*)$/.exec(trimmed);
    if (listMatch) {
      flushParagraph();
      listBuffer.push(`<li>${inlineMarkdown(listMatch[1])}</li>`);
      return;
    }
    flushList();
    paragraphBuffer.push(trimmed);
  });
  flushParagraph();
  flushList();
  return htmlParts.join('\n');
}

function estimateReadingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ---------- Spotify song ↔ photo pairing ----------

// Accepts a normal Spotify share link (open.spotify.com/track/...), a
// spotify: URI (spotify:track:...), or an already-embeddable URL, and
// returns the iframe-embeddable URL. Returns null if it doesn't look like
// a Spotify link at all (so a typo doesn't silently break the build).
function toSpotifyEmbedUrl(rawUrl) {
  if (!rawUrl) return null;
  const url = rawUrl.trim();

  const uriMatch = /^spotify:(track|album|playlist|episode|show):([A-Za-z0-9]+)/.exec(url);
  if (uriMatch) return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}`;

  const linkMatch = /open\.spotify\.com\/(?:embed\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/.exec(url);
  if (linkMatch) return `https://open.spotify.com/embed/${linkMatch[1]}/${linkMatch[2]}`;

  return null;
}

// Reads content/spotify-links.json — a simple { "photo-filename": "spotify link" }
// map — and returns { [slugified filename without extension]: embedUrl }.
function loadSpotifyLinks() {
  if (!fs.existsSync(SPOTIFY_LINKS_FILE)) return {};
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(SPOTIFY_LINKS_FILE, 'utf8'));
  } catch (err) {
    console.warn(`\nWARNING: content/spotify-links.json is not valid JSON (${err.message}) — skipping song pairings this run.\n`);
    return {};
  }
  const result = {};
  Object.entries(raw).forEach(([key, value]) => {
    if (key.startsWith('_')) return; // allow "_comment"-style keys to be ignored
    const embedUrl = toSpotifyEmbedUrl(value);
    if (!embedUrl) {
      console.warn(`WARNING: content/spotify-links.json — "${key}" doesn't look like a Spotify link, skipping: ${value}`);
      return;
    }
    result[slugify(key.replace(/\.[^/.]+$/, ''))] = embedUrl;
  });
  return result;
}

// ---------------------------------------------------------------------

function writeDataFile(filename, varName, value) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const banner =
    '// AUTO-GENERATED by scripts/update-photos.js — do not edit by hand.\n' +
    '// Run `node scripts/update-photos.js` again after changing photos or posts.\n';
  const body = `${banner}window.${varName} = ${JSON.stringify(value, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, filename), body);
  console.log(`wrote data/${filename}`);
}

// --- Hero images ---
const heroFiles = listImages(path.join(IMAGES_DIR, 'hero'));
writeDataFile(
  'hero-images.js',
  'HERO_IMAGES',
  heroFiles.map((f) => `images/hero/${f}`)
);

// --- Gallery images (subfolders = categories) ---
const galleryRoot = path.join(IMAGES_DIR, 'gallery');
const categories = fs.existsSync(galleryRoot)
  ? fs
      .readdirSync(galleryRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
  : [];

const spotifyLinks = loadSpotifyLinks();
let spotifyPairedCount = 0;

const galleryData = {};
categories.forEach((category) => {
  const files = listImages(path.join(galleryRoot, category));
  galleryData[category] = files.map((f) => {
    const spotify = spotifyLinks[slugify(f.replace(/\.[^/.]+$/, ''))] || null;
    if (spotify) spotifyPairedCount++;
    return {
      src: `images/gallery/${category}/${f}`,
      title: titleCase(f),
      category,
      spotify,
    };
  });
});
writeDataFile('gallery-images.js', 'GALLERY_IMAGES', galleryData);

// --- About portrait (first image found) ---
const aboutFiles = listImages(path.join(IMAGES_DIR, 'about'));
writeDataFile('about-image.js', 'ABOUT_IMAGE', aboutFiles.length ? `images/about/${aboutFiles[0]}` : null);

// --- Blog covers (filename slug -> image path) ---
const blogImageFiles = listImages(path.join(IMAGES_DIR, 'blog'));
const blogCovers = {};
blogImageFiles.forEach((f) => {
  blogCovers[slugify(f.replace(/\.[^/.]+$/, ''))] = `images/blog/${f}`;
});

// --- Blog posts (markdown files) ---
const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/i;
const postFiles = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.md'))
  : [];

const posts = postFiles
  .map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    const match = FILENAME_PATTERN.exec(filename);
    const dateFromFilename = match ? match[1] : null;
    const slugSource = match ? match[2] : filename.replace(/\.md$/i, '');
    const slug = slugify(slugSource);
    return {
      slug,
      title: data.title || titleCase(slugSource),
      date: data.date || dateFromFilename || '',
      excerpt: data.excerpt || '',
      cover: blogCovers[slug] || null,
      html: markdownToHtml(content),
      readingTime: estimateReadingTime(content),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

writeDataFile('blog-posts.js', 'BLOG_POSTS', posts);

console.log(`\nDone: ${heroFiles.length} hero photo(s), ${categories.length} gallery categor${categories.length === 1 ? 'y' : 'ies'} (${Object.values(galleryData).reduce((n, a) => n + a.length, 0)} photos, ${spotifyPairedCount} paired with a song), ${posts.length} journal post(s).`);
