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

function App() {
  return (
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
  );
}

export default App;
