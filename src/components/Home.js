import React from "react";
import Slider from "react-slick";
import "../styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

//Slider Setting
const LandingPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  //Put movies image
  // src/components/LandingPage.js
  const movieImages = [
    "/images/HomePage/badboys_RideOrDie.jpg",
    "/images/HomePage/DeadpoolAndWolverine.jpg",
    "/images/HomePage/FallGuy.jpg",
    "/images/HomePage/InsideOut2.jpg",
  ];

  const recommendedMovies = [
    {
      title: "Kalki 2898 AD",
      image:
        "https://th.bing.com/th/id/OIP.cl7a4ZluhrZhbNP7rJL2LQHaJQ?rs=1&pid=ImgDetMain",
      description: "Action/Sci-Fi/Thriller",
      likes: "1.2M Likes",
    },
    {
      title: "Jhamkudi",
      image:
        "https://th.bing.com/th/id/R.0565daba12e1bd0c16fa6413fe489fab?rik=7ujsPYKxHAT9VA&riu=http%3a%2f%2fwww.impawards.com%2fintl%2findia%2f2024%2fposters%2fjhamkudi_xlg.jpg&ehk=W%2b3CIrOFpsK8kzzw9tBtX4cmAnOii16xZ%2fsaFWsFq2Y%3d&risl=&pid=ImgRaw&r=0",
      description: "Comedy/Horror/Mystery",
      votes: "9.6K Votes",
      rating: "8.6/10",
    },
    {
      title: "Munjya",
      image:
        "https://th.bing.com/th/id/OIP.m0250QHZPhqvtNpU6Qb7MAHaKX?rs=1&pid=ImgDetMain",
      description: "Comedy/Horror",
      votes: "72.9K Votes",
      rating: "8.2/10",
    },
    {
      title: "Chandu Champion",
      image:
        "https://juksun.com/wp-content/uploads/2023/07/Chandu-Champion-Movie-Poster-1.jpg",
      description: "Biography/Drama/Sports",
      votes: "46.7K Votes",
      rating: "9.2/10",
    },
    {
      title: "A Quiet Place: Day One",
      image:
        "https://th.bing.com/th/id/OIP.g4yO-Th5-2YaZKThp4nJiQAAAA?rs=1&pid=ImgDetMain",
      description: "Horror/Thriller",
      votes: "65.3K Votes",
      rating: "8.1/10",
    },
    {
      title: "Kung Fu Panda 4",
      image:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/06/kung-fu-panda-4-film-poster.jpg",
      description: "Animation/Adventure/Comedy",
      votes: "50.1K Votes",
      rating: "6.3/10",
    },
    {
      title: "Dune: Part Two",
      image:
        "https://www.mordeo.org/files/uploads/2023/06/Dune-Part-Two-Movie-Poster-4K-Ultra-HD-Mobile-Wallpaper.jpg",
      description: "Action/Adventure/Drama",
      votes: "92.8K Votes",
      rating: "8.6/10",
    },
    {
      title: "Furiosa: A Mad Max Saga",
      image:
        "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2023/12/furiosa-a-mad-max-saga-poster-featuring-anya-taylor-joy-as-the-title-character.jpg",
      description: "Action/Adventure",
      votes: "72.9K Votes",
      rating: "8.2/10",
    },
  ];

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
              <img
                src={image}
                alt={`Movie ${index + 1}`}
                className="movie-banner-image"
              />
            </div>
          ))}
        </Slider>
      </section>
      <section className="content-section">
        {/* <h2>Book Your Tickets Now</h2> */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Book Your Tickets Now
            </Typography>

            <Typography variant="body1" gutterBottom>
              GrabMyTicket provides a seamless experience for booking tickets
              for movies, events, concerts, and more. Enjoy the best
              entertainment options available at your fingertips.
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
          {recommendedMovies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="movie-card">
                <div className="movie-image-wrapper">
                  <CardMedia
                    className="movie-image"
                    image={movie.image}
                    title={movie.title}
                  />
                </div>
                <CardContent className="movie-content">
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                  {movie.likes && (
                    <Typography variant="body2" color="text.secondary">
                      {movie.likes}
                    </Typography>
                  )}
                  {movie.votes && (
                    <Typography variant="body2" color="text.secondary">
                      {movie.votes}
                    </Typography>
                  )}
                  {movie.rating && (
                    <Typography variant="body2" color="text.secondary">
                      {movie.rating}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
