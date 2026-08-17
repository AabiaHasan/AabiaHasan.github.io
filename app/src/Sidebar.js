// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul>
          <li><Link to="/" >HOME</Link></li>
          <li><Link to="/AboutMe">THE 9-5</Link></li>
          <li><Link to="Fun_stuff">THE 5-9</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>
      {!isOpen && (
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}
    </div>
  );
};

export default Sidebar;