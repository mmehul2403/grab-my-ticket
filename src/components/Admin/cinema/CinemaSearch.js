import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, TextField, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function CinemaSearch() {
  const navigate = useNavigate();

  // let{search} =props;
  let [searchParams, setSearchParams] = useSearchParams();

  const onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = Object.fromEntries(formData.entries());

    /*setSearchParams(params);
    navigate({
      pathname: "",
      search: `?${createSearchParams(params)}`,
    });*/
  };
  return (
    <form onSubmit={onsubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 2, pl: 2, pr: 2 }}>
        <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
          <TextField id="search-form-name" label="Cinema Name" variant="outlined" name="firstName" />
        </Grid>

        <Grid item xs={3} sx={{ mt: 2, minWidth: 200 }}>
          <Button variant="outlined" startIcon={<SearchIcon />} type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
