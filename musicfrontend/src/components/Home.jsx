import React from 'react'
import '../App.css';
import { useRef } from 'react';
import Content from './Content';
const Home = ({newTheme}) => {
      const waveRef = useRef(null);
       if (waveRef.current) {
        waveRef.current.src = newTheme
          ? 'https://cdn-icons-png.flaticon.com/128/4287/4287943.png'
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s';
      }
  return (
      <div className="topbar">
        <div className="section-player">
          <img
            src="./images/videoplayerfinal.png"
            className="showimage"
            alt="Image not showing"
          />
          <img
            className="musicwave mt-5"
            id="wave"
            ref={waveRef}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s"
            alt=""
          />
        </div>

        <div className="content-container">
          <Content/>
                </div>

        <div className="face-scanner scanner-container">
          <p className="scan-mood-heading">Scan Mood</p>
          <img
            src="https://cdn-icons-png.flaticon.com/128/711/711191.png"
            className="scanner-image"
            onClick={() => alert('Camera started')}
            height="50"
            width="50"
            alt=""
          />
        </div>
      </div>
  )
}

export default Home
