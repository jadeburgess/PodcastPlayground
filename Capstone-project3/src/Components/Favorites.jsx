import React, { useState } from "react";


export default function Favorites({ favoritePodcasts, onToggleFavorite }) {
  const [sorting, setSorting] = useState("none");

  const handleSortAtoZ = () => {
    setSorting("AtoZ");
    favoritePodcasts.sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleSortZtoA = () => {
    setSorting("ZtoA");
    favoritePodcasts.sort((a, b) => b.title.localeCompare(a.title));
  };

  const handleSortByDateAsc = () => {
    setSorting("DateAsc");
    favoritePodcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
  };

  const handleSortByDateDesc = () => {
    setSorting("DateDesc");
    favoritePodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div>
        <button onClick={handleSortAtoZ}>Sort A-Z</button>
        <button onClick={handleSortZtoA}>Sort Z-A</button>
        <button onClick={handleSortByDateAsc}>Sort by Date (Ascending)</button>
        <button onClick={handleSortByDateDesc}>Sort by Date (Descending)</button>
      </div>
      {favoritePodcasts.map((podcast) => (
        <div key={podcast.id}>
          <img src={podcast.image} alt={podcast.title} style={{ maxWidth: '100px' }} />
          <p>{podcast.title}</p>
          <button onClick={() => onToggleFavorite(podcast.id)}>
            {podcast.isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
}












