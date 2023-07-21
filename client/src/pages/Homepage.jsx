import { default as React, ReactDOM, useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";

import "./style/homepage.css";

import Header from '../components/Header';
import MusicGrid from '../components/MusicGrid';
import Sidebar from '../components/Sidebar';
import NewPlaylist from '../components/NewPlaylist';

const Homepage = () => {

  const authContext = useContext(AuthContext);

  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const createNewPlaylist = (playlist_name) => {
    setPlaylists([...playlists, {name: playlist_name}]);
    setCurrentPlaylist(playlists.length); // Set current playlist to the new playlist
  };

  const viewPlaylist = (index) => {
    setCurrentPlaylist(index);
  };

  const viewMusicGrid = () => {
    setCurrentPlaylist(null);
  };

  return (
    <div className='homepage-container'>
      <Header/>
      <div className='homepage'>
        <div className='sidebar-holder'>
         <Sidebar playlists={playlists} setPlaylists={setPlaylists} createNewPlaylist={createNewPlaylist} viewPlaylist={viewPlaylist} viewMusicGrid={viewMusicGrid} />
        </div>
        <div className='main-holder'>
          {currentPlaylist !== null ? <NewPlaylist playlist={playlists[currentPlaylist]} /> : <MusicGrid />}
        </div>
      </div>
    </div>
  );
}

export default Homepage;