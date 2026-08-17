Pair a Spotify song with a photo so it plays right in the lightbox when
someone opens that picture in the gallery.

How to do it:

1. Open content/spotify-links.json in any text editor.
2. Add one line per photo: the photo's filename (with or without the
   folder path — just the filename is enough) as the key, and a Spotify
   link as the value. Get the link from Spotify: right-click a song (or
   tap the "..." menu on mobile) → Share → Copy Song Link.
3. Run the update script (scripts/update-photos.bat, or
   `node scripts/update-photos.js`) and refresh the site.

Example — pairing two photos with songs:

{
  "misty-coastline.jpg": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
  "sage-treeline": "https://open.spotify.com/track/2plbrEY59IikOBgBGLjaoe"
}

Notes:
- The filename extension (.jpg) is optional — "misty-coastline" and
  "misty-coastline.jpg" both work.
- Album and playlist links work too, not just individual tracks.
- Not every photo needs a song — only add the ones you want paired. Photos
  without an entry here just show normally, no music player.
- Any key starting with an underscore (like "_comment") is ignored, so
  feel free to leave yourself notes.
