import { gql } from "@apollo/client";

// Mutation to create a new order
export const CREATE_ORDER_MONGO = gql`
  mutation CreateOrderMongo(
    $showTimeId: Int!
    $ticketNum: Int!
    $seats: [SeatInput]!
    $totalPrice: Float!
  ) {
    createOrderMongo(
      showTimeId: $showTimeId
      ticketNum: $ticketNum
      seats: $seats
      totalPrice: $totalPrice
    ) {
      id
      showTimeId
      ticketNum
      seats {
        row
        column
      }
      totalPrice
      createdAt
    }
  }
`;

// Query to get order details by ID
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
      createdAt
    }
  }
`;
