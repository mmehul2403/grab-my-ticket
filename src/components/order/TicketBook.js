import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SHOWTIME_BY_ID } from "../../queries/CinemaGraphql.js";
import { CREATE_ORDER_MONGO } from "../../queries/OrderQueryMongo.js";

import FormatDate from "../utilities/FormatDate.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const TicketBook = () => {
  let { showtime_id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { loading, error, data } = useQuery(QUERY_SHOWTIME_BY_ID, {
    variables: { showtime_id: parseInt(showtime_id) },
  });

  // Use the defined mutation
  const [createOrderMongo] = useMutation(CREATE_ORDER_MONGO, {
    onCompleted({ createOrderMongo }) {
      if (createOrderMongo) {
        enqueueSnackbar("Tickets booked successfully", {
          variant: "success",
          autoHideDuration: 500,
          onClose: () => {
            setOrderDetail(createOrderMongo);
          },
        });
      }
    },
    onError(err) {
      enqueueSnackbar(`Error booking tickets: ${err.message}`, {
        variant: "error",
        autoHideDuration: 500,
      });
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleSeatClick = (row, column) => {
    const seat = { row, column };
    setSelectedSeats((prevSelectedSeats) => {
      const seatExists = prevSelectedSeats.some(
        (s) => s.row === row && s.column === column
      );
      if (seatExists) {
        return prevSelectedSeats.filter(
          (s) => s.row !== row || s.column !== column
        );
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    const totalPrice =
      selectedSeats.length * data.getShowTimeDetailById.ticket_price;
    createOrderMongo({
      variables: {
        showTimeId: parseInt(showtime_id),
        ticketNum: selectedSeats.length,
        seats: selectedSeats,
        totalPrice: parseFloat(totalPrice.toFixed(2)), // Pass the total price here
      },
    });
  };

  const totalSeats = data.getShowTimeDetailById.seat_count;
  const rows = 20; // A to T
  const seatsPerRow = Math.ceil(totalSeats / rows);
  const alphabet = "ABCDEFGHIJKLMNOPQRST";
  const ticketPrice = data.getShowTimeDetailById.ticket_price;

  const totalPrice = (selectedSeats.length * ticketPrice).toFixed(2);

  return (
    <Container>
      <SnackbarProvider>
        <Card>
          <CardContent className="movie-content">
            {orderDetail == null ? (
              <Box>
                <Box
                  sx={{
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    boxShadow: 3,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Cinema Details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "medium" }}
                      >
                        {data.getShowTimeDetailById.cinema.cinema_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.getShowTimeDetailById.cinema.telephone_number}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {data.getShowTimeDetailById.cinema.cinema_address}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Show Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {FormatDate(
                          data.getShowTimeDetailById.show_date,
                          "yyyy-MMM-dd"
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Start Time
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {data.getShowTimeDetailById.show_start_time}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        End Time
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {data.getShowTimeDetailById.show_end_time}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Total Seats
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {totalSeats}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Ticket Price
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        ${ticketPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={1}></Grid>
                    {[...Array(seatsPerRow)].map((_, seatIndex) => (
                      <Grid item key={seatIndex}>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center" }}
                        >
                          {seatIndex + 1}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  {alphabet.split("").map((letter, rowIndex) => (
                    <Grid
                      container
                      spacing={1}
                      key={letter}
                      alignItems="center"
                    >
                      <Grid item xs={1}>
                        <Typography variant="body2">{letter}</Typography>
                      </Grid>
                      {[...Array(seatsPerRow)].map((_, seatIndex) => {
                        const columnNumber = seatIndex + 1;
                        return (
                          <Grid item key={seatIndex}>
                            <EventSeatIcon
                              color={
                                selectedSeats.some(
                                  (seat) =>
                                    seat.row === letter &&
                                    seat.column === columnNumber
                                )
                                  ? "primary"
                                  : "disabled"
                              }
                              onClick={() =>
                                handleSeatClick(letter, columnNumber)
                              }
                              style={{ cursor: "pointer", fontSize: "30px" }}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  ))}
                </Box>

                <form onSubmit={onsubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2">
                      Selected Seats:{" "}
                      {selectedSeats.map(
                        (seat) => `${seat.row}${seat.column} `
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Total Price: ${totalPrice}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button type="submit" variant="contained">
                      Confirm
                    </Button>
                  </Box>
                </form>
              </Box>
            ) : (
              <Box sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Booking Details
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Showtime ID: {orderDetail.showTimeId}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Ticket Number: {orderDetail.ticketNum}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Seats:{" "}
                  {orderDetail.seats.map(
                    (seat) => `${seat.row}${seat.column} `
                  )}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Total Price: ${orderDetail.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </SnackbarProvider>
    </Container>
  );
};

export default TicketBook;
