import { default as React, ReactDOM, useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";

import "./style/homepage.css";

import Header from '../components/Header';
import MusicGrid from '../components/MusicGrid';
import Sidebar from '../components/Sidebar';

const Homepage = () => {

  const authContext = useContext(AuthContext);

  console.log(authContext.data);

  return(
    <div className='homepage-container'>
      <Header/>
      <div className='homepage'>
        <div className='sidebar-holder'>
          <Sidebar/>
        </div>
        <div className='main-holder'>
          <MusicGrid/>
        </div>
      </div>
    </div>
  );

}

export default Homepage;
