import React, { useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
// import Favourites from './components/Favourites'; // create this file

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLightTheme, setLightTheme] = useState(false);
  const waveRef = useRef(null);
        
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleTheme = () => {
    document.body.classList.add('theme-transition');
    setLightTheme((prevTheme) => {
      const newTheme = !prevTheme;

      if (waveRef.current) {
        waveRef.current.src = newTheme
          ? 'https://cdn-icons-png.flaticon.com/128/4287/4287943.png'
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s';
      }

      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 800);

      return newTheme;
    });
  };

  document.body.className = isLightTheme ? 'light-theme' : '';

  return (
    <Router>
      <div className="body-container">
        <Navbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
        <div className="d-flex">
        <Sidebar isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
          <div className="content-container" style={{ padding: '20px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/favourites" element={<Favourites />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
