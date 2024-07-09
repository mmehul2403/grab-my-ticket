import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
const defaultTheme = createTheme();

export default function UserProfile() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>Login Succesfully.This page is still under construction.</div>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
