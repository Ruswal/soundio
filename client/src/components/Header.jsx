import React from 'react';
import Logout from './Logout';
import './style/Header.css';


const Header = () => (
  <header className="header">
    <div className="logo">Soundio</div>
    <input type="text" placeholder="Search" className="search" />
    <Logout />
  </header>
);

export default Header;