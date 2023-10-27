//works well. Plays audio successfully. 
import React, { useState, useRef } from 'react';
import './Episode.css';

export default function Episode({ episodeData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div>
      <h2 className='episode-card-number'>Episode {episodeData.episode}</h2>
      <h4 className='episode-card-title'>{episodeData.title}</h4>
      <p className='episode-card-description'>{episodeData.description}</p>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={episodeData.file} // Use the episodeData.file for the audio URL
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <div>
        {/* Play/Pause Button */}
        <button 
        className='episode-play-button'
        onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>

        {/* Time Stamp */}
        <span className='episode-timestamp'>{`${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed()}`}</span> /{' '}
        <span className='episode-timestamp'>{`${Math.floor(duration / 60)}:${(duration % 60).toFixed()}`}</span>

        {/* Seekable Progress Bar */}
        <input 
        className='episode-seekbar'
        type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
      </div>
    </div>
  );
}




