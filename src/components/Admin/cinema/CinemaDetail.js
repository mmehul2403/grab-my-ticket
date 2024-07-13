import * as React from "react";
import { useQuery } from "@apollo/client";
import { Button, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QUERY_CINEMA_BY_ID } from "../../../queries/CinemaGraphql.js";

export default function CinemaDetail({ id, handleClose }) {
  const { loading, error, data } = useQuery(QUERY_CINEMA_BY_ID, {
    variables: {
      cinema_id: parseInt(id),
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
      <Grid item xs={12}>
        <TextField
          id="detail_cinema_name"
          fullWidth
          label="Cinema Name"
          name="cinema_name"
          defaultValue={data.queryCinemaById.cinema_name}
          InputProps={{
            readOnly: true,
          }}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="detail_cinema_address"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          label="lastName"
          name="cinema_address"
          defaultValue={data.queryCinemaById.cinema_address}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="detail_telephone_number"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          label="telephone_number"
          name="telephone_number"
          defaultValue={data.queryCinemaById.telephone_number}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
        <Button id="create-form-close" variant="outlined" startIcon={<CloseIcon />} onClick={handleClose} sx={{ ml: 3 }}>
          Close
        </Button>
      </Grid>
    </Grid>
  );
}
