import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ADD_TO_PLAYLIST } from "../assets/constants";
import '../pages/style/form.css';
import './style/AddToPlaylist.css';
import './style/MusicGrid.css';

const AddToPlaylist = ({playlists, songID, backComponent}) => {

	const [selectedPlaylist, setSelectedPlaylist] = useState({playlistID: []});
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const {id, checked} = e.target;
		const {playlistID} = selectedPlaylist;

		if(checked && playlistID.length == 0){
			setSelectedPlaylist({
				playlistID: [id]
			})
		} else if(checked) {
			setSelectedPlaylist({
				playlistID: [...playlistID, id]
			});
		} else {
			setSelectedPlaylist({
				playlistID: playlistID.filter((e) => e !== id)
			})
		}
  }

	const handleSave = async() => {
		try{
			const response = await axios.post(
				ADD_TO_PLAYLIST, {
					selectedPlaylist: selectedPlaylist.playlistID,
					songID: songID,
				}, {
					headers: {
						'Content-Type': 'application/json',
					}
				}
			);
			if(response.status === 200) {
				setMessage('Song saved! Click back button to go back...')
			}
		} catch(err){
			console.error(err);
		}
	}

	const handleBack = () => {
		backComponent('Discover');
	}

	return(
		<div className="form-container artist-studio-container">
      <p className="formHeader">Select Playlist</p>

			<div>
				{playlists.map((playlists, index) => (
					<div key={index}>
						<input type='checkbox' id={playlists.ID} defaultChecked={false} onClick={(e) => handleChange(e)}/>
						<label className="music-name" for={playlists.ID}>{playlists.name}</label>
					</div>
				))}
			</div>
			<div className="message">{message}</div>
			<div className="button-container">
				<button className="button" onClick={handleSave}>
					Save
				</button>
				<button className="button" onClick={handleBack}> Back </button>
			</div>
    </div>
	)
}

export default AddToPlaylist;
