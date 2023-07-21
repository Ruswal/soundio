import React from 'react';
import axios from '../api/axios';
import Logo from '../assets/Logo.png';
import Logout from './Logout';
import UserInfo from './UserInfo';
import './style/Header.css';


const Header = () => {

  const getSearchedSong = async (e) => {

    const SEARCH_URL = 'http://localhost:3001/search'
    var searchValue = e;

    try{
      const response = await axios.post(SEARCH_URL, {
        value: searchValue,
      }, {
        headers:{
          'Content-Type': 'application/json',
          withCredentials: false,
        }
      });

      if(response.length === 0 || response == null){
        console.log('no song found.');
      }
    }catch(err) {
      console.log(err);
    }
  }

  return(
    <header className="header">

      <div className='logo-container'>
        <img className="logo" src={Logo} alt="Logo Should be here"></img>
      </div>

      <div className='searchbar-container'>
        <input type="text" placeholder="Search" className="search" onChange={(e) => getSearchedSong(e.target.value)}/>
      </div>

      <div className='logout-container'>
        <UserInfo/>
        <Logout className='logout-element'/>
      </div>
    </header>
  )
};

export default Header;