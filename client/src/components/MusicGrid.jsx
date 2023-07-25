import React, { useState, useEffect } from "react";
import genre from "../components/genres.jsx";
import "./style/MusicGrid.css";
import {
  BiPauseCircle,
  BiPlayCircle,
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi";

const MusicGrid = ({ songs }) => {
  const [audioPlayers, setAudioPlayers] = useState([]);
  const [genreTitle, setGenreTitle] = useState("");

  useEffect(() => {
    // Create audio players for each music item
    const players = songs.map((music) => new Audio(music.url));
    setAudioPlayers(players);

    return () => {
      // Clean up audio players on unmount
      players.forEach((player) => player.pause());
    };
  }, [songs]);

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
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <select
            onChange={(e) => setGenreTitle(e.target.value)}
            value={genreTitle || "Pop"}
          >
            {genre.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songs.map((music, index) => (
            <div className="music-item" key={index}>
              <h2 className="music-name">{music.name}</h2>
              <h4 className="music-name">{music.genre}</h4>
              <h4 className="music-name">{music.url}</h4>
              <audio controls>
                <source src={music.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
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
    </div>
  );
};

export default MusicGrid;
