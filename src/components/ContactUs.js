import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const ContactUs = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2em" }}>
      <Paper elevation={3} style={{ padding: "2em" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1em" }}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactUs;
