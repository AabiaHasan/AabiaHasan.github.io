// pages/AboutMe.js
import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me-page">
      <header className="about-me-header">
        <h1>About Me</h1>
      </header>
      <div className="about-me-content">
        <section className="section intro-section">
          <h2>Introduction</h2>
          <p>This is an introduction about me.</p>
        </section>
        <section className="section education-section">
          <h2>Education</h2>
          <p>Details about my education.</p>
        </section>
        <section className="section experience-section">
          <h2>Experience</h2>
          <p>Details about my experience.</p>
        </section>
        <section className="section skills-section">
          <h2>Skills</h2>
          <p>Details about my skills.</p>
        </section>
        <section className="section interests-section">
          <h2>Interests</h2>
          <p>Details about my interests.</p>
        </section>
      </div>
    </div>
  );
}

export default AboutMe;
