import React, { useEffect, useState } from "react";
import { BiHeart, BiSolidBookmarkHeart, BiSolidHeart } from "react-icons/bi";
import AudioPlayer from "./AudioPlayer"; // Import the AudioPlayer component
import genre from "../components/genres.jsx";
import "./style/MusicGrid.css";

const MusicGrid = ({ songs, addToPlaylistId }) => {
  // const songs = props.songs;
  const [audioPlayers, setAudioPlayers] = useState([]);
  const [favoritedState, setFavoritedState] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [genreTitle, setGenreTitle] = useState("");
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // const [genre, setByGenre] = useState([]);

  const audioRef = React.useRef();
  /*
  const handleTrackChange = (e) => {
    const trackIndex = parseInt(e.target.value);
    console.log("Track Index:", trackIndex);
    setCurrentTrack(songs[trackIndex]);
    setCurrentTrackIndex(trackIndex);
  };
*/
  useEffect(() => {
    setCurrentTrack(songs[currentTrackIndex]);
  }, [currentTrackIndex, songs]);
  /*
  useEffect(() => {
    // Play or pause the audio when the current track changes
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);
*/
  const handlePlayPause = (index) => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getGenre = (songs, gen) => {
    return songs.filter((songs) => songs.genre === gen);
  };

  const handleFavoriteClick = (index) => {
    const newFavoritedState = [...favoritedState];
    newFavoritedState[index] = !newFavoritedState[index];
    setFavoritedState(newFavoritedState);
  };

  const handleAddToPlaylist = (e) => {
    // You can implement your playlist logic here.
    // For example, you could create a new state for the playlist and add the selected song to it.
    console.log("Adding song to playlist:", e.target.id);
    addToPlaylistId = e.target.id;
  };

  const sortedSongs = [...songs].sort((a, b) => a.name.localeCompare(b.name));
  const genreSongs = getGenre(songs, genreTitle);
  console.log(genreSongs);
  console.log(songs);
  console.log(genreTitle);
  console.log(currentTrack);

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
          <select
            onChange={(e) => {
              setCurrentTrackIndex(e.target.value);
            }}
            value={currentTrackIndex}
          >
            {songs.map((song, index) => (
              <option key={index} value={index}>
                {song.name}
              </option>
            ))}
          </select>
        </div>
        <div className="scrollable flex flex-wrap sm:justify-start justify-center gap-8">
          <div className="music-item" key={currentTrackIndex}>
            <h2 className="music-name">{currentTrack.name}</h2>
            <h4 className="music-name">{currentTrack.genre}</h4>
            <AudioPlayer track={currentTrack} />
            <div className="flexbox">
              <div
                className={`favme ${
                  favoritedState[currentTrackIndex] ? "active button" : "button"
                } ${isAnimating ? "is_animating button" : "button"}`}
                onClick={() => handleFavoriteClick(currentTrackIndex)}
                onTouchStart={() => handleFavoriteClick(currentTrackIndex)}
                onAnimationEnd={() => setIsAnimating(false)}
              >
                <BiSolidHeart />
                <span href="" className="music-name">
                  Favorite
                </span>
              </div>
              <button
                id={songs.ID}
                className="button"
                onClick={(e) => addToPlaylistId(e.target.id)}
              >
                <BiSolidBookmarkHeart />
                Add to Playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicGrid;
