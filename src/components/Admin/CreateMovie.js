// src/CreateMovieForm.js
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";

const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie(
    $movie_name: String!
    $duration_seconds: Int
    $release_date: Date
    $review_score: Float
    $image_url: String
  ) {
    createMovie(
      movie_name: $movie_name
      duration_seconds: $duration_seconds
      release_date: $release_date
      review_score: $review_score
      image_url: $image_url
    ) {
      movie_id
      movie_name
    }
  }
`;

const CreateMovieForm = () => {
  const [movie_name, setMovieName] = useState("");
  const [duration_seconds, setDurationSeconds] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [review_score, setReviewScore] = useState("");
  const [image_url, setImageUrl] = useState("");

  const [createMovie, { data, loading, error }] = useMutation(
    CREATE_MOVIE_MUTATION
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie({
      variables: {
        movie_name,
        duration_seconds: parseInt(duration_seconds),
        release_date,
        review_score: parseFloat(review_score),
        image_url,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Movie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="movie_name"
            label="Movie Name"
            name="movie_name"
            autoComplete="movie_name"
            autoFocus
            value={movie_name}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="duration_seconds"
            label="Duration (seconds)"
            name="duration_seconds"
            type="number"
            value={duration_seconds}
            onChange={(e) => setDurationSeconds(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="release_date"
            label="Release Date"
            name="release_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="review_score"
            label="Review Score"
            name="review_score"
            type="number"
            step="0.1"
            value={review_score}
            onChange={(e) => setReviewScore(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="image_url"
            label="Image URL"
            name="image_url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Create Movie
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              Error: {error.message}
            </Typography>
          )}
          {data && (
            <Typography color="primary" variant="body2">
              Movie Created: {data.createMovie.movie_name}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CreateMovieForm;
