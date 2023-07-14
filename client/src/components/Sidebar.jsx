import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import './style/Sidebar.css';

const Sidebar = ({ playlists, createNewPlaylist, viewPlaylist, viewMusicGrid }) => {

  const POST_URL = 'http://localhost:3001/create-playlist';

  const authContext = useContext(AuthContext);

  const handleCreatePlaylist = async(e) => {
    // TODO: Get playlist name from user
    const playlist_name = prompt("Enter playlist name");

    // Create a new playlist in local state
    createNewPlaylist(playlist_name);

    // TODO: Uncomment the following snippet to send a request to the server.
    /* try {
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
    } catch(err) {
      console.log(err);
    } */
  }

  return (
    <div className="sidebar-container">
      <div className='sidebar'>
          <div onClick={viewMusicGrid}>Home</div>
          <div>Liked Music</div>
          <div>
          {authContext.data?.[0]?.isArtist ? (<Link to='/artist-studio'> Artist Studio </Link>) : (<></>)}
          </div>
          <div className='user-playlist-container'>
            <div id='user-playlists' className='user-playlists'>Your Playlists</div>
            {playlists.map((playlist, index) => (
              <div onClick={() => viewPlaylist(index)} key={index}>
                {playlist.name}
              </div>
            ))}
          </div>
          <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
      </div>
    </div>
  );
}

export default Sidebar;