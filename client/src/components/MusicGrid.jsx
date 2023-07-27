import React, { useEffect, useState } from "react";
import {
  BiPauseCircle,
  BiPlayCircle,
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi";
import genre from "../components/genres.jsx";
import "./style/MusicGrid.css";

const MusicGrid = ({ songs }) => {
  const [audioPlayers, setAudioPlayers] = useState([]);
  const [genreTitle, setGenreTitle] = useState("");
  // const [genre, setByGenre] = useState([]);

  const playAudio = async (url) => {
    try {
      const audioModule = await import(url);
      const audioPlayer = new Audio(audioModule.default); // Assuming the default export is the URL
      return audioPlayer;
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  useEffect(() => {
    const createAudioPlayers = async () => {
      // Create audio players for each music item
      const players = await Promise.all(
        songs.map((music) => playAudio(music.url))
      );
      setAudioPlayers(players);
    };

    createAudioPlayers();

    return () => {
      // Clean up audio players on unmount
      audioPlayers.forEach((player) => player.pause());
    };
  }, [songs]);

  const handlePlayPause = (index) => {
    const newAudioPlayers = [...audioPlayers];
    const audioPlayer = newAudioPlayers[index];

    if (audioPlayer && audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }

    setAudioPlayers(newAudioPlayers);
  };

  const getGenre = (songs, gen) => {
    return songs.filter((songs) => songs.genre === gen);
  };

  const genreSongs = getGenre(songs, genreTitle);

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
        <div className="scrollable flex flex-wrap sm:justify-start justify-center gap-8">
          {genreSongs.map((songs, index) => (
            <div className="music-item" key={index}>
              <h2 className="music-name">{songs.name}</h2>
              <h4 className="music-name">{songs.genre}</h4>
              <h4 className="music-name">{songs.url}</h4>
              <audio controls>
                <source src={songs.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              )
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicGrid;
