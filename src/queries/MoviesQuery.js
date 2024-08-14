import { gql } from "@apollo/client";

const GET_MOVIES = gql`
  query GetMovies($page: Int!, $size: Int!) {
    movies(page: $page, size: $size) {
      movie_id
      movie_name
      duration_seconds
      release_date
      review_score
      image_url
    }
  }
`;
//USED FOR SELECT-OPTIONS
const QUERY_MOVIES_SELECT = gql`
  query moviesOptions {
    moviesOptions {
      movie_id
      movie_name
    }
  }
`;

const QUERY_MOVIE_TOP8 = gql`
  query getTop8Movies {
    getTop8Movies {
      duration_seconds
      image_url
      movie_id
      movie_name
      release_date
      review_score
      description
      likes
    }
  }
`;

export { GET_MOVIES, QUERY_MOVIE_TOP8, QUERY_MOVIES_SELECT };
