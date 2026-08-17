# Your photography site — how it works

This is now a **plain HTML/CSS/JS site** — no npm, no build step, no
framework. Open `index.html` in a browser (or use any simple local server)
and you're looking at exactly what's live. Nothing to install, nothing to
compile.

## Previewing it

Just open `index.html` in your browser — double-click it, or drag it into
a browser window. That's it.

(If you'd rather use a local server instead of opening the file directly,
that works too — any static server pointed at this folder will do — but
it's not required.)

## Adding photos (drop in a photo → run one script → done)

1. Drop image files into the right folder:
   - **Homepage hero banner:** `images/hero/`
   - **Gallery:** `images/gallery/<category>/` — the existing categories
     are `landscape`, `nature`, `night`, `portrait`, `street`, and
     `wildlife`. Drop a photo into one of those, or create a **brand-new
     folder** (e.g. `images/gallery/wedding/`) to get a brand-new filter
     tab on the Gallery page.
   - **About page portrait:** `images/about/` (first image found is used)
2. Run the update script:
   - **Windows:** double-click `scripts/update-photos.bat`
   - **Mac/Linux/terminal:** `node scripts/update-photos.js`
3. Refresh `index.html` / `gallery.html` in your browser — the new photos
   are there.

Filenames become captions (`misty-coastline.jpg` → "Misty Coastline"), so
name your files with dashes or underscores between words.

The Gallery, homepage featured strip, and hero banner are running your
real photos now. The About page portrait is still the original placeholder
— drop a real headshot/portrait into `images/about/` and re-run the script
whenever you're ready to swap it in.

**A note on raw originals:** keep full-resolution camera files (the
`DSC0xxxx.JPG`-style exports) out of a `pictures/`-style folder at the
project root rather than `images/` — `images/` is what actually ships on
the site, so it should only hold the resized, web-ready versions the
update script needs. `.gitignore` already excludes a root-level
`pictures/` folder so raw dumps don't get committed to the repo by
accident.

## Adding journal/blog posts

1. Add a new Markdown file to `content/blog/`, named like:
   ```
   2026-09-02-shooting-the-blue-hour.md
   ```
   with this at the top:
   ```
   ---
   title: Shooting the Blue Hour
   date: 2026-09-02
   excerpt: A one or two sentence summary shown on the journal list page.
   ---
   The rest of the file is your post, written in Markdown (headings,
   **bold**, *italic*, links, images, and "- " bullet lists are supported).
   ```
2. Optional cover photo: add an image with the *same slug* (the part of
   the filename after the date) to `images/blog/` — e.g.
   `shooting-the-blue-hour.jpg`.
3. Run the update script (see above), then refresh `journal.html`.

## Pairing a Spotify song with a photo

Open a photo in the Gallery (or the homepage's Featured Work section) and
it can carry a little embedded Spotify player right below it — the song
you were listening to, or one that just matches the photo.

1. Open `content/spotify-links.json`.
2. Add a line: the photo's filename as the key, a Spotify share link as
   the value:
   ```json
   {
     "misty-coastline.jpg": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"
   }
   ```
   Get the link from Spotify: right-click (or tap "...") on a song → Share
   → Copy Song Link. Album and playlist links work too.
3. Run the update script (see "Adding photos" above), then refresh.

Photos with a paired song get a small ♪ badge on their thumbnail. Full
details and more examples are in `content/SPOTIFY-LINKS-README.txt`.

## Putting it live on GitHub Pages

Because there's no build step, this is the simplest possible setup:

1. Go to your repo on GitHub → **Settings → Pages**.
2. Under "Build and deployment" → **Source**, choose **Deploy from a
   branch**, branch `main`, folder `/ (root)`.
3. Push this code to `main`. That's it — GitHub serves the HTML files
   directly, no build, no GitHub Actions needed.

Your ongoing workflow becomes: **drop in photos or a new post → run the
update script → `git add` → `git commit` → `git push`.**

## Contact form

The Contact page works out of the box with **no setup**: submitting it
opens the visitor's email client with a pre-filled message to
`aabiahasan8@gmail.com`.

If you'd rather have the form submit in-page (no email client popup), sign
up for a free form endpoint at [formspree.io](https://formspree.io), and
paste it into `js/config.js`:

```js
CONTACT_FORM_ENDPOINT: 'https://formspree.io/f/xxxxabcd',
```

## Where things live

```
index.html, gallery.html, about.html,
contact.html, journal.html, post.html   One real HTML file per page — no router needed
css/styles.css                          Every style in the site (colors, fonts, layout)
js/                                     Small, plain-JS files — one per page, plus:
  main.js                                 shared nav/footer behavior
  lightbox.js                             the click-to-enlarge photo viewer
  gallery.js                              gallery grid + category filtering
data/                                   AUTO-GENERATED — don't hand-edit these
  hero-images.js, gallery-images.js,
  about-image.js, blog-posts.js
images/                                 Your photos, organized by section
content/blog/                           Your journal posts (Markdown files)
content/spotify-links.json              Photo ↔ Spotify song pairings
scripts/update-photos.js                The script that turns images/ + content/
                                         into the data/*.js files above
js/config.js                            Contact form endpoint + site settings
```

To change the color palette, edit the CSS custom properties at the top of
`css/styles.css` (`--color-accent`, `--color-nature`, etc.).

## A couple of things worth doing next

- Swap the placeholder photos for your real work (see "Adding photos").
- Add real favicon/app icons if you'd like a custom browser tab icon.

## About the old `app/` folder

The site used to be a React app living in `app/`. It's no longer used —
this new site replaces it entirely and needs no build tooling. You can
delete the `app/` folder whenever you like; see `app/DEPRECATED.txt` for
details.
