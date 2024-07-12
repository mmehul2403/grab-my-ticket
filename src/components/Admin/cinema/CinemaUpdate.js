import * as React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { Box } from "@mui/material";
// import Constant from "../../common/Constants.json";
// import { Button, Grid, TextField, MenuItem } from "@mui/material";
// import DoneIcon from "@mui/icons-material/Done";
// import CloseIcon from "@mui/icons-material/Close";
// import CinemaQuery from "../../../queries/CinemaGraphql.js";
// import { enqueueSnackbar } from "notistack";

export default function CinemaUpdate({ id, refetch, handleClose }) {
  //   const [updateCinema] = useMutation(CinemaQuery.MUTATION_CINEMA_UPDATE, {
  //     onCompleted({ updateCinema }) {
  //       if (updateCinema.code == -1) {
  //         let message = updateCinema.message;
  //         if (message) {
  //           enqueueSnackbar(message, { variant: "warning" });
  //         }
  //       } else {
  //         // reload data and close the dialog
  //         enqueueSnackbar("Updated Successfully", {
  //           variant: "success",
  //           onClose: () => {
  //             // on close callback:reload data and close the dialog
  //             refetch();
  //           },
  //         });
  //       }
  //     },
  //   });
  //   const { loading, error, data } = useQuery(CinemaQuery.QUERY_CINEMA_BY_ID, {
  //     variables: {
  //       cinema_id: id,
  //     },
  //   });

  //   if (loading) return "Loading...";
  //   if (error) return `Error! ${error.message}`;

  //   function onsubmit(event) {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const newCinema = Object.fromEntries(formData.entries());
  //     // update_cinema
  //     updateCinema({ variables: { id: id, cinema: newCinema } });
  //   }

  //   return (
  //     <form onSubmit={onsubmit}>
  //       <Box
  //         sx={{
  //           display: "grid",
  //           gap: 1,
  //           gridTemplateColumns: "repeat(2, 1fr)",
  //           marginTop: "20px",
  //         }}>
  //         <TextField
  //           id="detail_firstName"
  //           label="FirstName"
  //           disabled
  //           defaultValue={data.getEmployeeById.firstName}
  //           InputProps={{
  //             readOnly: true,
  //           }}
  //           margin="normal"
  //         />
  //         <TextField
  //           id="detail_lastName"
  //           label="lastName"
  //           disabled
  //           defaultValue={data.getEmployeeById.lastName}
  //           InputProps={{
  //             readOnly: true,
  //           }}
  //           margin="normal"
  //         />
  //         <TextField
  //           id="detail_age"
  //           label="Age"
  //           disabled
  //           defaultValue={data.getEmployeeById.age}
  //           InputProps={{
  //             readOnly: true,
  //           }}
  //           margin="normal"
  //         />
  //         <TextField
  //           id="detail_dateOfJoining"
  //           label="DateOfJoining"
  //           disabled
  //           defaultValue={data.getEmployeeById.dateOfJoining}
  //           InputProps={{
  //             readOnly: true,
  //           }}
  //           margin="normal"
  //         />

  //         <TextField fullWidth id="title" name="title" select label="title" defaultValue={data.getEmployeeById.title} margin="normal">
  //           {Constant.titleDic.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>
  //         <TextField fullWidth id="department" name="department" select label="Department" defaultValue={data.getEmployeeById.department} margin="normal">
  //           {Constant.departmentDic.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>

  //         <TextField
  //           id="detail_employeeType"
  //           label="EmployeeType"
  //           disabled
  //           defaultValue={data.getEmployeeById.employeeType}
  //           InputProps={{
  //             readOnly: true,
  //           }}
  //           margin="normal"
  //         />
  //         <TextField fullWidth id="currentStatus" name="currentStatus" select label="Current Status" defaultValue={data.getEmployeeById.currentStatus} margin="normal">
  //           {Constant.currentStatus.map((option) => (
  //             <MenuItem key={option.value} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </TextField>

  //         <Grid item xs={12} sx={{ mt: 3, mx: "auto" }} textAlign="center">
  //           <Button id="create-form-submit" variant="outlined" startIcon={<DoneIcon />} type="submit">
  //             Submit
  //           </Button>
  //           <Button id="create-form-close" variant="outlined" startIcon={<CloseIcon />} onClick={handleClose} sx={{ ml: 3 }}>
  //             Close
  //           </Button>
  //         </Grid>
  //       </Box>
  //     </form>
  //   );
  return <div></div>;
}
