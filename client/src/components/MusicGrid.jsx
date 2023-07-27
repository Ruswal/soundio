import React, { useEffect, useState } from "react";
import { BiHeart, BiSolidHeart, BiSolidBookmarkHeart } from "react-icons/bi";
import genre from "../components/genres.jsx";
import "./style/MusicGrid.css";

const MusicGrid = ({ songs }) => {
  const [audioPlayers, setAudioPlayers] = useState([]);
  const [favoritedState, setFavoritedState] = useState([]);

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

      const initializedPlayers = players.map((player) => ({
        player,
        isFavorited: false,
      }));
      setAudioPlayers(players);
      setFavoritedState(new Array(songs.length).fill(false));
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

  const handleFavoriteClick = (index) => {
    const newFavoritedState = [...favoritedState];
    const audioPlayer = audioPlayers[index];

    if (audioPlayer && audioPlayer.paused) {
      audioPlayer.play();
    } else if (audioPlayer) {
      audioPlayer.pause();
    }

    newFavoritedState[index] = !newFavoritedState[index];
    setFavoritedState(newFavoritedState);
  };

  const handleAddToPlaylist = (index) => {
    // You can implement your playlist logic here.
    // For example, you could create a new state for the playlist and add the selected song to it.
    console.log("Adding song to playlist:", genreSongs[index].name);
  };

  const genreSongs = getGenre(songs, genreTitle);
  console.log(genreSongs);
  console.log(songs);
  console.log(genreTitle);

  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  /*
  const handleFavoriteClick = () => {
    setIsActive(!isActive);
    setIsAnimating(true);

    // After a short delay, remove the "is_animating" class to trigger the animation effect
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // You can adjust the duration to match your CSS animation duration
  };
  */

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
              <audio controls>
                <source src={songs.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="flexbox">
                <div
                  className={`favme ${
                    favoritedState[index] ? "active button" : "button"
                  } ${isAnimating ? "is_animating button" : "button"}`}
                  onClick={() => handleFavoriteClick(index)}
                  onTouchStart={() => handleFavoriteClick(index)}
                  onAnimationEnd={() => setIsAnimating(false)}
                >
                  <BiSolidHeart />
                  <span href="" className="music-name">
                    Favorite
                  </span>
                </div>
                <button
                  className="button"
                  onClick={() => handleAddToPlaylist(index)}
                >
                  <BiSolidBookmarkHeart />
                  Add to Playlist
                </button>
              </div>
              )
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicGrid;
