import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries/MoviesQuery";
import MovieList from "./MovieList";
import "../styles/Movie.css";

const Movie = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { page, size },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="movie-page">
      <div className="movies">
        {data.movies.map((movie) => (
          <MovieList key={movie.movie_id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Movie;
