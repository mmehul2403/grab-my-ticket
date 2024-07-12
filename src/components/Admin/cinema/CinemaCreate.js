import * as React from "react";
// import { Button, Grid, TextField, MenuItem } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import DoneIcon from "@mui/icons-material/Done";
// import { gql, useMutation } from "@apollo/client";
// import dayjs from "dayjs";
// import CinemaQuery from "../../../queries/CinemaGraphql.js";

export default function CinemaCreate({ handleClose, refetch }) {
  /*const [createCinema] = useMutation(CinemaQuery.MUTATION_CINEMA_CREATE, {
    onCompleted({ createCinema }) {
      if (createCinema.code == -1) {
        let message = createCinema.message;
        if (message) {
          const fields = message.split(";");
          fields.forEach((field) => {
            const currentField = field.split(",");
            const fieldName = currentField[0];
            const fieldNameErrorMsg = currentField[1];

            switch (fieldName) {
              case "firstName":
                setFirstNameErrorMessage(fieldNameErrorMsg);
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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState(0);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  function onsubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const employee = Object.fromEntries(formData.entries());
    let valid = true;

    if (valid) {
      // ADD_cinema
      createCinema({ variables: { cinema: employee } });
    } else {
      return false;
    }
  }

  return (
    <form onSubmit={onsubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }} sx={{ mt: 2, pl: 2, pr: 2 }} direction="row">
        <Grid item xs={6}>
          <TextField
            id="firstName"
            label="FirstName"
            variant="outlined"
            name="firstName"
            fullWidth
            value={firstName}
            error={!!firstNameErrorMessage}
            helperText={firstNameErrorMessage}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="lastName"
            label="LastName"
            variant="outlined"
            name="lastName"
            fullWidth
            value={lastName}
            error={!!lastNameErrorMessage}
            helperText={lastNameErrorMessage}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="dateOfBirth"
              label="dateOfBirth"
              variant="outlined"
              name="dateOfBirth"
              fullWidth
              value={dateofBirth}
              error={!!dateOfBirthErrorMessage}
              helperText={dateOfBirthErrorMessage}
              sx={{ mt: 2 }}
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  helperText: dateOfBirthErrorMessage,
                },
              }}
              onChange={(newValue) => {
                setAge(parseInt(dayjs().diff(newValue, "year")));
              }}
              defaultValue={dayjs().format("{YYYY-MM-DD}")}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            name="age"
            fullWidth
            value={age}
            error={!!ageErrorMessage}
            helperText={ageErrorMessage}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            type="number"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="dateOfJoining"
              label="DateOfJoining"
              variant="outlined"
              name="dateOfJoining"
              fullWidth
              value={dateOfJoining}
              error={!!dateOfJoiningErrorMessage}
              helperText={dateOfJoiningErrorMessage}
              sx={{ mt: 2 }}
              format="YYYY-MM-DD"
              slotProps={{
                textField: {
                  helperText: dateOfJoiningErrorMessage,
                },
              }}
              defaultValue={dayjs().format("{YYYY-MM-DD}")}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="title" name="title" select label="title" defaultValue="Employee" margin="normal">
            {Constant.titleDic.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="department" name="department" select label="Department" defaultValue="IT" margin="normal">
            {Constant.departmentDic.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="employeeType" name="employeeType" select label="EmployeeType" defaultValue="FullTime" margin="normal">
            {Constant.employeeTypeDic.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
  );*/
  return <div></div>;
}
