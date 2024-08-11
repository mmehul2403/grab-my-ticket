import * as React from "react";
import { useQuery } from "@apollo/client";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QUERY_SHOWTIME_BY_ID } from "../../../queries/ShowTimeGraphql.js";
import { QUERY_MOVIES_SELECT } from "../../../queries/MoviesQuery.js";
import moment from "moment/moment.js";

export default function ShowTimeDetail({ id, handleClose }) {
  const { loading, error, data } = useQuery(QUERY_SHOWTIME_BY_ID, {
    variables: { showtimeId: parseInt(id, 10) },
  });

  const { loading: showTimeLoading, error: showTimeError, data: movieOptionsData } = useQuery(QUERY_MOVIES_SELECT);
  if (loading || showTimeLoading) return "Loading...";
  if (error || showTimeError) return `Error! ${error.message}`;
  const showTimeData = data && data.getShowTimeDetailById ? data.getShowTimeDetailById : {};

  let movieOps = Array.isArray(movieOptionsData?.moviesOptions) ? movieOptionsData.moviesOptions : [];

  let options = movieOps.map((element) => ({
    label: element.movie_name,
    value: parseInt(element.movie_id),
  }));

  const selectedMovie = options.find((option) => {
    return option.value === showTimeData?.movie?.movie_id;
  });

  return !id ? (
    ""
  ) : (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
      <Grid item xs={6}>
        <TextField id="show_date" label="Show Date" variant="outlined" fullWidth defaultValue={moment(parseInt(showTimeData.show_date)).add("hours", 8).format("YYYY-MM-DD")} margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="show_start_time" label="Start Time" variant="outlined" fullWidth defaultValue={showTimeData.show_start_time} margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="show_end_time" label="End Time" variant="outlined" fullWidth defaultValue={showTimeData.show_end_time} margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="seat_count" label="Seat Count" variant="outlined" fullWidth defaultValue={showTimeData.seat_count ?? 0} margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="available_seat_count" label="Available Seat Count" variant="outlined" fullWidth defaultValue={showTimeData.available_seat_count ?? 0} margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="ticket_price" label="Ticket Price" variant="outlined" fullWidth defaultValue={showTimeData.ticketPrice ?? 0} margin="normal" />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={selectedMovie} // Ensure this matches an object in `options`
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
        <Button id="detail-form-close" variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
          Close
        </Button>
      </Grid>
    </Grid>
  );
}
