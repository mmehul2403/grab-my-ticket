import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
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
import {
  MUTATION_CINEMA_CREATE,
  QUERY_CITIES,
  QUERY_PROVINCES,
} from "../../../queries/CinemaGraphql";
import { enqueueSnackbar } from "notistack";

export default function CinemaCreate({ handleClose, refetch }) {
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

  const [createCinema] = useMutation(MUTATION_CINEMA_CREATE, {
    onCompleted({ createCinema }) {
      if (createCinema) {
        if (createCinema.code === -1) {
          let message = createCinema.message;
          if (message) {
            enqueueSnackbar(message, { variant: "warning" });
          }
        } else {
          enqueueSnackbar("Created Successfully", {
            variant: "success",
            autoHideDuration: 500,
            onClose: () => {
              handleClose();
              refetch();
            },
          });
        }
      }
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const [cinemaName, setCinemaName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [telephoneNumber, setTelephoneNumber] = React.useState("");
  const [cityId, setCityId] = React.useState(""); // Use empty string to match Select value type
  const [provinceId, setProvinceId] = React.useState(""); // Use empty string to match Select value type

  const [cinemaNameErrorMessage, setCinemaNameErrorMessage] =
    React.useState("");
  const [addressErrorMessage, setAddressErrorMessage] = React.useState("");
  const [telephoneNumberErrorMessage, setTelephoneNumberErrorMessage] =
    React.useState("");

  function onSubmit(event) {
    event.preventDefault();
    let valid = true;

    if (!cinemaName) {
      setCinemaNameErrorMessage("Cinema name is required.");
      valid = false;
    } else {
      setCinemaNameErrorMessage("");
    }

    if (!address) {
      setAddressErrorMessage("Address is required.");
      valid = false;
    } else {
      setAddressErrorMessage("");
    }

    if (!telephoneNumber) {
      setTelephoneNumberErrorMessage("Telephone number is required.");
      valid = false;
    } else {
      setTelephoneNumberErrorMessage("");
    }

    if (valid) {
      // ADD cinema
      createCinema({
        variables: {
          cinema_name: cinemaName,
          cinema_address: address,
          cinema_city_id: parseInt(cityId, 10),
          cinema_province_id: parseInt(provinceId, 10),
          telephone_number: telephoneNumber,
        },
      });
    }
  }

  if (loadingCities || loadingProvinces) return "Loading...";
  if (errorCities) return `Error fetching cities: ${errorCities.message}`;
  if (errorProvinces)
    return `Error fetching provinces: ${errorProvinces.message}`;

  const cities = citiesData ? citiesData.cities : [];
  const provinces = provincesData ? provincesData.provinces : [];

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
            id="cinemaName"
            label="Cinema Name"
            variant="outlined"
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
            fullWidth
            value={telephoneNumber}
            error={!!telephoneNumberErrorMessage}
            helperText={telephoneNumberErrorMessage}
            onChange={(e) => setTelephoneNumber(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-city-label">City</InputLabel>
            <Select
              labelId="select-city-label"
              id="city_id"
              name="city_id"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
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
              id="province_id"
              name="province_id"
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
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
            id="create-form-cancel"
            variant="outlined"
            startIcon={<DoneIcon />}
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
