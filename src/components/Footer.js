import React from "react";
import { Container, Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © 2024 Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Link href="/privacy-policy" underline="none">Privacy Policy</Link> | <Link href="/terms-of-service" underline="none">Terms of Service</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
