import React from 'react';
import './style/Sidebar.css';

const Sidebar = () => {

  const handleCreatePlaylist = () => {

  }

  return(
    <div className="sidebar-container">
      <div className='sidebar'>
        <ul>
          <li>Home</li>
          <li>Liked Music</li>
          <li>play 1</li>
        </ul>
        <div className='button createPlaylist' onClick={handleCreatePlaylist}>Create Playlist</div>
      </div>
    </div>
  );
}

export default Sidebar;