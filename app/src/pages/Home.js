// pages/Home.js
import React from 'react';
import logo from '../aabia.jpg';

function Home() {
  return (
    <div className="content">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p style={{ fontFamily: 'Fira Sans' }}>
            Hello my name is Aabia, I'm a BME and CSE student at UofM!
          </p>
          <p style={{ fontFamily: 'Fira Sans' }}>
            Website Under Construction
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
