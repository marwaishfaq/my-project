import React from "react";
import {FaStar} from 'react-icons/fa'
const StarRating = ({ rating, onRate }) => {
    const stars = Array(5).fill(0);
  
    return (
      <div>
        {stars.map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={index + 1}
              onChange={(e) => onRate(e.target.value)}
            />
            <FaStar className="star" color={index < rating ? "#ffc107" : "#e4e5e9"} />
          </label>
        ))}
      </div>
    );
  };
export default StarRating
