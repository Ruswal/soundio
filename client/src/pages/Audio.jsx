import React from 'react';
import ReactDOM from 'react-dom/client';
import AudioPlayer from '../components/AudioPlayer';

import './style/audioPlayer.css';
import './style/customize-progress-bar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>
);