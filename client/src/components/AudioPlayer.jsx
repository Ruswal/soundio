import { tracks } from '../pages/data/tracks';
import { React, useRef, useState } from 'react';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  // reference
  const audioRef = useRef();
  console.log(audioRef)
  const progressBarRef = useRef();

return (
  <div className="audio-player">
    <div className="inner">
      <DisplayTrack {...{ currentTrack, audioRef }} />
      <Controls {...{ audioRef }} />
      <ProgressBar {...{ progressBarRef }} />
    </div>
  </div>
  );
  };
  export default AudioPlayer;