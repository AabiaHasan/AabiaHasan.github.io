import { titleCase } from '../utils/format';

// Drop images into src/assets/images/gallery/<category>/your-photo.jpg
// - Adding a photo to an existing category folder (landscape/nature/portrait/
//   street) makes it show up in that category automatically.
// - Creating a brand-new folder (e.g. "wildlife") creates a brand-new
//   category tab on the Gallery page automatically. No code edits needed —
//   just rebuild (a `git push` triggers this automatically).
const context = require.context('../assets/images/gallery', true, /\.(png|jpe?g|webp)$/i);

const byCategory = {};

context.keys().forEach((key) => {
  // key looks like "./landscape/misty-ridgeline.jpg"
  const parts = key.replace(/^\.\//, '').split('/');
  const category = parts[0];
  const filename = parts[parts.length - 1].replace(/\.[^/.]+$/, '');

  if (!byCategory[category]) byCategory[category] = [];

  byCategory[category].push({
    src: context(key),
    title: titleCase(filename),
    category,
  });
});

export const categories = Object.keys(byCategory).sort();

export const allImages = categories.flatMap((category) => byCategory[category]);

export default byCategory;
