import * as React from "react";

import { Button, Grid } from "@mui/material";
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
import { Outlet, Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

import { useSearchParams, createSearchParams } from "react-router-dom";
import CinemaDelete from "./CinemaDelete.js";
import CinemaUpdate from "./CinemaUpdate.js";
import CinemaCreate from "./CinemaCreate.js";
import IconButton from "@mui/material/IconButton";

const tableColumns = [
  { field: "cinema_name", headerName: "Name", width: 150 },
  { field: "cinema_address", headerName: "Address", width: 150 },
  { field: "telephone_number", headerName: "Telephone Number", width: 150 },
];
export default function CinemaTable({ rows, refetch }) {
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [searchParams, setSearchParams] = useSearchParams();
  let cinema_name = searchParams.get("cinema_name");

  let params = {};
  if (cinema_name) {
    params.cinema_name = cinema_name;
  }

  // let paramstr = `?${createSearchParams(params)}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <React.Fragment>
      <form name="searchForm">
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
                  {rows.map((row) => (
                    <TableRow key={row.cinema_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      {tableColumns.map((column) => {
                        return <TableCell key={row.cinema_id + "_" + column.field}>{row[column.field]}</TableCell>;
                      })}
                      <TableCell>
                        <IconButton color="primary" aria-label="view the employee" component={Link} to={`detail/${row.cinema_id}`}>
                          <ManageSearchIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="edit the employee" onClick={handleUpdateClickOpen} key={`btn-button-update-${row.cinema_id}`} id={row.cinema_id}>
                          <EditIcon />
                        </IconButton>
                        {/* <CinemaDelete id={row.cinema_id} refetch={refetch}></CinemaDelete> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination component="div" count={rows.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Grid>
          <Grid item xs={2}>
            <Outlet></Outlet>
          </Grid>
        </Grid>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add a Cinema</DialogTitle>
        <DialogContent>
          <CinemaCreate handleClose={handleClose} refetch={refetch} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!updateId} onClose={handleUpdateClose}>
        <DialogTitle textAlign="center">Update a Cinema</DialogTitle>
        <DialogContent>{/* <CinemaUpdate handleClose={handleUpdateClose} refetch={refetch} id={updateId} /> */}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
