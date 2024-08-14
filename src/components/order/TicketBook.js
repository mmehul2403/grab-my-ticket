import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SHOWTIME_BY_ID } from "../../queries/CinemaGraphql.js";
import {
  CREATE_ORDER_MONGO,
  GET_BOOKED_SEATS,
} from "../../queries/OrderQueryMongo.js";
import { useAuth } from "../auth/AuthProvider.js";
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
  const [bookedSeats, setBookedSeats] = useState([]);
  const { user } = useAuth();

  // Query showtime details
  const {
    loading: showtimeLoading,
    error: showtimeError,
    data: showtimeData,
  } = useQuery(QUERY_SHOWTIME_BY_ID, {
    variables: { showtime_id: parseInt(showtime_id) },
  });

  // Query booked seats
  const {
    loading: bookedSeatsLoading,
    error: bookedSeatsError,
    data: bookedSeatsData,
  } = useQuery(GET_BOOKED_SEATS, {
    variables: { showTimeId: parseInt(showtime_id) },
    onCompleted: (data) => {
      setBookedSeats(data.getBookedSeats);
    },
  });

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

  if (showtimeLoading || bookedSeatsLoading) return "Loading...";
  if (showtimeError || bookedSeatsError)
    return `Error! ${showtimeError?.message || bookedSeatsError?.message}`;

  const handleSeatClick = (row, column) => {
    const seat = { row, column };
    const isBooked = bookedSeats.some(
      (s) => s.row === row && s.column === column
    );
    if (isBooked) return; // Do nothing if seat is booked

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
      selectedSeats.length * showtimeData.getShowTimeDetailById.ticket_price;
    createOrderMongo({
      variables: {
        showTimeId: parseInt(showtime_id),
        ticketNum: selectedSeats.length,
        seats: selectedSeats,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        userId: parseInt(user?.user_id),
        userEmail: user?.email_address,
      },
    });
  };

  const totalSeats = showtimeData.getShowTimeDetailById.seat_count;
  const rows = 20; // A to T
  const seatsPerRow = Math.ceil(totalSeats / rows);
  const alphabet = "ABCDEFGHIJKLMNOPQRST";
  const ticketPrice = showtimeData.getShowTimeDetailById.ticket_price;

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
                        sx={{ fontWeight: "bold" }}
                      >
                        Showtime:{" "}
                        {showtimeData.getShowTimeDetailById.show_start_time} -{" "}
                        {showtimeData.getShowTimeDetailById.show_end_time}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        Date:
                        {new Date(
                          parseInt(showtimeData.getShowTimeDetailById.show_date)
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" component="div">
                      Total Seats: {totalSeats}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Ticket Price: ${ticketPrice}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Select Seats
                  </Typography>
                  <Grid container spacing={1}>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                      <Grid container item key={rowIndex}>
                        {Array.from({ length: seatsPerRow }).map(
                          (_, seatIndex) => {
                            const seatNumber =
                              alphabet[rowIndex] + (seatIndex + 1);
                            const isSelected = selectedSeats.some(
                              (s) =>
                                s.row === seatNumber[0] &&
                                s.column === parseInt(seatNumber.slice(1))
                            );
                            const isBooked = bookedSeats.some(
                              (s) =>
                                s.row === seatNumber[0] &&
                                s.column === parseInt(seatNumber.slice(1))
                            );
                            return (
                              <Grid item key={seatNumber} xs={1} sm={1} md={1}>
                                <Button
                                  variant={
                                    isSelected ? "contained" : "outlined"
                                  }
                                  color={
                                    isSelected
                                      ? "primary"
                                      : isBooked
                                      ? "secondary"
                                      : "inherit"
                                  }
                                  onClick={() =>
                                    !isBooked &&
                                    handleSeatClick(
                                      seatNumber[0],
                                      parseInt(seatNumber.slice(1))
                                    )
                                  }
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    mb: 1,
                                    cursor: isBooked
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  disabled={isBooked}
                                >
                                  <EventSeatIcon />
                                  {seatNumber}
                                </Button>
                              </Grid>
                            );
                          }
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Total Seats Selected: {selectedSeats.length}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Total Price: ${totalPrice}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onsubmit}
                  sx={{ mt: 2 }}
                >
                  Confirm Booking
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  padding: 3,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Booking Confirmation
                </Typography>
                <Typography variant="h6" component="div">
                  Your booking is confirmed! Thank you for choosing our cinema.
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
