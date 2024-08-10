import { gql } from "@apollo/client";

// Mutation to create a new showtime
const MUTATION_SHOWTIME_CREATE = gql`
  mutation CreateShowTime($showTime: ShowTimeInput!) {
    createShowTime(show_time: $showTime) {
      show_time_id
      seat_count
      ticket_price
      show_date
      show_start_time
      show_end_time
      available_seat_count
    }
  }
`;

// Mutation to delete an existing showtime
const MUTATION_SHOWTIME_DELETE = gql`
  mutation Mutation($showTimeId: Int!) {
    deleteShowTime(show_time_id: $showTimeId)
  }
`;

// Mutation to update an existing showtime
const MUTATION_SHOWTIME_UPDATE = gql`
  mutation UpdateShowTime($showTimeId: Int!, $showTime: ShowTimeInput) {
    updateShowTime(show_time_id: $showTimeId, show_time: $showTime) {
      show_time_id
      seat_count
      ticket_price
      show_date
      show_start_time
      show_end_time
      available_seat_count
    }
  }
`;

// Query to fetch all showtime of a cinema
const QUERY_SHOWTIMES = gql`
  query GetShowTimeByCinemaId($cinemaId: Int!, $page: Int, $size: Int, $movieId: Int, $showDate: String) {
    getShowTimeByCinemaId(cinema_id: $cinemaId, page: $page, size: $size, movie_id: $movieId, show_date: $showDate) {
      show_time_id
      seat_count
      ticket_price
      show_date
      show_start_time
      show_end_time
      available_seat_count
      movie {
        movie_id
        movie_name
      }
    }
  }
`;

// Query to fetch a showtime by its ID
const QUERY_SHOWTIME_BY_ID = gql`
  query GetShowTimeDetailById($showtimeId: Int!) {
    getShowTimeDetailById(showtime_id: $showtimeId) {
      show_time_id
      seat_count
      ticket_price
      show_date
      show_start_time
      show_end_time
      available_seat_count

      movie {
        movie_id
        movie_name
      }
    }
  }
`;

export { MUTATION_SHOWTIME_CREATE, MUTATION_SHOWTIME_DELETE, MUTATION_SHOWTIME_UPDATE, QUERY_SHOWTIMES, QUERY_SHOWTIME_BY_ID };
