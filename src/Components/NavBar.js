import React, { useState } from 'react';
import './Navbar.css'; // Assuming you place the CSS in Navbar.css file

const Navbar = ({ setCurrentView }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-heading">Daily News</h2>
      <div className="menu-icon" onClick={toggleNav}>
        &#9776; {/* Hamburger icon */}
      </div>
      <ul className={`navbar-list ${isNavVisible ? 'show' : ''}`}>
        <li className="navbar-item" onClick={() => setCurrentView('general')}>General</li>
        <li className="navbar-item" onClick={() => setCurrentView('business')}>Business</li>
        <li className="navbar-item" onClick={() => setCurrentView('entertainment')}>Entertainment</li>
        <li className="navbar-item" onClick={() => setCurrentView('health')}>Health</li>
        <li className="navbar-item" onClick={() => setCurrentView('science')}>Science</li>
        <li className="navbar-item" onClick={() => setCurrentView('sports')}>Sports</li>
        <li className="navbar-item" onClick={() => setCurrentView('technology')}>Technology</li>
      </ul>
    </nav>
  );
};

export default Navbar;
