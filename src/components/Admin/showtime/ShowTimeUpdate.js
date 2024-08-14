import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { QUERY_SHOWTIME_BY_ID, MUTATION_SHOWTIME_UPDATE } from "../../../queries/ShowTimeGraphql.js";
import { enqueueSnackbar } from "notistack";
import { QUERY_MOVIES_SELECT } from "../../../queries/MoviesQuery.js";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function ShowTimeUpdate({ id, refetch, handleClose }) {
  const [selectedValues, setSelectedValues] = React.useState(null);
  const [beginTime, setBeginTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [showDateVal, setShowDateVal] = React.useState(null);

  const { loading, error, data } = useQuery(QUERY_SHOWTIME_BY_ID, {
    variables: { showtimeId: parseInt(id, 10) },
  });

  const { loading: showTimeLoading, error: showTimeError, data: movieOptionsData } = useQuery(QUERY_MOVIES_SELECT);

  const [updateShowTime] = useMutation(MUTATION_SHOWTIME_UPDATE, {
    onCompleted({ updateShowTime }) {
      if (updateShowTime.code === -1) {
        let message = updateShowTime.message;
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

  React.useEffect(() => {
    if (data && data.getShowTimeDetailById) {
      const showTimeData = data.getShowTimeDetailById;

      setBeginTime(moment(showTimeData.show_start_time, "HH:mm:ss"));
      setEndTime(moment(showTimeData.show_end_time, "HH:mm:ss"));
      //fix the timezone issue
      setShowDateVal(moment(parseInt(showTimeData.show_date)).add("hours", 8));
      const movieOptions = movieOptionsData?.moviesOptions || [];
      const selectedMovie = movieOptions.find((option) => {
        return parseInt(option.movie_id) === showTimeData.movie?.movie_id;
      });
      setSelectedValues(selectedMovie ? { label: selectedMovie.movie_name, value: selectedMovie.movie_id } : null);
    }
  }, [data, movieOptionsData]);

  const formatTime = (time) => (time ? time.format("HH:mm:ss") : "00:00:00");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const showTimeFormData = {
      show_date: showDateVal ? showDateVal.toISOString() : null,
      show_start_time: formatTime(beginTime),
      show_end_time: formatTime(endTime),
      seat_count: parseInt(formData.get("seat_count"), 10),
      available_seat_count: parseInt(formData.get("available_seat_count"), 10),
      ticket_price: parseFloat(formData.get("ticket_price"), 10),
      movie_id: parseInt(selectedValues?.value),
    };

    updateShowTime({ variables: { showTimeId: parseInt(id, 10), showTime: showTimeFormData } });
  };

  if (loading || showTimeLoading) return "Loading...";
  if (error || showTimeError) return `Error! ${error.message}`;

  const movieOptions = movieOptionsData?.moviesOptions || [];
  const options = movieOptions.map((element) => ({
    label: element.movie_name,
    value: parseInt(element.movie_id),
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker label="Show Date" value={showDateVal} onChange={(newValue) => setShowDateVal(newValue)} renderInput={(params) => <TextField {...params} />} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              label="Show Start Time"
              value={beginTime}
              onChange={(newValue) => setBeginTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} style={{ paddingTop: "32px" }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              label="Show End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField id="seat_count" name="seat_count" label="Seat Count" variant="outlined" fullWidth defaultValue={data?.getShowTimeDetailById?.seat_count ?? 0} margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="available_seat_count"
            name="available_seat_count"
            label="Available Seat Count"
            variant="outlined"
            fullWidth
            defaultValue={data?.getShowTimeDetailById?.available_seat_count ?? 0}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField id="ticket_price" name="ticket_price" label="Ticket Price" variant="outlined" fullWidth defaultValue={data?.getShowTimeDetailById?.ticketPrice ?? 0} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={selectedValues} // Ensure this matches an object in `options`
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" name="movie_id" />}
            onChange={(event, newValue) => {
              setSelectedValues(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, textAlign: "center" }}>
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
