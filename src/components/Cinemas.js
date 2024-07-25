import React from "react";

import { useQuery } from "@apollo/client";
// import { QUERY_CINEMAS } from "../queries/CinemaGraphql";
import { useParams } from "react-router-dom";
import { QUERY_CINEMAS_SHOWTIME } from "../queries/CinemaGraphql.js";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
const Cinemas = () => {
  let { movie_id } = useParams();
  const { loading, error, data } = useQuery(QUERY_CINEMAS_SHOWTIME, { variables: { movie_id: parseInt(movie_id) } });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
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
                    <Button variant="outlined" show-time-id={show_time.show_time_id}>
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
