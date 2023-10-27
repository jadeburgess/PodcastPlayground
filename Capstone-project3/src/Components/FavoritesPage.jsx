import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'; 

// const genreMapping = {
//     1: 'Personal Growth',
//     2: 'True Crime and Investigative Journalism',
//     3: 'History',
//     4: 'Comedy',
//     5: 'Entertainment',
//     6: 'Business',
//     7: 'Fiction',
//     8: 'News',
//     9: 'Kids and Family',
//   };
  
//   const getGenreTitle = (genreId) => {
//     console.log('Genre ID:', genreId);
//     console.log('Genre Mapping:', genreMapping);
  
//     const genreTitle = genreMapping[genreId];
//     console.log('Genre Title:', genreTitle);
  
//     return genreTitle || 'Unknown Genre';
//   };
  

export default function FavoritesPage({ favoritePodcasts }) {
  const [showMore, setShowMore] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState(favoritePodcasts);
  const [sortOption, setSortOption] = useState('a-z');

  const handleSeeMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleSort = (option) => {
    setSortOption(option);
    switch (option) {
      case 'a-z':
        setSortedPodcasts([...favoritePodcasts].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'z-a':
        setSortedPodcasts([...favoritePodcasts].sort((a, b) => b.title.localeCompare(a.title)));
        break;
      case 'date-asc':
        setSortedPodcasts([...favoritePodcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated)));
        break;
      case 'date-desc':
        setSortedPodcasts([...favoritePodcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated)));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 className='favorite-page-heading'>Favorites Page</h1>
      <div className="sort-buttons">
        <button onClick={() => handleSort('a-z')}>A-Z</button>
        <button onClick={() => handleSort('z-a')}>Z-A</button>
        <button onClick={() => handleSort('date-asc')}>oldest to newest</button>
        <button onClick={() => handleSort('date-desc')}>newest to oldest</button>
      </div>
      <div className="container"> {/* Wrap the podcast previews with the container class */}
        {sortedPodcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <img src={podcast.image} alt={podcast.title} />
            <h3 className='favorite-page-podcast-title'>{podcast.title}</h3>
            {showMore ? (
              <>
                <p className='favorite-page-podcast-description'>{podcast.description}</p>
                <div className="podcast-details">
                  <p>Genre:  {getGenreTitle(parseInt(podcast.genre))}</p>
                  <p>Seasons: {podcast.seasons}</p>
                  <p>Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}</p>
                </div>
                {/* <h4>Episodes: </h4> */}
                {podcast.episodes &&
                  podcast.episodes.map((episode) => (
                    <div key={episode.id} className="episode-item">
                      <h5>{episode.title}</h5>
                      <p>{episode.description}</p>
                      {/* Add any other episode details here */}
                    </div>
                  ))}
                <button
                className='favorite-page-show-less-button' 
                onClick={handleSeeMoreClick}>Show Less</button> {/* Change the button text to "Show Less" */}
              </>
            ) : (
              <>
                <button 
                className='favorite-page-show-more-button'
                onClick={handleSeeMoreClick}>Show More</button> {/* Change the button text to "Show More" */}
                <Link 
                className='favorite-page-see-podcast-link'
                to={`/podcast/${podcast.id}`}>see podcast details</Link> {/* Add the "See Podcast" button */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

