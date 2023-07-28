import { tracks } from '../pages/data/tracks';
import { React, useRef, useState } from 'react';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0)

  // reference
  const audioRef = useRef();
  console.log(audioRef)
  const progressBarRef = useRef();

  
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  

return (
  <div className="audio-player">
    <div className="inner">
      <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef, handleNext }} />
      <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, handleNext }} />
      <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
    </div>
  </div>
  );
  };
  export default AudioPlayer;