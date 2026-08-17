// Drop any .jpg/.jpeg/.png/.webp file into src/assets/images/hero and it will
// automatically appear in the homepage's rotating hero banner — no code
// changes needed, just rebuild (a `git push` triggers this automatically,
// see .github/workflows/deploy.yml).
const context = require.context('../assets/images/hero', false, /\.(png|jpe?g|webp)$/i);

const heroImages = context.keys().map((key) => context(key));

export default heroImages;
