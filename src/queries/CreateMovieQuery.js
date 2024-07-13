import { gql } from "@apollo/client";

export const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie(
    $movie_name: String!
    $duration_seconds: Int!
    $release_date: String!
    $review_score: Float!
    $file: Upload!
  ) {
    createMovie(
      movie_name: $movie_name
      duration_seconds: $duration_seconds
      release_date: $release_date
      review_score: $review_score
      file: $file
    ) {
      movie_id
      movie_name
      duration_seconds
      release_date
      review_score
      image_url
    }
  }
`;
