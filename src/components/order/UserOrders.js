import React from "react";

import { useQuery } from "@apollo/client";

import { QUERY_ORDERS_BY_USER_ID } from "../../queries/OrderQuery.js";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import moment from "moment";
const UserOrders = () => {
  const { loading, error, data } = useQuery(QUERY_ORDERS_BY_USER_ID);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {data.getOrdersByUserId.map((order, index) => (
          <Grid item key={index} xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Card>
              <CardContent className="movie-content">
                <Typography variant="body2" color="text.secondary">
                  ticket_num; {order.ticket_num}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ticket_amount: {order.ticket_amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  book_date: {moment(parseInt(order.book_date)).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  show_date: {moment(parseInt(order.show_time.show_date)).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ticket_price: {order.show_time.ticket_price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  show_start_time : {order.show_time.show_start_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  show_end_time: {order.show_time.show_end_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  cinema: {order.show_time.cinema.cinema_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  cinema_address : {order.show_time.cinema.cinema_address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  city:{order.show_time.cinema.city.city_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  province_name: {order.show_time.cinema.city.province.province_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserOrders;
