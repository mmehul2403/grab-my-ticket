import * as React from "react";
import { useMutation } from "@apollo/client";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ConfirmationDialogRaw from "../../common/ConfirmationDialogRaw.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { MUTATION_CINEMA_DELETE } from "../../../queries/CinemaGraphql.js";

export default function CinemaDelete({ id, refetch }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const [deleteCinema] = useMutation(MUTATION_CINEMA_DELETE, {
    onCompleted(data) {
      if (data.deleteCinema) {
        if (data.deleteCinema) {
          enqueueSnackbar("Cinema deleted successfully.", {
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
      deleteCinema({ variables: { cinema_id: parseInt(deleteId, 10) } });
    }
    setDeleteId(null);
  };

  return (
    <React.Fragment>
      <IconButton
        color="primary"
        aria-label="delete the cinema"
        onClick={handleDelete}
        key={`btn-button-delete-${id}`}
        id={id}
      >
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialogRaw
        id="confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onClose={handleConfirmClose}
        content="Are you sure you want to delete this cinema?"
      />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} />
    </React.Fragment>
  );
}
