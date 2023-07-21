import React from 'react';
import Logo from '../assets/Logo.png';
import Logout from './Logout';
import './style/Header.css';



const Header = () => (
  <header className="header">
    {/* <div className="logo">Soundio</div>  */}
    <div className='logo-container'>
      <img className="logo" src={Logo} alt="Logo Should be here"></img>
    </div>
    <input type="text" placeholder="Search" className="search" />
    <Logout />
  </header>
);

export default Header;