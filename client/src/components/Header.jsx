import React from 'react';
import Logo from '../assets/Logo.png';
import Logout from './Logout';
import UserInfo from './UserInfo';
import './style/Header.css';


const Header = () => {
  return(
    <header className="header">

      <div className='logo-container'>
        <img className="logo" src={Logo} alt="Logo Should be here"></img>
      </div>

      <div className='searchbar-container'>
        <input type="text" placeholder="Search" className="search" />
      </div>

      <div className='logout-container'>
        <UserInfo/>
        <Logout className='logout-element'/>
      </div>
    </header>
  )
};

export default Header;