import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">Soundio</div>
    <input type="text" placeholder="Search" className="search" />
    <div className="login">Login</div>
  </header>
);

export default Header;