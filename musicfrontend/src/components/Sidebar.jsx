import React from 'react'
import './App.css'

const Sidebar = ({isSidebarVisible}) => {
  return (
   <div
  id="Sidebar"
  className={`d-flex flex-column flex-shrink-0 p-3 ${isSidebarVisible ? 'show' : ''}`}
  style={{ width: '280px' }}
>
  <ul className="nav nav-pills flex-column mb-auto">
    <li className="nav-item">
      <a href="#" className="nav-link active sidebar-link" aria-current="page">
        Home
      </a>
    </li>
    <li>
      <a href="#" className="nav-link sidebar-link">
        Favourites
      </a>
    </li>
     <li className="nav-item">
      <a href="/components/About.jsx" className="nav-link sidebar-link" aria-current="page">
      About
      </a>
    </li>
  </ul>
  <hr />
  <div className="dropdown">
    <a
      href="#"
      className="d-flex align-items-center text-decoration-none dropdown-toggle profile-link"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        src="https://github.com/mdo.png"
        alt=""
        width="32"
        height="32"
        className="rounded-circle me-2"
      />
      <strong>mdo</strong>
    </a>
  </div>
</div>
  )
}

export default Sidebar
