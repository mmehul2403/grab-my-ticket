import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Autocomplete } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { MUTATION_SHOWTIME_CREATE } from "../../../queries/ShowTimeGraphql.js";
import { enqueueSnackbar } from "notistack";
import { QUERY_MOVIES_SELECT } from "../../../queries/MoviesQuery.js";
import moment from "moment/moment.js";
export default function ShowTimeCreate({ cinema_id, refetch, handleClose }) {
  const [selectedValues, setSelectedValues] = React.useState(null);

  const { loading: showTimeLoading, error: showTimeError, data: movieOptionsData } = useQuery(QUERY_MOVIES_SELECT);
  const [createShowTime] = useMutation(MUTATION_SHOWTIME_CREATE, {
    onCompleted({ createShowTime }) {
      if (createShowTime.code === -1) {
        let message = createShowTime.message;
        if (message) {
          enqueueSnackbar(message, { variant: "warning" });
        }
      } else {
        enqueueSnackbar("Updated Successfully", {
          variant: "success",
          autoHideDuration: 500,
          onClose: () => {
            refetch();
            handleClose();
          },
        });
      }
    },
    onError(err) {
      enqueueSnackbar(`Error updating cinema: ${err.message}`, {
        variant: "error",
      });
    },
  });
  if (showTimeLoading) return "Loading...";
  if (showTimeError) return `Error! ${showTimeError.message}`;

  let movieOps = Array.isArray(movieOptionsData?.moviesOptions) ? movieOptionsData.moviesOptions : [];

  let options = movieOps.map((element) => ({
    label: element.movie_name,
    value: parseInt(element.movie_id),
  }));

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const showTimeFormData = {
      show_date: formData.get("show_date"),
      show_start_time: formData.get("show_start_time"),
      show_end_time: formData.get("show_end_time"),
      seat_count: parseInt(formData.get("seat_count"), 10),
      available_seat_count: parseInt(formData.get("available_seat_count"), 10),
      ticket_price: parseFloat(formData.get("ticket_price"), 10),
      movie_id: selectedValues?.value,
      cinema_id: parseInt(cinema_id),
    };

    createShowTime({ variables: { showTime: showTimeFormData } });
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
        <Grid item xs={6}>
          <TextField id="show_date" name="show_date" label="Show Date" variant="outlined" fullWidth defaultValue={moment().format("YYYY-MM-DD")} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="show_start_time" name="show_start_time" label="Start Time" variant="outlined" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="show_end_time" name="show_end_time" label="End Time" variant="outlined" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="seat_count" name="seat_count" label="Seat Count" variant="outlined" fullWidth defaultValue={0} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="available_seat_count" name="available_seat_count" label="Available Seat Count" variant="outlined" fullWidth defaultValue={0} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField id="ticket_price" name="ticket_price" label="Ticket Price" variant="outlined" fullWidth defaultValue={0} margin="normal" />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" name="movie_id" />}
            onChange={(event, newValue) => {
              setSelectedValues(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
          <Button id="create-form-submit" variant="outlined" startIcon={<DoneIcon />} type="submit">
            Submit
          </Button>
          <Button id="create-form-close" variant="outlined" startIcon={<CloseIcon />} onClick={handleClose} sx={{ ml: 3 }}>
            Close
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
