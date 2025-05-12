import React, { useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isLightTheme, setLightTheme] = useState(false);


  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleTheme = () => {
    document.body.classList.add('theme-transition');
    setLightTheme((prevTheme) => {
      const newTheme = !prevTheme;

      // Change wave image
      if (waveRef.current) {
        waveRef.current.src = newTheme
          ? 'https://cdn-icons-png.flaticon.com/128/4287/4287943.png'
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s';
      }

      // Remove transition after 800ms
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 800);

      return newTheme;
    });
  };

  // Apply theme class to body
  document.body.className = isLightTheme ? 'light-theme' : '';

  return (
    <div className="body-container">
   <Navbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isLightTheme={isLightTheme}/>
<Home/>
<Sidebar isSidebarVisible={isSidebarVisible}/>


    </div>
  );
}

export default App;
