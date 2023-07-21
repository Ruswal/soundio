import { default as React, ReactDOM, useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from '../api/axios.js';
import AudioPlayer from "../components/AudioPlayer.jsx";
import AuthContext from "../context/AuthProvider.jsx";

import "./style/homepage.css";
import './style/Sidebar.css';

import Header from '../components/Header';
import MusicGrid from '../components/MusicGrid';
import FileUploadPage from './artist-studio.jsx';

const Homepage = () => {

  const POST_URL = 'http://localhost:3001/create-playlist';
  const [component, setComponent] = useState('');

  const authContext = useContext(AuthContext);

  const userDataString = localStorage.getItem('data');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  if (userData && userData.length > 0) {
    console.log(userData[0].ID);
  } else {
    console.log("userData is null or empty");
  }

  console.log(userData[0].ID);

  const USER_ID = userData[0].ID;
  const USER_NAME = userData[0].username;

  const changeElement = (e) => {
    setComponent(e);
  }

  const handleCreatePlaylist = async(e) => {


    // TODO: uncomment the following snippet to send a request to the server.
    try{
      const response = await axios.post(POST_URL, {
        uid: USER_ID,
        create_by: USER_NAME,
        playlist_name: playlist_name,
        created_on: new Date(),
      }, {
        headers:{
          'Content-Type': 'application/json',
          withCredentials: false,
        }
      })
    }catch(err){
      console.log(err);
    }
  }

  const getSongs = async() => {

    const GET_SONGS_URL = 'http://localhost:3001/get-songs'

    try{
      const response = await axios.get(GET_SONGS_URL)
      console.log(response);
    }catch(err){
      console.log(err);
    }

  }

  return(
    <div className='homepage-container' onLoad={getSongs}>
      <Header/>
      <div className='homepage'>
        <div className='sidebar-holder'>
          <div className="sidebar-container">
            <div className='sidebar'>
              <div className='clickable'>
                <div id='Discover' onClick = {(e)=> {changeElement(e.target.id)}}>Home</div>
                <div>Liked Music</div>

                {
                  true ? (
                    <div id='FileUploadPage' onClick = {(e) => {changeElement(e.target.id)}}>
                      Artist Studio
                    </div>
                  ) : <> </>
                }
              </div>

                <div className='user-playlist-container'>
                  <div id='user-playlists' className='user-playlists'>Your Playlists</div>
                </div>
                <div>
                  <Link to='../components/AudioPlayer.jsx'> audio </Link>
                </div>

              <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
            </div>
          </div>
        </div>
        <div className='main-holder'>
          {
            component == 'FileUploadPage' ? <FileUploadPage/> :
            component == 'Discover' ? <MusicGrid/> : <MusicGrid/>
          }
        </div>
        <div className = 'footer'>
          <AudioPlayer/>
        </div>
      </div>
    </div>
  );
}

export default Homepage;