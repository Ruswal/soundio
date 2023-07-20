import React from 'react';
import Logout from './Logout';
import './style/Header.css';


const Header = () => (
  <header className="header">
    {/* <div className="logo">Soundio</div>  */}
    <img className="logo" src="New_Logo_Soundio.png" alt="Logo Should be here" width="200" height="100"></img>
    <input type="text" placeholder="Search" className="search" />
    <Logout />
  </header>
);

export default Header;