import React from 'react';
import Logout from './Logout';
import './style/Header.css';
import Logo from './Logo.png';


const Header = () => (
  <header className="header">
    <img className="logo" src={Logo} alt="Logo Should be here" width="200" height="100"></img>
    <input type="text" placeholder="Search" className="search" />
    <Logout />
  </header>
);

export default Header;