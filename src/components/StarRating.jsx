import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(<FaStar key={i} className="star filled" style={{ color: '#f39c12' }} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="star half" style={{ color: '#f39c12' }} />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={i + filledStars} className="star empty" />);
  }

  return <div className="flex items-center gap-1 text-xl">{stars}</div>;
};



export default StarRating;