import React, { useState, useEffect, useRef } from "react";
import { tracks } from "../pages/data/tracks";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
} from "react-icons/bi";

const MusicGrid = () => {
  const musicList = tracks; // This can be your actual data

  const [audioPlayers, setAudioPlayers] = useState([]);

  useEffect(() => {
    // Create audio players for each music item
    const players = musicList.map((music) => new Audio(music.src));
    setAudioPlayers(players);

    return () => {
      // Clean up audio players on unmount
      players.forEach((player) => player.pause());
    };
  }, [musicList]);

  const handlePlayPause = (index) => {
    const newAudioPlayers = [...audioPlayers];
    const audioPlayer = newAudioPlayers[index];

    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }

    setAudioPlayers(newAudioPlayers);
  };

  return (
    <div>
      <div className="music-grid">
        {musicList.map((music, index) => (
          <div className="music-item" key={index}>
            <h2 className="music-name">{music.title}</h2>
            <h4 className="music-name">{music.author}</h4>
            {audioPlayers[index]?.paused ? (
              <BiPlayCircle
                color="#ff5722"
                size={70}
                className="icons"
                onClick={() => handlePlayPause(index)}
              />
            ) : (
              <BiPauseCircle
                color="#ff5722"
                size={70}
                className="icons"
                onClick={() => handlePlayPause(index)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicGrid;
