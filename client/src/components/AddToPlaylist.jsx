import React from "react";
import '../pages/style/form.css';
import './style/MusicGrid.css';

const AddToPlaylist = ({playlists}) => {

	const selectedPlaylist = (e) => {
		let resultArray = []
		var id = e.target.id;
     if(e.target.checked)      //if checked (true), then add this id into checkedList
     {
          resultArray = this.state.checkedList.filter(CheckedId=>
            CheckedId !== id
          )
          resultArray.push(id)
     }
     else                    //if not checked (false), then remove this id from checkedList
     {
        resultArray = this.state.checkedList.filter(CheckedId=>
            CheckedId !== id
        )
     }
     console.log(resultArray)
  }


	return(
		<div className="form-container artist-studio-container">
      <p className="formHeader">Select Playlist</p>

			<div>
				{playlists.map((playlists, index) => (
					<div>
						<input type='checkbox' id={playlists.ID} onChange={(e) => selectedPlaylist(e)}/>
						<label className="music-name" for={playlists.ID}>{playlists.name}</label>
					</div>
				))}
			</div>

      <button className="button" onClick={selectedPlaylist}>
        Save
      </button>
    </div>
	)
}

export default AddToPlaylist;
