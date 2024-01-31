import React from "react";
import { Icons } from "../../assets/icons/icons";

const Score = ({ score, className }) => {
  const fullStars = Math.floor(score);
  const halfStars = score % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const renderStars = (Icon, count) => {
    return Array(count)
      .fill(null)
      .map((_, i) => <Icon key={i} />);
  };

  return (
    <div className={className}>
      {renderStars(Icons.StarFull, fullStars)}
      {renderStars(Icons.StarHalf, halfStars)}
      {renderStars(Icons.StarEmpty, emptyStars)}
    </div>
  );
};

export default Score;
