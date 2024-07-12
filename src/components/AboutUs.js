import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/AboutUs.css"; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <Container className="about-us-container">
      <header className="header">
        <Typography variant="h3" component="h1" gutterBottom>
          About GrabMyTicket
        </Typography>
      </header>

      <section className="intro-section">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="info-card">
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Who We Are
                </Typography>
                <Typography variant="body1" gutterBottom>
                  GrabMyTicket is a premier platform dedicated to providing a
                  seamless and enjoyable booking experience for movies, events,
                  concerts, and more. We are committed to offering our users a
                  hassle-free way to access the entertainment they love.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="info-card">
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" gutterBottom>
                  To revolutionize the ticketing experience by providing
                  innovative solutions that connect people to the events they
                  love, fostering a community of entertainment enthusiasts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="info-card">
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Our mission is to be your ultimate ticketing destination,
                  ensuring you have access to the best events and entertainment
                  options available. We strive to make booking tickets a breeze,
                  so you can focus on enjoying your experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="info-card">
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Our Values
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Integrity, Customer Focus, Innovation, and Community. We
                  believe in maintaining the highest standards of integrity,
                  putting our customers first, driving innovation, and building
                  a strong community.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      <section className="team">
        <Typography variant="h4" component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image="./images/mehul.jpg"
                alt="Mehul"
              />
              <CardContent>
                <Typography variant="h6" component="h3">
                  Mehul
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Co-Founder
                </Typography>
                <Typography variant="body2">
                  Email: mmehul2403@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image="./images/emma.jpg"
                alt="Yingying (Emma)"
              />
              <CardContent>
                <Typography variant="h6" component="h3">
                  Yingying (Emma)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Co-Founder
                </Typography>
                <Typography variant="body2">
                  Email: yingying.emma@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image="./images/ravi.jpg"
                alt="Ravi"
              />
              <CardContent>
                <Typography variant="h6" component="h3">
                  Ravi
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tech Support
                </Typography>
                <Typography variant="body2">Email: ravi@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      <section className="faq">
        <Typography variant="h4" component="h2" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I book a ticket?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Simply browse our website, select the event you’re interested in,
              and follow the booking instructions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Can I cancel my ticket?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can cancel your ticket within 24 hours of booking. Please
              refer to our cancellation policy for more details.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              What payment methods are accepted?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We accept all major credit cards, debit cards, and PayPal for
              ticket purchases.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Are there any discounts available?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we offer various discounts throughout the year. Please check
              our promotions page for current offers.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              How do I contact customer support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can reach our customer support team via email at
              support@grabmyticket.com or by calling our hotline at (123)
              456-7890.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </section>

      <section className="contact" id="contact">
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are here to help! If you have any questions or need support, feel
          free to reach out to us at{" "}
          <a href="mailto:mmehul2403@gmail.com">mmehul2403@gmail.com</a>. We
          look forward to assisting you.
        </Typography>
      </section>
    </Container>
  );
};

export default AboutUs;
