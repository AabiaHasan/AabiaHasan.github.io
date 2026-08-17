/**
 * Tiny, dependency-free frontmatter + Markdown helpers for the Journal.
 *
 * Deliberately not using a package like gray-matter/react-markdown here —
 * this keeps the whole photography site running on the exact same
 * dependencies the project already has, so no `npm install` of new
 * packages is ever required to build or deploy it.
 */

// Parses "---\nkey: value\n---\nbody" into { data: {...}, content: "body" }
export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }
  const [, frontmatterBlock, content] = match;
  const data = {};
  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    const lineMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!lineMatch) return;
    const [, key, rawValue] = lineMatch;
    let value = rawValue.trim();
    // strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  });
  return { data, content: content.trim() };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineMarkdown(text) {
  let out = escapeHtml(text);
  // images ![alt](src)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" loading="lazy" />');
  // links [text](href)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // bold **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italic *text*
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

// Converts a small, common subset of Markdown to HTML: headers, paragraphs,
// bold/italic, links, images, and unordered lists. Enough for journal posts
// without pulling in a full markdown parser dependency.
export function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlParts = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      htmlParts.push(`<ul>${listBuffer.join('')}</ul>`);
      listBuffer = [];
    }
  };

  let paragraphBuffer = [];
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
      const level = headerMatch[1].length + 1; // start headings at h2
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

export function estimateReadingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
