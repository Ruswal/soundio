import React from 'react';
import tracks from '../pages/data/tracks';

const MusicGrid = () => {
  const musicList = tracks;  // This can be your actual data

  const handlePlay = (url) => {
    const audioPlayer = new Audio(url);
    audioPlayer.play();
  };

  return (
    <div className="music-grid">
      {musicList.map((music, index) => (
        <div className="music-item" key={index}>
          <div className="music-name">{music.title}</div>
          <div className="music-name">{music.author}</div>
          <button onClick={() => handlePlay(music.src)}>Play</button>
        </div>
      ))}
    </div>
  );
}

export default MusicGrid;