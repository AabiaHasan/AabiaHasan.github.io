// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AboutMe from './pages/AboutMe';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className= "content">
        <div className="App">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path='/' exact element={<Home/>} />
              <Route path='/AboutMe' element={<AboutMe/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
