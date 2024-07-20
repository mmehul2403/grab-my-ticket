import * as React from "react";
import { useQuery } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QUERY_CINEMA_BY_ID } from "../../../queries/CinemaGraphql.js";

export default function CinemaDetail({ id, handleClose }) {
  const { loading, error, data } = useQuery(QUERY_CINEMA_BY_ID, {
    variables: { cinema_id: parseInt(id, 10) },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Check if data and data.cinema are defined
  const cinema = data && data.cinema ? data.cinema : {};

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 3, sm: 4, md: 5 }}
      sx={{ mt: 2, pl: 2, pr: 2 }}
      direction="row"
    >
      <Grid item xs={12}>
        <TextField
          id="detail_cinema_name"
          fullWidth
          label="Cinema Name"
          name="cinema_name"
          defaultValue={cinema.cinema_name || ""}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="detail_cinema_address"
          fullWidth
          label="Cinema Address"
          name="cinema_address"
          defaultValue={cinema.cinema_address || ""}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="detail_telephone_number"
          fullWidth
          label="Telephone Number"
          name="telephone_number"
          defaultValue={cinema.telephone_number || ""}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
        <Button
          id="detail-form-close"
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={handleClose}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
}
