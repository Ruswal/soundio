import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import {
  BiPauseCircle,
  BiPlayCircle,
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi";

import { GET_PLAYLISTS_ITEMS } from "../assets/constants";
import "./style/MusicGrid.css";
import useObserver from "./useObserver";

const userData = localStorage.getItem("data");
const USER_ID = userData && userData.length > 0 ? userData[0].ID : null;

const ViewPlaylist = ({ playlistID, currentPlaylistQueue }) => {
  const [audioPlayers, setAudioPlayers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistsName] = useState("");
  const [isPlaylistEmpty, setIsPlaylistEmpty] = useState();
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const observer = useObserver();

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
    observer.notify();
  }, [currentTrack]);

  useEffect(() => {
    setCurrentTrack(songs[currentTrackIndex]);
  }, [currentTrackIndex, songs]);
  /*
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
*/
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

  const getPlaylistItem = async (playlistID) => {
    try {
      const response = await axios.post(
        GET_PLAYLISTS_ITEMS,
        {
          playlist: playlistID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadPlaylistItem = async () => {
      try {
        const playlistItems = await getPlaylistItem(playlistID);
        setSongs(playlistItems);
        currentPlaylistQueue(playlistItems);
        setPlaylistsName(playlistItems.P_name);
        if (playlistItems.length) setIsPlaylistEmpty(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    loadPlaylistItem();
  }, [playlistID]);

  return (
    <div onLoad={() => getPlaylistItem(playlistID)}>
      <div className="music-grid">
        <h2 className="font-bold text-3xl text-white text-left"></h2>
        {isPlaylistEmpty === false ? (
          <h2 className="music-name">So empty! Add some songs here...</h2>
        ) : (
          <>
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
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
              {currentTrack && ( // Add a conditional check for currentTrack
                <div className="music-item" key={currentTrackIndex}>
                  <h2 className="music-name">{currentTrack.name}</h2>
                  <h4 className="music-name">{currentTrack.genre}</h4>
                  <AudioPlayer
                    track={currentTrack}
                    // Subscribe the AudioPlayer to the observer
                    onTrackChange={() => setCurrentTrack(currentTrack)}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPlaylist;
