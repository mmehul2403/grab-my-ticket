import { gql } from "@apollo/client";

export const CREATE_ORDER_MONGO = gql`
  mutation CreateOrderMongo(
    $showTimeId: Int!
    $ticketNum: Int!
    $seats: [SeatInput]!
    $totalPrice: Float!
    $userId: Int!
    $userEmail: String
  ) {
    createOrderMongo(
      showTimeId: $showTimeId
      ticketNum: $ticketNum
      seats: $seats
      totalPrice: $totalPrice
      userId: $userId
      userEmail: $userEmail
    ) {
      id
      showTimeId
      ticketNum
      seats {
        row
        column
      }
      totalPrice
      userId # Add userId here
      createdAt
    }
  }
`;

export const GET_ORDER_DETAILS_MONGO = gql`
  query GetOrderDetailsMongo($id: ID!) {
    getOrderByIdMongo(id: $id) {
      id
      showTimeId
      ticketNum
      seats {
        row
        column
      }
      totalPrice
      userId
      createdAt
    }
  }
`;

export const GET_BOOKED_SEATS = gql`
  query getBookedSeats($showTimeId: Int!) {
    getBookedSeats(showTimeId: $showTimeId) {
      row
      column
    }
  }
`;

export const QUERY_SHOWTIME_BY_ID = gql`
  query GetShowTimeDetailById($showtime_id: Int!) {
    getShowTimeDetailById(id: $showtime_id) {
      id
      show_time
      show_date
      seat_count
      ticket_price
      bookedSeats {
        row
        column
      }
    }
  }
`;
