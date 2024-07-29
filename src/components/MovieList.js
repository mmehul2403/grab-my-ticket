import React from "react";
import FormatDate from "./utilities/FormatDate.js";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const MovieList = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="350"
        image={`http://localhost:4000/${movie.image_url}`}
        alt={movie.movie_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {movie.movie_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {formatDuration(movie.duration_seconds)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {FormatDate(movie.release_date, 'yyyy-MMM-dd')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review Score: {movie.review_score} / 5
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieList;
