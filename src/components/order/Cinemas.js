import React, { useState } from "react";

import { useQuery } from "@apollo/client";
// import { QUERY_CINEMAS } from "../queries/CinemaGraphql";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { QUERY_CINEMAS_SHOWTIME } from "../../queries/CinemaGraphql.js";
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { Tab, Tabs, TabsListProvider } from "@mui/base";
import moment from "moment/moment.js";
const Cinemas = () => {
  const navigate = useNavigate();
  let { movie_id } = useParams();
  const formatPattern = "YYYY-MM-DD";
  let [queryDate, setQueryDate] = useState(moment().format(formatPattern));
  let today = moment().format(formatPattern);
  let tomorrow = moment().add(1, "days").format(formatPattern);
  let dayAfterTomorrow = moment().add(2, "days").format(formatPattern);
  const { loading, error, data } = useQuery(QUERY_CINEMAS_SHOWTIME, { variables: { movie_id: parseInt(movie_id), queryDate: queryDate } });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const navigateToBookPage = (event) => {
    console.log(event.currentTarget.id);
    navigate({
      pathname: "/Book/" + event.currentTarget.id,
    });
  };
  const dateTabChange = (event) => {
    setQueryDate(event.currentTarget.value);
  };
  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Button onClick={dateTabChange} value={today}>
          {today}
        </Button>
        <Button disabled onClick={dateTabChange} value={tomorrow}>
          {tomorrow}
        </Button>
        <Button disabled onClick={dateTabChange} value={dayAfterTomorrow}>
          {dayAfterTomorrow}
        </Button>
      </Stack>
      <Grid container spacing={3} justifyContent="center">
        {data.getShowTimeByMovieId.map((cinema, index) => (
          <Grid item key={index} xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Card>
              <CardContent className="movie-content">
                <Typography variant="h6" component="div">
                  {cinema.cinema_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cinema.cinema_address}
                </Typography>
                {cinema.show_times.map((show_time, index) => (
                  <Box columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pl: 2, pr: 2, display: "inline" }}>
                    <Button variant="outlined" id={show_time.show_time_id} onClick={navigateToBookPage}>
                      {show_time.show_start_time}
                    </Button>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cinemas;
