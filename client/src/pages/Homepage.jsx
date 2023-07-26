import axios from "axios";
import { default as React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AudioPlayer from "../components/AudioPlayer.jsx";

import "./style/homepage.css";
import "./style/Sidebar.css";

import { CREATE_PLAYLIST, GET_PLAYLISTS, GET_SONGS, UPDATE_PLAYLIST_NAME } from "../assets/constants.js";
import Header from "../components/Header";
import MusicGrid from "../components/MusicGrid";
import NewPlaylist from "../components/NewPlaylist";
import FileUploadPage from "./artist-studio.jsx";

const Homepage = () => {
  const [component, setComponent] = useState("");
  const [songs, setSong] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const userDataString = localStorage.getItem("data");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const USER_ID = userData && userData.length > 0 ? userData[0].ID : null;
  const USER_NAME =
    userData && userData.length > 0 ? userData[0].username : null;

  const changeElement = (id) => {
    if (id === "Discover") {
      setCurrentPlaylist(null);
      setComponent(id);
    }
    if (id === "FileUploadPage") {
      setCurrentPlaylist(null);
      setComponent(id);
    }
  };

  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [tempPlaylistName, setTempPlaylistName] = useState("");
  const initialValue = null;
  const [newPlaylistID, setNewPlaylistID] = useState(initialValue);

  const handleCreatePlaylist = async () => {
    const defaultPlaylistName = "New Playlist";
    createNewPlaylist(defaultPlaylistName);
    setEditMode(playlists.length);
    try {
      const response = await axios.post(
        CREATE_PLAYLIST,
        {
          user: USER_ID,
          name: defaultPlaylistName,
          created_by: USER_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: false,
          },
        }
      );

      console.log(response.data[0].ID);
      setNewPlaylistID(response.data[0].ID);
      localStorage.setItem("playlistID", response.data[0].ID);
    } catch (err) {
      console.log(err);
    }
  };

  const createNewPlaylist = async (playlist_name) => {
    const newPlaylist = [...playlists, { name: playlist_name }];
    setPlaylists(newPlaylist);
    setCurrentPlaylist(newPlaylist.length - 1);
  };

  const handleEditPlaylistName = async (index, newName) => {
    let updatedPlaylists = [...userPlaylists];
    updatedPlaylists[index].name = newName;

    const updatedPlaylistName = newName === "" ? "New Playlist" : newName;

    try {
      const response = await axios.post(
        UPDATE_PLAYLIST_NAME,
        {
          name: updatedPlaylistName,
          id: localStorage.getItem("playlistID"),
          user: USER_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(localStorage.getItem("playlistID"));
      //localStorage.removeItem("playlistID");
    } catch (err) {
      console.log(err);
    }
  };

  const viewPlaylist = (index) => {
    setCurrentPlaylist(index);
    setComponent("");
  };

  const handleChangeTempName = (e) => {
    setTempPlaylistName(e.target.value);
  };

  // get all the songs for the discover page when window loads.
  const getSongs = async () => {
    try {
      const response = await axios.get(GET_SONGS);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // get all the user's playlist when the window loads.
  const getPlaylists = async () => {
    try {
      const response = await axios.post(
        GET_PLAYLISTS,
        {
          user_id: USER_ID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedplaylists = await getPlaylists();
        const fetchedsongs = await getSongs();
        setSong(fetchedsongs);
        setPlaylists(fetchedplaylists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Inside useEffect: songs", songs);
    console.log("Inside useEffect: playlists", playlists);
  }, [songs, playlists]);

  console.log(playlists[1]);

  return (
    <div
      className="homepage-container"
      onLoad={() => {
        //   getPlaylists();
        //  setSongs(getSongs());
      }}
    >
      <Header />
      <div className="homepage">
        <div className="sidebar-holder">
          <div className="sidebar-container">
            <div className="sidebar">
              <div className="clickable">
                <div
                  id="Discover"
                  onClick={() => {
                    changeElement("Discover");
                  }}
                >
                  Home
                </div>
                <div>Liked Music</div>

                {true ? (
                  <div
                    id="FileUploadPage"
                    onClick={(e) => {
                      changeElement(e.target.id);
                    }}
                  >
                    Artist Studio
                  </div>
                ) : null}
              </div>

              <div className="user-playlist-container">
                <div className='yourPlaylistTitle'>Your Playlists</div>
                <div id="user-playlists" className="user-playlists">
                {playlists.map((playlists, index) => (
                  <div key={index} className="clickable">
                    {editMode === index ? (
                      <div>
                        <input
                          type="text"
                          value={tempPlaylistName}
                          onChange={handleChangeTempName}
                        />
                        <button
                          onClick={() =>
                            handleEditPlaylistName(index, tempPlaylistName)
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div onClick={() => viewPlaylist(index)}>
                        {playlists.name}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
              <div
                className="button createPlaylist"
                onClick={handleCreatePlaylist}
              >
                Create Playlist
              </div>
            </div>
          </div>
        </div>
        <div className="main-holder">
          {component === "FileUploadPage" ? (
            <FileUploadPage />
          ) : component === "Discover" ? (
            <div>
              <h1>Music Library</h1>
              {songs == null ? <p>Loading...</p> : <MusicGrid songs={songs} />}
            </div>
          ) : (
            currentPlaylist !== null && (
              <NewPlaylist playlist={playlists[currentPlaylist]} />
            )
          )}
        </div>
        <div className="footer">{/*<AudioPlayer /> */}</div>
      </div>
    </div>
  );
};

export default Homepage;
