import { default as React, ReactDOM, useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";

import "./style/homepage.css";

import Header from '../components/Header';
import MusicGrid from '../components/MusicGrid';
import FileUploadPage from './artist-studio.jsx';

const Homepage = () => {

   const POST_URL = 'http://localhost:3001/create-playlist';
  const [component, setComponent] = useState('');

  const authContext = useContext(AuthContext);
  const USER_ID = authContext.data[0].ID;
  const USER_NAME = authContext.data[0].username;

  const changeElement = (e) => {
    console.log(e);
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

  // console.log(authContext.data);

  return(
    <div className='homepage-container'>
      <Header/>
      <div className='homepage'>
        <div className='sidebar-holder'>
          <div className="sidebar-container">
            <div className='sidebar'>

                <div id='Discover' onClick = {(e)=> {changeElement(e.target.id)}}>Home</div>
                <div>Liked Music</div>

                {
                  authContext.data[0].isArtist ? (
                    <div id='FileUploadPage' onClick = {(e) => {changeElement(e.target.id)}}>
                      Artist Studio
                    </div>
                  ) : <> </>
                }

                <div className='user-playlist-container'>
                  <div id='user-playlists' className='user-playlists'>Your Playlists</div>
                </div>
                <div>
                  <Link to='../pages/Audio.jsx'> audio </Link>
                </div>

              <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
            </div>
          </div>
        </div>
        <div className='main-holder'>
          {
            component == 'FileUploadPage' ? <FileUploadPage/> :
            component == 'Discover' ? <MusicGrid/> : <> </>
          }
        </div>
      </div>
    </div>
  );

}

export default Homepage;
