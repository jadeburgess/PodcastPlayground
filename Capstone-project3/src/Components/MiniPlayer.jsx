import React from 'react';
import './MiniPlayer.css'

export default function MiniPlayer({ episodeData, isPlaying, onPausePlay, onClose }) {
  const handleClose = () => {
    if (window.confirm('Are you sure you want to close the mini player?')) {
      onClose();
    }
  };

  return (
    <div className="mini-player">
      <h3>Current Episode: {episodeData.title}</h3>
      <button onClick={onPausePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}


//MiniPlayer ver.2