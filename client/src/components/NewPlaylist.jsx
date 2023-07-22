import React, { useRef, useState } from 'react';
import './style/NewPlaylist.css';

const NewPlaylist = ({ playlist }) => {
  const [playlistState, setPlaylistState] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const audioRef = useRef(null);

  const addMusic = (musicData) => {
    // Clone the current playlist state
    const updatedPlaylist = [...playlistState];
    // Append the new music to the playlist
    updatedPlaylist.push(musicData);
    // Update the state with the new playlist
    setPlaylistState(updatedPlaylist);
  };

  const toggleLike = (songId) => {
    // Find the index of the song in the playlist
    const songIndex = playlistState.findIndex((song) => song.id === songId);
    if (songIndex !== -1) {
      // Clone the current playlist state
      const updatedPlaylist = [...playlistState];
      // Toggle the like state for the song
      updatedPlaylist[songIndex].liked = !updatedPlaylist[songIndex].liked;
      // Update the state with the new playlist
      setPlaylistState(updatedPlaylist);
    }
  };

  const removeSongs = () => {
    // Filter out the selected songs from the playlist
    const updatedPlaylist = playlistState.filter(
      (song) => !selectedSongs.includes(song.id)
    );
    // Update the state with the new playlist
    setPlaylistState(updatedPlaylist);
    // Clear the selected songs
    setSelectedSongs([]);
  };

  const handleSelectSong = (songId) => {
    // Toggle the selected state for the song
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.includes(songId)
        ? prevSelectedSongs.filter((id) => id !== songId)
        : [...prevSelectedSongs, songId]
    );
  };

/*   const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Use FileReader to read the content of the file
      const reader = new FileReader();

      reader.onload = () => {
        // The result of the reader will contain the data of the file as a base64 encoded string
        const musicData = {
          id: Date.now(),
          name: file.name,
          author: 'Unknown',
          time: '00:00',
          liked: false,
          data: reader.result, // This contains the actual music data
        };

        addMusic(musicData);
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    }
  }; */

  const handlePlayMusic = (songId) => {
    const song = playlistState.find((song) => song.id === songId);
    if (song) {
      if (audioRef.current.src === song.data) {
        // If the same song is already playing, pause it
        audioRef.current.pause();
      } else {
        // Set the audio source to the selected song and play it
        audioRef.current.src = song.data;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="body">
      <h1>{playlist.name}</h1>
      <div className="file-input-container">
        {/* <input type="file" onChange={handleFileChange} /> */}
        <button onClick={removeSongs}>Remove Selected Songs</button>
        {playlistState.length === 0 ? (
          <p>No songs in the playlist. Add some music!</p>
        ) : (
          playlistState.map((song) => (
            <div key={song.id} className="song-container">
              <div className="item">{song.name}</div>
              <div className="item">Author: {song.author}</div>
              <div className="item">Time: {song.time}</div>
              <div className="item">
                <button onClick={() => toggleLike(song.id)}>
                  {song.liked ? 'Unlike' : 'Like'}
                </button>
                <input
                  type="checkbox"
                  onChange={() => handleSelectSong(song.id)}
                  checked={selectedSongs.includes(song.id)}
                />
                <button onClick={() => handlePlayMusic(song.id)}>
                  {audioRef.current?.src === song.data && !audioRef.current.paused
                    ? 'Pause Music'
                    : 'Play Music'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default NewPlaylist;