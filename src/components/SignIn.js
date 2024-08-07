import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./common/Copyright";
import { MUTATION_USER_SIGN_IN } from "../queries/UserGraphql";
import { useMutation } from "@apollo/client";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const defaultTheme = createTheme();

export default function SignInView() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [signIn] = useMutation(MUTATION_USER_SIGN_IN);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const signInResponse = await signIn({
      variables: {
        emailAddress: formData.get("email_address"),
        password: formData.get("password"),
      },
    });
    const code = signInResponse.data?.signIn?.code;
    const message = signInResponse.data?.signIn?.message;

    if (0 === code) {
      enqueueSnackbar("Sign in Succesfully!", {
        variant: "success",
        autoHideDuration: 1000,
        onClose: () => {
          setAuth(true);
          //navigate to movie list
          navigate({
            pathname: "/Movies",
          });
        },
      });
    } else {
      enqueueSnackbar(message || "Failed", {
        variant: "warning",
        autoHideDuration: 1000,
        onClose: () => {},
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email_address" autoComplete="email" autoFocus />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
