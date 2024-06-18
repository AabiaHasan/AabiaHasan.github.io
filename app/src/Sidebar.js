// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#contact">Contact</a></li>
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
