//miniPlayer not working
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllPodcasts.css';
import MiniPlayer from './MiniPlayer';
import PodcastCarousel from './PodcastCarousel';

const genreMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const getGenreTitle = (genreId) => {
  console.log('Genre ID:', genreId);
  console.log('Genre Mapping:', genreMapping);

  const genreTitle = genreMapping[genreId];
  console.log('Genre Title:', genreTitle);

  return genreTitle || 'Unknown Genre';
};


export default function AllPodcasts({ favoritePodcasts, setFavoritePodcasts }) {
  const [podcasts, setPodcasts] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('a-z');
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  useEffect(() => {
    // Fetch podcast information from the API
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        console.log('API Response:', response.data);
       
        response.data.forEach(podcast => {
          console.log('Podcast ID:', podcast.id);
          console.log('Podcast Genre:', podcast.genre);

          // Check if the genre property is an array of numeric values
          if (Array.isArray(podcast.genre) && podcast.genre.length > 0 && typeof podcast.genre[0] === 'number') {
            console.log('Genre is valid:', podcast.genre);
          } else {
            console.log('Genre is invalid:', podcast.genre);
          }
        });

        // Filter podcasts with valid genre property
        const podcastsWithValidGenre = response.data.filter(podcast => {
          return (
            Array.isArray(podcast.genre) &&
            podcast.genre.length > 0 &&
            typeof podcast.genre[0] === 'number'
          );
        });
        console.log('Podcasts with Valid Genre:', podcastsWithValidGenre);



        setPodcasts(response.data);
        setFilteredPodcasts(podcastsWithValidGenre);
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
      });
  }, []);

  const handleReadMoreClick = (podcastId) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [podcastId]: !prevState[podcastId],
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const handleFavoriteClick = (podcastId) => {
    // Check if the podcast is already favorited
    const isFavorited = favoritePodcasts.some((podcast) => podcast.id === podcastId);

    if (isFavorited) {
      // Remove the podcast from favorites if it's already favorited
      setFavoritePodcasts((prevFavorites) => prevFavorites.filter((podcast) => podcast.id !== podcastId));
    } else {
      // Add the podcast to favorites if it's not favorited
      const podcastToAdd = podcasts.find((podcast) => podcast.id === podcastId);
      if (podcastToAdd) {
        setFavoritePodcasts((prevFavorites) => [...prevFavorites, podcastToAdd]);
      }
    }
  };

  const sortedPodcasts = [...podcasts].sort((a, b) => {
    if (sortBy === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'z-a') {
      return b.title.localeCompare(a.title);
    } else if (sortBy === 'date-asc') {
      return new Date(a.updated).getTime() - new Date(b.updated).getTime();
    } else if (sortBy === 'date-desc') {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    }
    return 0;
  });

  const filteredPodcasts = sortedPodcasts.filter((podcast) => {
    const title = podcast.title.toLowerCase();
    const description = podcast.description.toLowerCase();
    return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
  });

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
    <div className="all-podcasts-container">
      <PodcastCarousel />
      <div className="sort-buttons">
        <button onClick={() => handleSort('a-z')}>A-Z</button>
        <button onClick={() => handleSort('z-a')}>Z-A</button>
        <button onClick={() => handleSort('date-asc')}>oldest to newest</button>
        <button onClick={() => handleSort('date-desc')}>newest to oldest</button>
      </div>
      <div>
        <input
         className='podcast-search-bar'
          type="text"
          placeholder="Search podcasts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button className='faveList--button'>
        <Link to="/favorites">Favorites</Link>
      </button>
      <div className="podcasts-list">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
              <h3 className='podcast--title'>{podcast.title}</h3>
            </Link>
            <p>
              {expandedDescription[podcast.id]
                ? podcast.description
                : `${podcast.description.slice(0, 100)}...`}
            </p>
            <div className="podcast-details">

              {/* <p className='all-podcasts-card-genre'>
                Genre: {typeof podcast.genre === 'number' ? getGenreTitle(podcast.genre) : 'Unknown Genre'}
              </p> */}
              <p className='all-podcasts-card-season-no'>Seasons: {podcast.seasons}</p>
              <p className='all-podcasts-card-date'>Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}</p>
            </div>
            <button
              className="read-more-btn"
              onClick={() => handleReadMoreClick(podcast.id)}
            >
              {expandedDescription[podcast.id] ? 'Read Less' : 'Read More'}
            </button>
            
            <button 
              className="play-btn"// Step 3: Add a button to trigger the MiniPlayer
              onClick={() => handleShowMiniPlayer(podcast)} // Pass the podcast data to MiniPlayer
            >Play Episode
            </button>
            <button
              className="favorite-btn"
              onClick={() => handleFavoriteClick(podcast.id)}
            >
              {favoritePodcasts.some((favPodcast) => favPodcast.id === podcast.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>

      {/* MiniPlayer */}
      {showMiniPlayer && (
        <MiniPlayer
          episodeData={selectedEpisode}
          handleClose={handleCloseMiniPlayer}
        />
      )}
    </div>
  )}