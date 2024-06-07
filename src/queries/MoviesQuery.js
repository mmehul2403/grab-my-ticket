import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
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
