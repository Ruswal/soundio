import { default as React, ReactDOM, useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";

import "./homepage.css";

import Header from '../components/Header';
import MusicGrid from '../components/MusicGrid';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

const Homepage = () => {

  return(
    <div className='homepage-container'>
      <Header/>
      <Sidebar/>
      <MusicGrid/>
    </div>
  );

}

export default Homepage;
