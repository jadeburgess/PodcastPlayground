import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PodcastCarousel.css';

// NextArrow and PrevArrow components here
const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick}>
    <h3 className='next-arrow-button'>next</h3>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick}>
    <h3 className='prev-arrow-button'>prev</h3>
  </button>
);

export default function PodcastCarousel() {
  const [podcasts, setPodcasts] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});

  useEffect(() => {
    // Fetch podcast information from the API
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setPodcasts(response.data);
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1, // Display only one podcast at a time
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h1 className='recomended-podcasts'>recommended podcasts</h1>
      <Slider {...settings}>
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="carousel-item">
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}



