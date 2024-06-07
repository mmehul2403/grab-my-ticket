import React from "react";
import FormatDate from "./utilities/FormatDate.js";

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const MovieList = ({ movie }) => {
  return (
    <div className="movie">
      {/*       <img src={movie.image_url} alt={movie.movie_name} />
       */}{" "}
      <h2>{movie.movie_name}</h2>
      <p>Duration: {formatDuration(movie.duration_seconds)}</p>
      <p>Release Date: {FormatDate(movie.release_date, "yyyy-MMM-dd")}</p>
      <p>Review Score: {movie.review_score}</p>
    </div>
  );
};

export default MovieList;
