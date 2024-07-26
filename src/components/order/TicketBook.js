import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
// import { QUERY_CINEMAS } from "../queries/CinemaGraphql";
import { useParams } from "react-router-dom";
import { QUERY_SHOWTIME_BY_ID } from "../../queries/CinemaGraphql.js";
import { MUTATION_ORDER_CREATE } from "../../queries/OrderQuery.js";
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import NumberInput from "../common/NumberInput.js";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import moment from "moment";
const TicketBook = () => {
  let { showtime_id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [ticketNum, setTicketNum] = useState(1);
  const { loading, error, data } = useQuery(QUERY_SHOWTIME_BY_ID, { variables: { showtime_id: parseInt(showtime_id) } });
  const [createOrder] = useMutation(MUTATION_ORDER_CREATE, {
    onCompleted({ createOrder }) {
      console.log(createOrder);
      debugger;
      if (createOrder) {
        enqueueSnackbar("Tickets booked Successfully", {
          variant: "success",
          autoHideDuration: 500,
          onClose: () => {
            setOrderDetail(createOrder);
          },
        });
      }
    },
    onError(err) {
      enqueueSnackbar(`Error updating cinema: ${err.message}`, {
        variant: "error",
        autoHideDuration: 500,
      });
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const placeOrder = () => {};
  function onsubmit(event) {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // formData.show_time_id = parseInt(showtime_id);
    let valid = true;

    if (valid) {
      // book the tickets
      createOrder({ variables: { showTimeId: parseInt(showtime_id), ticketNum: ticketNum } });
    } else {
      return false;
    }
  }
  return (
    <Container>
      <SnackbarProvider>
        {/* <Grid container spacing={3} justifyContent="center"> */}
        {/* <Grid item key={index} xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}> */}
        <Card>
          <CardContent className="movie-content">
            {orderDetail == null ? (
              <Box>
                <Typography variant="h6" component="div">
                  Cinema Name: {data.getShowTimeDetailById.cinema.cinema_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cinema Address:{data.getShowTimeDetailById.cinema.cinema_address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Telephone Number: {data.getShowTimeDetailById.cinema.telephone_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Show Date: {data.getShowTimeDetailById.show_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time:{data.getShowTimeDetailById.show_start_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Time:{data.getShowTimeDetailById.show_end_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seat Count:{data.getShowTimeDetailById.seat_count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ticket Price:{data.getShowTimeDetailById.ticket_price}
                </Typography>
                <form onSubmit={onsubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <NumberInput
                      name="ticketNum"
                      value={ticketNum}
                      onChange={(event, val) => {
                        setTicketNum(val);
                        event.preventDefault();
                      }}
                      aria-label="Demo number input"
                      placeholder="Type a number…"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    {/* <Button variant="outlined" id={showtime_id} onClick={placeOrder}>
              Book
            </Button> */}
                    <Button variant="outlined" type="submit">
                      Book Now
                    </Button>
                  </Box>
                </form>
              </Box>
            ) : (
              <Box>
                {" "}
                <Typography variant="body2" color="text.secondary">
                  Order Date:{moment(parseInt(orderDetail.book_date)).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ticket_amount:{orderDetail.ticket_amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ticket Num:{orderDetail.ticket_num}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  show_date:{moment(parseInt(orderDetail.show_time.show_date)).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start time:{orderDetail.show_time.show_start_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End time:{orderDetail.show_time.show_end_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cinema Name:{orderDetail.show_time.cinema.cinema_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cinema Address:{orderDetail.show_time.cinema.cinema_address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cinema Telephone:{orderDetail.show_time.cinema.telephone_number}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
        {/* </Grid>
      </Grid> */}
      </SnackbarProvider>
    </Container>
  );
};

export default TicketBook;
