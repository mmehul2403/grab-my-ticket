import { gql } from "@apollo/client";

const MUTATION_CINEMA_CREATE = gql`
  mutation createCinema($cinema: CinemaInputCreate!) {
    createCinema(cinema: $cinema) {
      code
      message
    }
  }
`;
const MUTATION_CINEMA_DELETE = gql`
  mutation deleteCinema($cinema_id: Int!) {
    deleteCinema(cinema_id: $cinema_id) {
      code
      message
    }
  }
`;
const MUTATION_CINEMA_UPDATE = gql`
  mutation updateCinema($cinema: CinemaInputUpdate!) {
    updateCinema(cinema: $cinema) {
      code
      message
    }
  }
`;

const QUERY_CINEMA_BY = gql`
  query queryCinemaBy($cinema_name: String) {
    queryCinemaBy(cinema_name: $cinema_name) {
      cinema_id
      cinema_name
      cinema_address
      telephone_number
    }
  }
`;
const QUERY_CINEMA_BY_ID = gql`
  query queryCinemaById($cinema_id: Int!) {
    queryCinemaById(cinema_id: $cinema_id) {
      cinema_name
      cinema_address
      telephone_number
    }
  }
`;
export { MUTATION_CINEMA_CREATE, MUTATION_CINEMA_DELETE, MUTATION_CINEMA_UPDATE, QUERY_CINEMA_BY, QUERY_CINEMA_BY_ID };
