import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";

const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: Int!) {
    getUserOrders(userId: $userId) {
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

const UserOrderHistory = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_ORDERS, {
    variables: { userId },
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const orders = data.getUserOrders;

  // Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Orders
      </Typography>
      {orders.length === 0 ? (
        <Alert severity="info">No orders found for this user.</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Order ID: {order.id}
                    </Typography>
                    <Typography color="text.secondary">
                      Show Time ID: {order.showTimeId}
                    </Typography>
                    <Typography color="text.secondary">
                      Ticket Number: {order.ticketNum}
                    </Typography>
                    <Typography color="text.secondary">
                      Total Price: ${order.totalPrice}
                    </Typography>
                    <Typography color="text.secondary">
                      Seats:{" "}
                      {order.seats
                        .map((seat) => `${seat.row}${seat.column}`)
                        .join(", ")}
                    </Typography>
                    <Typography color="text.secondary">
                      Created At: {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
    </Container>
  );
};

export default UserOrderHistory;
