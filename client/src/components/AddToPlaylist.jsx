import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ADD_TO_PLAYLIST } from "../assets/constants";
import '../pages/style/form.css';
import './style/MusicGrid.css';

const AddToPlaylist = ({playlists, songID}) => {

	const [selectedPlaylist, setSelectedPlaylist] = useState({playlistID: []})

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

	useEffect(() => {
		console.log(selectedPlaylist.playlistID);
	}, [selectedPlaylist.playlistID])

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
			)
		} catch(err){
			console.error(err);
		}
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

      <button className="button" onClick={handleSave}>
        Save
      </button>
    </div>
	)
}

export default AddToPlaylist;
