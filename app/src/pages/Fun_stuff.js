// pages/Home.js
import React from 'react';
import './Fun_stuff.css';

function Fun_stuff() {
  return (
    <div className="content">
      <header className="Hobbies-title">
        <h1>Aabia, 5-9</h1>
      </header>
      <p>
        This is my spotify daylist - generated daily by spotify based off of my listening habits. Usually it's spot on, sometimes a little bit funky...
      </p>
      <iframe title='Daylist' className="spotify-bar" style={{"border-radius":'12px'}} src="https://open.spotify.com/embed/playlist/37i9dQZF1EP6YuccBxUcC1?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
}

export default Fun_stuff;
