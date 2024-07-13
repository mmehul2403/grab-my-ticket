import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { Button, Grid, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { QUERY_CINEMA_BY_ID, MUTATION_CINEMA_UPDATE } from "../../../queries/CinemaGraphql.js";
import { enqueueSnackbar } from "notistack";

export default function CinemaUpdate({ id, refetch, handleClose }) {
  const [updateCinema] = useMutation(MUTATION_CINEMA_UPDATE, {
    onCompleted({ updateCinema }) {
      if (updateCinema.code === -1) {
        let message = updateCinema.message;
        if (message) {
          enqueueSnackbar(message, { variant: "warning" });
        }
      } else {
        // reload data and close the dialog
        enqueueSnackbar("Updated Successfully", {
          variant: "success",
          autoHideDuration: 500,
          onClose: () => {
            // on close callback:reload data and close the dialog
            refetch();
            handleClose();
          },
        });
      }
    },
  });
  const { loading, error, data } = useQuery(QUERY_CINEMA_BY_ID, {
    variables: {
      cinema_id: parseInt(id),
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  function onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCinema = Object.fromEntries(formData.entries());
    newCinema.cinema_id = parseInt(id);
    // update_cinema
    updateCinema({ variables: { cinema: newCinema } });
  }

  return (
    <form onSubmit={onsubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
        <Grid item xs={12}>
          <TextField id="detail_cinema_name" fullWidth label="Cinema Name" name="cinema_name" defaultValue={data.queryCinemaById.cinema_name} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="detail_cinema_address" fullWidth label="lastName" name="cinema_address" defaultValue={data.queryCinemaById.cinema_address} margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="detail_telephone_number" fullWidth label="telephone_number" name="telephone_number" defaultValue={data.queryCinemaById.telephone_number} margin="normal" />
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
