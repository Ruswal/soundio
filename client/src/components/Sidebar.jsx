import React, { useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import './style/Sidebar.css';

const Sidebar = () => {

  const POST_URL = 'http://localhost:3001/create-playlist';

  const authContext = useContext(AuthContext);

  const handleCreatePlaylist = async(e) => {

    const fragment = document.createDocumentFragment();

    const div = fragment.

    document.getElementById('user-playlists').appendChild;

    /* try{
      const response = await axios.post(POST_URL, {
        uid: USER_ID,
        create_by: USER_NAME,
        playlist_name: playlist_name,
      }, {
        headers:{
          'Content-Type': 'application/json',
          withCredentials: false,
        }
      })
    }catch(err){
      console.log(err);
    } */
  }

  return(
    <div className="sidebar-container">
      <div className='sidebar'>

          <div>Home</div>
          <div>Liked Music</div>
          <div>play 1</div>

          <div className='user-playlist-container'>
            <div id='user-playlists' className='user-playlists'>Your Playlist</div>
          </div>

        <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
      </div>
    </div>
  );
}

export default Sidebar;