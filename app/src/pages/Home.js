import React from 'react';
import logo from '../aabia.jpg';
import './Home.css';

function Home() {
  return (
    <div className="content">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="text-container">
          <p>
            Hello my name is Aabia, I'm a BME and CSE student at UofM! This here is a website I have been working on featuring me. Click on the sidebar at the top left and explore some more pages! Enjoy your stay :) 
          </p>
          <br></br>
          <p>
            Website Under Construction, stay tuned!
          </p>
        </div>
      </header>
    </div>
  );
}

export default Home;
