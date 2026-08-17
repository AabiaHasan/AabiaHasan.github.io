<<<<<<< HEAD
import React from 'react';
import { RouterProvider, Routes, Route } from './components/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';
import NotFound from './pages/NotFound';
=======
// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AboutMe from './pages/AboutMe';
import Fun_Stuff from './pages/Fun_stuff';
>>>>>>> 33e1659a66c37c911fde49f0e153d280117a4285

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
<<<<<<< HEAD
    <RouterProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </RouterProvider>
=======
    <Router>
      <div className= "content">
        <div className="App">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path='/' exact element={<Home/>} />
              <Route path='/AboutMe' element={<AboutMe/>} />
              <Route path='/Fun_stuff' element={<Fun_Stuff/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
>>>>>>> 33e1659a66c37c911fde49f0e153d280117a4285
  );
}

export default App;
