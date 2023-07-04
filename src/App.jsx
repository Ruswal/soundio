import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MusicGrid from './MusicGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar />
        <MusicGrid />
      </div>
    </div>
  );
}

export default App;