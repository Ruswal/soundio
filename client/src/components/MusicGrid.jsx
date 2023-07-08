import React from 'react';

const MusicGrid = () => {
  const musicList = ['Music 1', 'Music 2', 'Music 3', 'Music 4', 'Music 5', 'Music 6', 'Music 7', 'Music 8', 'Music 9'];  // This can be your actual data

  return (
    <div className="music-grid">
      {musicList.map((music, index) => (
        <div className="music-item" key={index}>
          {music}
        </div>
      ))}
    </div>
  );
}

export default MusicGrid;