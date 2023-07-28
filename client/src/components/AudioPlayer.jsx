import { React, useRef, useState, useEffect } from "react";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ track }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // const [currentTrack, setCurrentTrack] = useState(track);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // reference
  const audioRef = useRef();
  console.log(audioRef);
  console.log(track);
  const progressBarRef = useRef();
  const currentTrack = track;

  useEffect(() => {
    // Play or pause the audio when the current track changes
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);

  const handleNext = () => {
    if (currentTrackIndex >= track.length - 1) {
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
            handleNext,
          }}
        />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            handleNext,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
