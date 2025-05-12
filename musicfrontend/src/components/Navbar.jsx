import React from 'react'

const Navbar = ({toggleSidebar,toggleTheme,isLightTheme}) => {
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg px-4 mb-4">
        <div className="container-fluid">
          <a className="navbar-brand text-glow" onClick={toggleSidebar} href="#">
            Moodify
          </a>
          <button
            className="navbar-toggler"
            onClick={toggleSidebar}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample05"
            aria-controls="navbarsExample05"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="search-bar searchbtn" role="search">
            <input
              className="form-control flex-grow-1 searchbar"
              type="search"
              placeholder="Search Music By Artist"
              aria-label="Search"
            />
          </form>
          <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
            {isLightTheme ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
