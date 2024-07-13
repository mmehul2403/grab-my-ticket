import * as React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
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
import CinemaDelete from "./CinemaDelete.js";
import CinemaUpdate from "./CinemaUpdate.js";
import CinemaCreate from "./CinemaCreate.js";
import CinemaDetail from "./CinemaDetail.js";

import { SnackbarProvider } from "notistack";

import { QUERY_CINEMA_BY } from "../../../queries/CinemaGraphql.js";
const tableColumns = [
  { field: "cinema_name", headerName: "Name", width: 150 },
  { field: "cinema_address", headerName: "Address", width: 150 },
  { field: "telephone_number", headerName: "Telephone Number", width: 150 },
];
export default function CinemaTable() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [detailId, setDetailId] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let cinema_name = searchParams.get("cinema_name");

  let params = {
    cinema_name: cinema_name,
  };

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY_CINEMA_BY, {
    variables: params,

    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (cinema_name) {
    params.cinema_name = cinema_name;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDetailClose = (event) => {
    setDetailOpen(false);
    setDetailId("");
  };

  const handleDetailOpen = (event) => {
    setDetailOpen(true);
    setDetailId(event.currentTarget.id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateClickOpen = (event) => {
    setUpdateId(event.currentTarget.id);
  };
  const handleUpdateClose = () => {
    setUpdateId("");
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
              <TextField id="search-form-name" label="Cinema Name" variant="outlined" name="cinema_name" defaultValue={cinema_name} />
            </Grid>

            <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
              <Button variant="outlined" startIcon={<SearchIcon />} type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* <form name="searchForm"> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pl: 2, pr: 2 }}>
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
              Add
            </Button>
          </Grid>
          <Grid item xs={10}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {tableColumns.map((column) => {
                      return <TableCell key={column.field}>{column.headerName}</TableCell>;
                    })}
                    <TableCell key="operations">Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.queryCinemaBy.map((row) => (
                    <TableRow key={row.cinema_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      {tableColumns.map((column) => {
                        return <TableCell key={row.cinema_id + "_" + column.field}>{row[column.field]}</TableCell>;
                      })}
                      <TableCell>
                        <IconButton color="primary" aria-label="view the cinema" onClick={handleDetailOpen} id={row.cinema_id} key={`btn-button-detail-${row.cinema_id}`}>
                          <ManageSearchIcon />
                        </IconButton>

                        <IconButton color="primary" aria-label="edit the cinema" onClick={handleUpdateClickOpen} key={`btn-button-update-${row.cinema_id}`} id={row.cinema_id}>
                          <EditIcon />
                        </IconButton>
                        <CinemaDelete id={row.cinema_id} refetch={refetch}></CinemaDelete>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination component="div" count={data.queryCinemaBy.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Grid>
        </Grid>
        {/* </form> */}
        <Dialog open={detailOpen} onClose={handleDetailClose}>
          <DialogTitle textAlign="center">Cinema Detail</DialogTitle>
          <DialogContent>
            <CinemaDetail handleClose={handleDetailClose} id={detailId} />
          </DialogContent>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign="center">Add a Cinema</DialogTitle>
          <DialogContent>
            <CinemaCreate handleClose={handleClose} refetch={refetch} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!updateId} onClose={handleUpdateClose}>
          <DialogTitle textAlign="center">Update a Cinema</DialogTitle>
          <DialogContent>
            <CinemaUpdate handleClose={handleUpdateClose} refetch={refetch} id={updateId} />
          </DialogContent>
        </Dialog>
      </SnackbarProvider>
    </div>
  );
}
