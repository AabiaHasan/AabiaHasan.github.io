// App.js
import React, { useState } from 'react';
import logo from './aabia.jpg';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="App-header">
          <div className="content">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <p style={{ fontFamily: 'Fira Sans' }}>
                Hello my name is Aabia, I'm a BME and CSE student at UofM!
              </p>
              <p style={{ fontFamily: 'Fira Sans' }}>
                Website Under Construction
              </p>
              <a href="https://www.linkedin.com/in/aabiahasan/">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
