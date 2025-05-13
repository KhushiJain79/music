import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../App.css';

const Sidebar = ({ isSidebarVisible}) => {

  return (
    <div
      id="Sidebar"
      className={`d-flex flex-column flex-shrink-0 p-3 ${isSidebarVisible ? 'show' : ''}`}
      style={{ width: '280px' }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link active sidebar-link" aria-current="page">
            Home
          </Link>
        </li>
        <li>
          <Link to="/favourites" className="nav-link sidebar-link">
            Favourites
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link sidebar-link" aria-current="page">
            About
          </Link>
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
  );
};

export default Sidebar;
