import { gql } from "@apollo/client";

const QUERY_ORDER_DETAIL_BY_ID = gql`
  query GetOrderDetail($orderId: Int!) {
    getOrderDetail(order_id: $orderId) {
      order_id
      ticket_num
      ticket_amount
      book_date
      show_time {
        show_date
        show_start_time
        ticket_price

        cinema {
          cinema_name
          cinema_address
          cinema_id
          city {
            city_id
            city_name
            province {
              province_name
            }
          }
        }
      }
    }
  }
`;
const MUTATION_ORDER_CREATE = gql`
  mutation createOrder($ticketNum: Int!, $showTimeId: Int) {
    createOrder(ticket_num: $ticketNum, show_time_id: $showTimeId) {
      order_id
      ticket_num
      ticket_amount
      book_date
      show_time {
        cinema {
          cinema_address
          cinema_name
          telephone_number
        }
        show_date
        show_start_time
        show_end_time
        ticket_price
      }
    }
  }
`;

const QUERY_ORDERS_BY_USER_ID = gql`
  query GetOrdersByUserId {
    getOrdersByUserId {
      order_id
      ticket_num
      ticket_amount
      book_date
      show_time {
        show_time_id
        seat_count
        ticket_price
        show_date
        show_start_time
        show_end_time
        available_seat_count
        cinema {
          cinema_id
          cinema_name
          cinema_address
          telephone_number
          city {
            city_id
            city_name
            province {
              province_name
            }
          }
        }
      }
    }
  }
`;
export { QUERY_ORDER_DETAIL_BY_ID, MUTATION_ORDER_CREATE, QUERY_ORDERS_BY_USER_ID };
