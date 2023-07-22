import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
//import './style/Sidebar.css';


const Sidebar = ({ playlists, setPlaylists, createNewPlaylist, viewPlaylist, viewMusicGrid }) => {

  const POST_URL = 'http://localhost:3001/create-playlist';

  const authContext = useContext(AuthContext);
  const USER_ID = authContext.data[0].ID;
  const USER_NAME = authContext.data[0].username;

  const [editMode, setEditMode] = useState(null);
  const [tempPlaylistName, setTempPlaylistName] = useState('');

  const handleCreatePlaylist = async(e) => {

    const defaultPlaylistName = 'New Playlist';

    createNewPlaylist(defaultPlaylistName);

    // Set the new playlist to be in edit mode
    setEditMode(playlists.length);
  }

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
    } catch(err) {
      console.log(err);
    }
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
              <div key={index}>
                {editMode === index ? (
                  <div>
                    <input type='text' value={tempPlaylistName} onChange={handleChangeTempName} />
                    <button onClick={() => handleEditPlaylistName(index, tempPlaylistName)}>Save</button>
                  </div>
                ) : (
                  <div onClick={() => viewPlaylist(index)}>
                    {playlist.name}
                    <button onClick={() => { setEditMode(index); setTempPlaylistName(playlist.name); }}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
      </div>
    </div>
  );
}

export default Sidebar;