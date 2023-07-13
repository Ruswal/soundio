import React, { useState } from 'react';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";
import './style/form.css';

function FileUploadPage(){

    const REGISTER_URL = 'http://localhost:3001/register';

	const [selectedFile, setSelectedFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        setIsFileSelected(true);
	};

    const handleSubmission = () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);

          fetch('/Uploads', {
            method: 'POST',
            body: formData
          })
            .then((response) => {
              // Handle the response from the server
              console.log(response);
            })
            .catch((error) => {
              // Handle error
              console.log(error);
            });
        }
      };

	return(
   <div className="form-container">
            <p className="formHeader">Artist Studio</p>
			<input className="input" type="file" name="file" onChange={changeHandler} />
			{isFileSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button className="button" onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default FileUploadPage;