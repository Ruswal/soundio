import { React } from 'react';

const ProgressBar = ({ progressBarRef }) => {
  const handleProgressChange = () => {
    console.log(progressBarRef.current.value);
  };

  return (
    <div className="progress">
      <span className="time current">00:00</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">03:34</span>
    </div>
  );
};

export default ProgressBar;