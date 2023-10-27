//MiniPlayer not working
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PodcastPage.css';
import Episode from './Episode';
import MiniPlayer from './MiniPlayer'; // Import the MiniPlayer component

export default function PodcastPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [seasonVisibility, setSeasonVisibility] = useState({});
  const [episodeVisibility, setEpisodeVisibility] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null); // Track the selected episode for the MiniPlayer
  const [showMiniPlayer, setShowMiniPlayer] = useState(false); // Track whether to show the MiniPlayer

  useEffect(() => {
    // Function to fetch podcast data based on the ID
    const fetchPodcastData = async () => {
      // Check if the ID is available
      if (!id) {
        setError('Podcast ID is not provided.');
        return;
      }

      try {
        // Fetch podcast data from the API
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Podcast Data:', data);
        setPodcast(data);
        setSeasonVisibility({});
        setEpisodeVisibility({});
      } catch (error) {
        console.error('Error fetching podcast data:', error);
        setError('Error fetching podcast data. Please try again later.');
      }
    };

    fetchPodcastData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if the podcast object is not yet available or still loading
  if (!podcast) {
    return <div>Loading...</div>;
  }

  // Log the podcast object to the console for inspection
  console.log('Podcast Object:', podcast);

  // Function to toggle season visibility when image is clicked
  const toggleSeasonVisibility = (seasonNumber) => {
    setSeasonVisibility((prevState) => ({
      ...prevState,
      [seasonNumber]: !prevState[seasonNumber],
    }));
  };

  // Function to toggle episode visibility when episode title is clicked
  const toggleEpisodeVisibility = (seasonNumber, episodeIndex) => {
    setEpisodeVisibility((prevState) => {
      const seasonEpisodes = prevState[seasonNumber] || {};
      return {
        ...prevState,
        [seasonNumber]: {
          ...seasonEpisodes,
          [episodeIndex]: !seasonEpisodes[episodeIndex],
        },
      };
    });
  };

  // Function to handle selecting an episode and showing the MiniPlayer
  const handleShowMiniPlayer = (episodeData) => {
    setSelectedEpisode(episodeData);
    setShowMiniPlayer(true);
  };

  // Function to handle closing the MiniPlayer
  const handleCloseMiniPlayer = () => {
    setShowMiniPlayer(false);
  };

  return (
    <div className="podcast-page">
      {/* Podcast Information */}
      <div className="podcast-info">
        <h2 className='podcast-name'>{podcast.title}</h2>
        {podcast.image && (
          <img
            className="podcast-Coverimage"
            src={podcast.image}
            alt={podcast.title}
            style={{ maxWidth: '200px', display: 'block', margin: '0 auto' }}
          />
        )}
        <p className='podcast-page-descciption'>{podcast.description}</p>
        {/* <p className='podcast-page-genre'>Genre: {podcast.genre}</p> */}
        <p className='podcast-page-seasons'>Seasons:</p>
        <div className="podcast-page-season-button-container">
          {Array.isArray(podcast.seasons) &&
            podcast.seasons.map((season) => (
              <a key={`season-${season.season}`} href={`#season-${season.season}`}>
                <button className='podcast-page-season-button'>Season {season.season}</button>
              </a>
            ))}
        </div>
        <p className='podcast-page-last-updated'>Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}</p>
      </div>

      {/* Seasons and Episodes List */}
      {Array.isArray(podcast.seasons) && podcast.seasons.length > 0 ? (
        <div className="season-list">
          {podcast.seasons.map((season) => (
            <div key={`season-${season.season}`} id={`season-${season.season}`} className="season-item">
              <h3>
                <div style={{ cursor: 'pointer' }} onClick={() => toggleSeasonVisibility(season.season)}>
                  <h4 className='season-card-title'>Season {season.season}</h4>
                  <img 
                  className='season-card-image'
                  src={season.image} 
                  alt={`Season ${season.season}`} s
                  tyle={{ maxWidth: '100px' }} 
                  />
                </div>
              </h3>
              {seasonVisibility[season.season] &&
                (Array.isArray(season.episodes) && season.episodes.length > 0 ? (
                  season.episodes.map((episode, index) => (
                    <div key={`episode-${season.season}-${episode.id || index}`} className="episode-item">
                      <h4>
                        <Episode episodeData={episode} />
                      </h4>
                      {episodeVisibility[season.season]?.[index] && <p>{episode.description}</p>}
                      <button // Step 3: Add a button to trigger the MiniPlayer
                        onClick={() => handleShowMiniPlayer(selectedEpisode)} // Pass the episode data to MiniPlayer
                      >
                        Play Episode
                      </button>
                    </div>
                  ))
                ) : (
                  <div key={`episode-${season.season}-no-episodes`}>No episodes available for this season.</div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div>No seasons available for this podcast.</div>
      )}

      {/* MiniPlayer */}
      {selectedEpisode && (
        <MiniPlayer
          episodeData={selectedEpisode}
          handleClose={handleCloseMiniPlayer}
        />
      )}
    </div>
  );
}






















































































