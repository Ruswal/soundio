import { useState } from 'react';
import { tracks } from '../pages/data/tracks';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack currentTrack={currentTrack} />
        <Controls />
        <ProgressBar />
      </div>
    </div>
  );
};
export default AudioPlayer;