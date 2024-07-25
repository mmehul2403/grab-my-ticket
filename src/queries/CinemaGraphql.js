import { gql } from "@apollo/client";

// Mutation to create a new cinema
const MUTATION_CINEMA_CREATE = gql`
  mutation createCinema($cinema_name: String!, $cinema_address: String!, $cinema_city_id: Int!, $cinema_province_id: Int!, $telephone_number: String) {
    createCinema(cinema_name: $cinema_name, cinema_address: $cinema_address, cinema_city_id: $cinema_city_id, cinema_province_id: $cinema_province_id, telephone_number: $telephone_number) {
      cinema_id
      cinema_name
      cinema_address
      telephone_number
      city {
        city_id
        city_name
      }
      province {
        province_id
        province_name
      }
    }
  }
`;

// Mutation to delete an existing cinema
const MUTATION_CINEMA_DELETE = gql`
  mutation deleteCinema($cinema_id: Int!) {
    deleteCinema(cinema_id: $cinema_id)
  }
`;

// Mutation to update an existing cinema
const MUTATION_CINEMA_UPDATE = gql`
  mutation updateCinema($cinema_id: Int!, $cinema_name: String, $cinema_address: String, $cinema_city_id: Int, $cinema_province_id: Int, $telephone_number: String) {
    updateCinema(
      cinema_id: $cinema_id
      cinema_name: $cinema_name
      cinema_address: $cinema_address
      cinema_city_id: $cinema_city_id
      cinema_province_id: $cinema_province_id
      telephone_number: $telephone_number
    ) {
      cinema_id
      cinema_name
      cinema_address
      telephone_number
      city {
        city_id
        city_name
      }
      province {
        province_id
        province_name
      }
    }
  }
`;

// Query to fetch all cinemas
const QUERY_CINEMAS = gql`
  query cinemas {
    cinemas {
      cinema_id
      cinema_name
      cinema_address
      telephone_number
      city {
        city_id
        city_name
      }
      province {
        province_id
        province_name
      }
    }
  }
`;

// Query to fetch a cinema by its ID
const QUERY_CINEMA_BY_ID = gql`
  query cinema($cinema_id: Int!) {
    cinema(cinema_id: $cinema_id) {
      cinema_id
      cinema_name
      cinema_address
      telephone_number
      city {
        city_id
        city_name
      }
      province {
        province_id
        province_name
      }
    }
  }
`;

const QUERY_CITIES = gql`
  query GetCities {
    cities {
      city_id
      city_name
    }
  }
`;

const QUERY_PROVINCES = gql`
  query GetProvinces {
    provinces {
      province_id
      province_name
    }
  }
`;
const QUERY_CINEMAS_SHOWTIME = gql`
  query getShowTimeByMovieId($movie_id: Int!) {
    getShowTimeByMovieId(movie_id: $movie_id) {
      cinema_id
      cinema_name
      cinema_address
      show_times {
        show_time_id
        seat_count
        ticket_price
        show_date
        show_start_time
        show_end_time
      }
    }
  }
`;

export { MUTATION_CINEMA_CREATE, MUTATION_CINEMA_DELETE, MUTATION_CINEMA_UPDATE, QUERY_CINEMAS, QUERY_CINEMA_BY_ID, QUERY_CITIES, QUERY_PROVINCES, QUERY_CINEMAS_SHOWTIME };
