import React from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import "../styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Container, Typography, Grid, Card, CardContent, CardMedia, Box } from "@mui/material";
import { QUERY_MOVIE_TOP8 } from "../queries/MoviesQuery.js";
import { useNavigate } from "react-router-dom";

//Slider Setting
const LandingPage = () => {
  const navigate = useNavigate();
  const { loading, error, data, networkStatus } = useQuery(QUERY_MOVIE_TOP8);
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const navigateToCinemasPage = (event) => {
    navigate({
      pathname: "/Cinemas/" + event.currentTarget.id,
    });
  };

  //Put movies image
  // src/components/LandingPage.js
  const movieImages = ["/images/HomePage/badboys_RideOrDie.jpg", "/images/HomePage/DeadpoolAndWolverine.jpg", "/images/HomePage/FallGuy.jpg", "/images/HomePage/InsideOut2.jpg"];

  return (
    <div className="landing-page-container">
      <header className="header">
        {/* <h1>Welcome to GrabMyTicket</h1> */}
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to GrabMyTicket
        </Typography>
      </header>
      <section className="slider-section">
        <Slider {...sliderSettings}>
          {movieImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Movie ${index + 1}`} className="movie-banner-image" />
            </div>
          ))}
        </Slider>
      </section>
      <section className="content-section">
        {/* <h2>Book Your Tickets Now</h2> */}
        <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Book Your Tickets Now
            </Typography>

            <Typography variant="body1" gutterBottom>
              GrabMyTicket provides a seamless experience for booking tickets for movies, events, concerts, and more. Enjoy the best entertainment options available at your fingertips.
            </Typography>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </Grid>
        </Grid>
      </section>
      <Container className="recommended-movies">
        <Typography variant="h4" gutterBottom>
          Recommended Movies
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {data.getTop8Movies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia component="img" height="350" image={`http://localhost:4000/${movie.image_url}`} alt={movie.movie_name} />

                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.movie_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  {movie.likes && (
                    <Typography variant="body2" color="text.secondary">
                      Likes: {movie.likes}
                    </Typography>
                  )}
                  {movie.review_score && (
                    <Typography variant="body2" color="text.secondary">
                      Review Score: {movie.review_score}
                    </Typography>
                  )}
                </CardContent>
                <Box p={2} display="flex" justifyContent="center">
                  <Button variant="contained" color="primary" onClick={navigateToCinemasPage} id={movie.movie_id}>
                    Buy
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <section className="popular-categories" style={{ marginTop: "40px" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Popular Categories
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="350"
                  image="https://m.media-amazon.com/images/M/MV5BYTYyODhlODktYjUzNC00NjUyLWI1MzYtNmI0MTY3YTUxYjY2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg"
                  alt="Action"
                />

                <CardContent>
                  <Typography variant="h6" component="div">
                    Action
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    High-octane thrillers and adrenaline-pumping movies.
                  </Typography>
                </CardContent>
                <Box p={2} display="flex" justifyContent="center">
                  <Button variant="contained" color="secondary" onClick={() => navigate("/categories/action")}>
                    Explore
                  </Button>
                </Box>
              </Card>
            </Grid>
            {/* Add more categories as needed */}
          </Grid>
        </Container>
      </section>
      <footer className="footer" style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f5f5f5" }}>
        <Container>
          <Typography variant="body1" align="center">
            © 2024 GrabMyTicket. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
