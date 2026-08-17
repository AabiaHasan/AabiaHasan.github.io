import { slugify } from '../utils/format';

// Drop a new Markdown file into src/content/blog and it automatically
// appears on the Journal page — no code changes needed, just rebuild
// (a `git push` triggers this automatically).
//
// Filename convention: YYYY-MM-DD-your-post-title.md
// The date and slug are both derived from the filename.
//
// Optional cover image: add a file with the *same slug* as the post to
// src/assets/images/blog/ (e.g. your-post-title.jpg) and it'll be used
// as the post's cover photo automatically.
const context = require.context('../content/blog', false, /\.md$/i);

const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/i;

const posts = context
  .keys()
  .map((key) => {
    const filename = key.replace(/^\.\//, '');
    const match = FILENAME_PATTERN.exec(filename);
    const date = match ? match[1] : null;
    const slugSource = match ? match[2] : filename.replace(/\.md$/i, '');
    return {
      url: context(key), // build emits the .md as a static asset; we fetch() its text at render time
      slug: slugify(slugSource),
      date,
      filename,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

export default posts;
