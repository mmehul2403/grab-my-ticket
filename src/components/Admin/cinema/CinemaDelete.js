import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import ConfirmationDialogRaw from "../../common/ConfirmationDialogRaw.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { MUTATION_CINEMA_DELETE } from "../../../queries/CinemaGraphql.js";

export default function CinemaDelete({ id, refetch }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const handleDelete = (event) => {
    setConfirmOpen(true);
    setDeleteId(event.currentTarget.id);
  };

  const handleConfirmClose = (confirmed) => {
    setConfirmOpen(false);

    if (confirmed) {
      deleteCinema({ variables: { id: deleteId } });
    }
    setDeleteId();
  };

  const [deleteCinema] = useMutation(MUTATION_CINEMA_DELETE, {
    onCompleted({ deleteCinema }) {
      let message = deleteCinema.message;
      if (deleteCinema.code === -1) {
        if (message) {
          enqueueSnackbar(message, { variant: "warning" });
        }
      } else {
        enqueueSnackbar(message, {
          variant: "success",
          onClose: () => {
            // on close callback:reload data and close the dialog
            refetch();
          },
        });
      }
    },
  });
  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="delete the employee" onClick={handleDelete} key={`btn-button-delete-${id}`} id={id}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={confirmOpen} onClose={handleConfirmClose} content="Are you sure to delete this row?" />

      <SnackbarProvider maxSnack="3" autoHideDuration={3000} />
    </React.Fragment>
  );
}
