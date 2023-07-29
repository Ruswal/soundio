import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../api/axios.js";
import { UPLOAD } from "../assets/constants.js";
import genre from "../components/genres.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import "./style/artistStudio.css";
import "./style/form.css";

const FileUploadPage = () => {
  const authContext = useContext(AuthContext);
  const songNameRef = useRef();
  const genreRef = useRef();
  const errRef = useRef();

  const [songName, setSongName] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    songNameRef.current.focus();
    genreRef.current.focus();
  }, []);

  useEffect(() => {
    setMessage("");
  }, [songNameRef, genreRef]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
    setIsFileSelected(true);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const songName = document.getElementById("songName");
    const songGenre = document.getElementById("songGenre");
    const files = document.getElementById("files");

    const formData = new FormData();
    formData.append("songName", songName.value);
    formData.append("songGenre", songGenre.value);
    formData.append("userID", authContext.data[0].ID);
    for (let index = 0; index < files.files.length; index++) {
      formData.append("files", files.files[index]);
    }

    try {
      const response = await axios({
        method: "POST",
        url: UPLOAD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSongName("");
      setSongGenre("");
      setIsFileSelected(false);
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setMessage("Server failed to respond.");
      } else if (err.response?.status === 400) {
        setMessage("Missing information");
      } else if (err.response?.status === 401) {
        setMessage("Unauthorized");
      } else {
        setMessage(
          "Failed to upload, server error " + err.response.status + "."
        );
      }
      errRef.current.focus();
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
    }
  };

  return (
    <div className="form-container artist-studio-container">
      <p className="formHeader">Artist Studio</p>

      <p
        ref={errRef}
        className={message ? "errmessage" : "offscreen"}
        aria-live="assertive"
      >
        {message}
      </p>

      <input
        id="songName"
        className="input"
        type="text"
        name="songName"
        placeholder="Enter song name"
        onChange={(e) => setSongName(e.target.value)}
        value={songName}
        ref={songNameRef}
        required
      />

      <select
        id="songGenre"
        className="input"
        type="text"
        name="songGenre"
        placeholder="Pick song genre"
        onChange={(e) => setSongGenre(e.target.value)}
        value={songGenre}
        ref={genreRef}
        required
      >
        {genre.map((genre) => (
          <option key={genre.value} value={genre.value}>
            {genre.title}
          </option>
        ))}
      </select>

      <input
        id="files"
        className="input"
        type="file"
        name="fileInput"
        onChange={changeHandler}
        required
      />

      {isFileSelected ? (
        <div className="file-info-container">
          <div>Filename: {selectedFile.name}</div>
          <div>Filetype: {selectedFile.type}</div>
          <div>Size in bytes: {selectedFile.size}</div>
          <div>filepath: {document.getElementById("files").value}</div>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button className="button" onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileUploadPage;