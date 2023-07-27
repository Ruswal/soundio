//import { BsMusicNoteBeamed } from 'react-icons/bs';
import { React } from 'react';

const DisplayTrack = ({ currentTrack, audioRef }) => {
  return (
    <div>
      <audio src={currentTrack.src} ref={audioRef} />
      <div className="audio-info">
      {/*}  <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
          </div> */}{}
        <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
//      <audio src={''} controls />