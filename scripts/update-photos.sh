#!/bin/sh
# Run this any time you add, remove, or rename photos or journal posts.
# (Windows users: double-click update-photos.bat instead.)
cd "$(dirname "$0")"
node update-photos.js
