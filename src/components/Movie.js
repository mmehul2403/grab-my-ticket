import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries/MoviesQuery";
import MovieList from "./MovieList";
import { Container, Grid, Button, Typography, CircularProgress, Box } from "@mui/material";
import "../styles/Movie.css";

const Movie = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(4);
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { page, size },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container className="movie-page">
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          {data.movies.map((movie) => (
            <Grid item key={movie.movie_id}>
              <MovieList movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1" component="span" sx={{ marginRight: 2 }}>
          Page {page}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Movie;