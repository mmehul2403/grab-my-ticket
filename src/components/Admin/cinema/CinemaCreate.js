import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useMutation } from "@apollo/client";
import { MUTATION_CINEMA_CREATE } from "../../../queries/CinemaGraphql.js";

export default function CinemaCreate({ handleClose, refetch }) {
  const [createCinema] = useMutation(MUTATION_CINEMA_CREATE, {
    onCompleted({ createCinema }) {
      if (createCinema.code === 0) {
        let message = createCinema.message;
        if (message) {
          const fields = message.split(";");
          fields.forEach((field) => {
            const currentField = field.split(",");
            const fieldName = currentField[0];
            const fieldNameErrorMsg = currentField[1];

            switch (fieldName) {
              case "cinemaName":
                setCinemaNameErrorMessage(fieldNameErrorMsg);
                break;

              default:
                break;
            }
          });
        }
      } else {
        // reload data and close the dialog
        refetch();
        handleClose();
      }
    },
  });
  const [cinemaName, setCinemaName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [telephoneNumber, setTelephoneNumber] = React.useState("");

  const [cinemaNameErrorMessage, setCinemaNameErrorMessage] = React.useState("");
  const [addressErrorMessage, setAddressErrorMessage] = React.useState("");
  const [telephoneNumberErrorMessage, setTelephoneNumberErrorMessage] = React.useState("");
  function onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cinema = Object.fromEntries(formData.entries());
    let valid = true;

    if (valid) {
      // ADD_cinema
      createCinema({ variables: { cinema: cinema } });
    } else {
      return false;
    }
  }

  return (
    <form onSubmit={onsubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
        <Grid item xs={12}>
          <TextField
            id="cinemaName"
            label="CinemaName"
            variant="outlined"
            name="cinema_name"
            fullWidth
            value={cinemaName}
            error={!!cinemaNameErrorMessage}
            helperText={cinemaNameErrorMessage}
            onChange={(e) => setCinemaName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cinema_address"
            label="Cinema Address"
            variant="outlined"
            name="cinema_address"
            fullWidth
            value={address}
            error={!!addressErrorMessage}
            helperText={addressErrorMessage}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="telephone_number"
            label="Telephone Number"
            variant="outlined"
            name="telephone_number"
            fullWidth
            value={telephoneNumber}
            error={!!telephoneNumberErrorMessage}
            helperText={telephoneNumberErrorMessage}
            onChange={(e) => setTelephoneNumber(e.target.value)}
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
          <Button id="create-form-submit" variant="outlined" startIcon={<DoneIcon />} type="submit">
            Submit
          </Button>
          <Button id="create-form-cancel" variant="outlined" startIcon={<DoneIcon />} onClick={handleClose} sx={{ ml: 3 }}>
            Close
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
