import * as React from "react";
import { useMutation } from "@apollo/client";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ConfirmationDialogRaw from "../../common/ConfirmationDialogRaw.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { MUTATION_SHOWTIME_DELETE } from "../../../queries/ShowTimeGraphql.js";

export default function ShowTimeDelete({ id, refetch }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const [deleteShowTime] = useMutation(MUTATION_SHOWTIME_DELETE, {
    onCompleted(data) {
      if (data.deleteShowTime) {
        if (data.deleteShowTime) {
          enqueueSnackbar("ShowTime deleted successfully.", {
            variant: "success",
            autoHideDuration: 500,
            onClose: () => {
              // on close callback: reload data
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

  const handleDelete = (event) => {
    setConfirmOpen(true);
    setDeleteId(event.currentTarget.id);
  };

  const handleConfirmClose = (confirmed) => {
    setConfirmOpen(false);

    if (confirmed && deleteId) {
      deleteShowTime({ variables: { showTimeId: parseInt(deleteId, 10) } });
    }
    setDeleteId(null);
  };

  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="delete the showTime" onClick={handleDelete} key={`btn-button-delete-${id}`} id={id}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialogRaw id="confirmation-dialog" keepMounted open={confirmOpen} onClose={handleConfirmClose} content="Are you sure you want to delete this showTime?" />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} />
    </React.Fragment>
  );
}
