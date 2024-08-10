import * as React from "react";
import { useState } from "react";
import { json, useParams, useSearchParams } from "react-router-dom";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import { SnackbarProvider } from "notistack";
import { QUERY_SHOWTIMES } from "../../../queries/ShowTimeGraphql.js"; // Correct import
import ShowTimeDetail from "./ShowTimeDetail.js";
import moment from "moment/moment.js";
import ShowTimeDelete from "./ShowTimeDelete.js";
import ShowTimeCreate from "./ShowTimeCreate.js";
import ShowTimeUpdate from "./ShowTimeUpdate.js";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { QUERY_MOVIES_SELECT } from "../../../queries/MoviesQuery.js";
const tableColumns = [
  // { field: "show_date", headerName: "Show Date", width: 150 },
  { field: "show_start_time", headerName: "Start Time", width: 150 },
  { field: "show_end_time", headerName: "End Time ", width: 150 },
  { field: "seat_count", headerName: "Seat Count", width: 150 },
  { field: "available_seat_count", headerName: "Available Seat Count", width: 150 },
  { field: "ticket_price", headerName: "Ticket Price", width: 150 },
];

export default function ShowTimeTable() {
  let { cinema_id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [showTimeCreateOpen, setShowTimeCreateOpen] = useState(false);
  const [showTimeDetailOpen, setShowTimeDetailOpen] = useState(false);
  const [showTimeUpdateId, setShowTimeUpdateId] = useState();
  const [showTimeDetailId, setShowTimeDetailId] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // let movie_id = searchParams.get("movie_id");

  const [showDateVal, setShowDateVal] = React.useState(null);
  const [selectedMovieValues, setSelectedMovieValues] = React.useState(null);
  const { loading: showTimeLoading, error: showTimeError, data: movieOptionsData } = useQuery(QUERY_MOVIES_SELECT);

  let params = {
    cinemaId: parseInt(cinema_id),
    page: page,
    size: rowsPerPage,
    movieId: selectedMovieValues?.value,

    showDate: showDateVal,
  };
  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY_SHOWTIMES, {
    variables: params,
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  // if (cinema_name) {
  //params.cinema_name = cinema_name;
  // }
  let movieOps = Array.isArray(movieOptionsData?.moviesOptions) ? movieOptionsData.moviesOptions : [];

  let options = movieOps.map((element) => ({
    label: element.movie_name,
    value: parseInt(element.movie_id),
  }));
  const handleShowTimeClickOpen = () => {
    setShowTimeCreateOpen(true);
  };

  const handleShowTimeClose = () => {
    setShowTimeCreateOpen(false);
  };

  const handleShowTimeDetailClose = (event) => {
    setShowTimeDetailOpen(false);
    setShowTimeDetailId(null);
    event.preventDefault();
  };

  const handleShowTimeDetailOpen = (event) => {
    setShowTimeDetailOpen(true);
    setShowTimeDetailId(event.currentTarget.id);
  };

  const handleShowTimeChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShowTimeChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowTimeUpdateClickOpen = (event) => {
    setShowTimeUpdateId(event.currentTarget.id);
  };

  const handleShowTimeUpdateClose = () => {
    setShowTimeUpdateId(null);
  };

  const onSearchFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = Object.fromEntries(formData.entries());
    setSearchParams(params);
  };

  return (
    <div>
      <SnackbarProvider>
        <form onSubmit={onSearchFormSubmit}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pl: 2, pr: 2 }}>
            <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Show Date"
                  value={showDateVal}
                  onChange={(newValue) => {
                    setShowDateVal(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="YYYY-MM-DD"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" name="movie_id" />}
                onChange={(event, newValue) => {
                  setSelectedMovieValues(newValue);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
              <Button variant="outlined" startIcon={<SearchIcon />} type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pl: 2, pr: 2 }}>
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleShowTimeClickOpen}>
              Add
            </Button>
          </Grid>
          <Grid item xs={10}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell key="show_date">Show Date</TableCell>
                    {tableColumns.map((column) => (
                      <TableCell key={column.field}>{column.headerName}</TableCell>
                    ))}
                    <TableCell key="Movie_Name">Movie Name</TableCell>
                    <TableCell key="operations">Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.getShowTimeByCinemaId.map((row) => (
                    <TableRow key={row.show_time_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell key={row.show_time_id + "_show_date"}>{moment(parseInt(row.show_date)).format("YYYY-MM-DD")}</TableCell>
                      {tableColumns.map((column) => {
                        return <TableCell key={row.show_time_id + "_" + column.field}>{row[column.field]}</TableCell>;
                      })}
                      <TableCell key={row.show_time_id + "_movie_name"}>{row.movie.movie_name}</TableCell>
                      <TableCell>
                        <IconButton color="primary" aria-label="view" onClick={handleShowTimeDetailOpen} id={row.show_time_id} key={`btn-button-stdetail-${row.show_time_id}`}>
                          <ManageSearchIcon />
                        </IconButton>

                        <IconButton color="primary" aria-label="edit" onClick={handleShowTimeUpdateClickOpen} key={`btn-button-stedit-${row.show_time_id}`} id={row.show_time_id}>
                          <EditIcon />
                        </IconButton>
                        <ShowTimeDelete id={row.show_time_id} refetch={refetch} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.getShowTimeByCinemaId.length}
              page={page}
              onPageChange={handleShowTimeChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleShowTimeChangeRowsPerPage}
            />
          </Grid>
        </Grid>
        <Dialog open={showTimeDetailOpen} onClose={handleShowTimeDetailClose}>
          <DialogTitle textAlign="center">ShowTime Detail</DialogTitle>
          <DialogContent>
            <ShowTimeDetail handleClose={handleShowTimeDetailClose} id={showTimeDetailId} />
          </DialogContent>
        </Dialog>
        <Dialog open={showTimeCreateOpen} onClose={handleShowTimeClose}>
          <DialogTitle textAlign="center">Add a ShowTime</DialogTitle>
          <DialogContent>
            <ShowTimeCreate handleClose={handleShowTimeClose} refetch={refetch} cinema_id={cinema_id} />
          </DialogContent>
        </Dialog>
        <Dialog open={!!showTimeUpdateId} onClose={handleShowTimeUpdateClose}>
          <DialogTitle textAlign="center">Update a ShowTime</DialogTitle>
          <DialogContent>
            <ShowTimeUpdate handleClose={handleShowTimeUpdateClose} refetch={refetch} id={showTimeUpdateId} />{" "}
          </DialogContent>
        </Dialog>
      </SnackbarProvider>
    </div>
  );
}
