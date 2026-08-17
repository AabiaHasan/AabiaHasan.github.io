import { slugify } from '../utils/format';

const context = require.context('../assets/images/blog', false, /\.(png|jpe?g|webp)$/i);

const covers = {};
context.keys().forEach((key) => {
  const filename = key.replace(/^\.\//, '').replace(/\.[^/.]+$/, '');
  covers[slugify(filename)] = context(key);
});

export default covers;
