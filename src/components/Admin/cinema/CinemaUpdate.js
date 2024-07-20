import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  QUERY_CINEMA_BY_ID,
  QUERY_CITIES,
  QUERY_PROVINCES,
  MUTATION_CINEMA_UPDATE,
} from "../../../queries/CinemaGraphql.js";
import { enqueueSnackbar } from "notistack";

export default function CinemaUpdate({ id, refetch, handleClose }) {
  const {
    loading: loadingCinema,
    error: errorCinema,
    data: cinemaData,
  } = useQuery(QUERY_CINEMA_BY_ID, {
    variables: { cinema_id: parseInt(id, 10) },
    onError(err) {
      enqueueSnackbar(`Error fetching cinema: ${err.message}`, {
        variant: "error",
      });
    },
  });

  const {
    loading: loadingCities,
    error: errorCities,
    data: citiesData,
  } = useQuery(QUERY_CITIES, {
    onError(err) {
      enqueueSnackbar(`Error fetching cities: ${err.message}`, {
        variant: "error",
      });
    },
  });

  const {
    loading: loadingProvinces,
    error: errorProvinces,
    data: provincesData,
  } = useQuery(QUERY_PROVINCES, {
    onError(err) {
      enqueueSnackbar(`Error fetching provinces: ${err.message}`, {
        variant: "error",
      });
    },
  });

  const [updateCinema] = useMutation(MUTATION_CINEMA_UPDATE, {
    onCompleted({ updateCinema }) {
      if (updateCinema.code === -1) {
        let message = updateCinema.message;
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

  if (loadingCinema || loadingCities || loadingProvinces) return "Loading...";
  if (errorCinema) return `Error! ${errorCinema.message}`;
  if (errorCities) return `Error! ${errorCities.message}`;
  if (errorProvinces) return `Error! ${errorProvinces.message}`;

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cinemaData = {
      cinema_id: parseInt(id, 10),
      cinema_name: formData.get("cinema_name"),
      cinema_address: formData.get("cinema_address"),
      telephone_number: formData.get("telephone_number"),
      cinema_city_id: parseInt(formData.get("city_id"), 10),
      cinema_province_id: parseInt(formData.get("province_id"), 10),
    };

    // Log the cinemaData object to check the data being sent
    console.log("Updating cinema with data: ", cinemaData);

    updateCinema({ variables: cinemaData });
  }

  const cities = citiesData ? citiesData.cities : [];
  const provinces = provincesData ? provincesData.provinces : [];
  const cinema = cinemaData ? cinemaData.cinema : {};

  return (
    <form onSubmit={onSubmit}>
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
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="detail_cinema_address"
            fullWidth
            label="Address"
            name="cinema_address"
            defaultValue={cinema.cinema_address || ""}
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
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-city-label">City</InputLabel>
            <Select
              labelId="select-city-label"
              id="detail_city_id"
              name="city_id"
              defaultValue={cinema.city ? cinema.city.city_id : ""}
              label="City"
            >
              {cities.map((city) => (
                <MenuItem key={city.city_id} value={city.city_id}>
                  {city.city_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-province-label">Province</InputLabel>
            <Select
              labelId="select-province-label"
              id="detail_province_id"
              name="province_id"
              defaultValue={cinema.province ? cinema.province.province_id : ""}
              label="Province"
            >
              {provinces.map((province) => (
                <MenuItem
                  key={province.province_id}
                  value={province.province_id}
                >
                  {province.province_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
          <Button
            id="create-form-submit"
            variant="outlined"
            startIcon={<DoneIcon />}
            type="submit"
          >
            Submit
          </Button>
          <Button
            id="create-form-close"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={handleClose}
            sx={{ ml: 3 }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
