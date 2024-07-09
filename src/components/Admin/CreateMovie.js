import { CREATE_MOVIE_MUTATION } from "../../queries/CreateMovieQuery";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import Swal from "sweetalert2";

const CreateMovie = () => {
  const [movie_name, setMovieName] = useState("");
  const [duration_seconds, setDurationSeconds] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [review_score, setReviewScore] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formError, setFormError] = useState("");

  const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE_MUTATION);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setFormError("");

    try {
      const { data } = await createMovie({
        variables: {
          movie_name,
          duration_seconds: parseInt(duration_seconds),
          release_date,
          review_score: parseFloat(review_score),
          file,
        },
      });

      if (data.movie_id != null || data.movie_id !== "") {
        Swal.fire({
          icon: "success",
          title: "Movie added successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setMovieName("");
        setDurationSeconds("");
        setReleaseDate("");
        setReviewScore("");
        setFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setFormError(
          error.message ||
            "An unexpected error occurred. Please try again later."
        );

        Swal.fire({
          icon: "error",
          title: "Error adding movie",
          text:
            error.message ||
            "An unexpected error occurred. Please try again later.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      setFormError(
        error.message || "An unexpected error occurred. Please try again later."
      );

      Swal.fire({
        icon: "error",
        title: "Error adding movie",
        text:
          error.message ||
          "An unexpected error occurred. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Movie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="movie_name"
            label="Movie Name"
            name="movie_name"
            autoComplete="movie_name"
            autoFocus
            value={movie_name}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="duration_seconds"
            label="Duration (seconds)"
            name="duration_seconds"
            type="number"
            value={duration_seconds}
            onChange={(e) => setDurationSeconds(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="release_date"
            label="Release Date"
            name="release_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="review_score"
            label="Review Score"
            name="review_score"
            type="number"
            step="0.1"
            value={review_score}
            onChange={(e) => setReviewScore(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Create Movie
          </Button>
          {formError && (
            <Typography color="error" variant="body2">
              Error: {formError}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CreateMovie;
