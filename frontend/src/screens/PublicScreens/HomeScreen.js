import React, { useEffect, useState } from 'react';

import '../../App.css';
import {
  TextField,
  IconButton,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchData } from '../../actions/searchActions';
import { reset } from '../../reducers/searchReducer.js';
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#F06A19',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

//Home Screen with a massive search bar for searching books by title or authors by name and displaying the result.
export default function HomeScreen(props) {
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, searchData } = useSelector((state) => state.search);
  //Dispatch the results of search
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchData(search));
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <div className="main">
      <div className="container-flex">
        <h1 id="homepage-h1">Search for millions of books and authors</h1>
        <ThemeProvider theme={theme}>
          <Paper
            component="form"
            onSubmit={submitHandler}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <TextField
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '24px',
                },
              }}
              color="secondary"
              fullWidth
              id="search-bar"
              label="Books, authors"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
            >
              {/* <button style={{ color: 'red' }}>Hey</button> */}
            </TextField>
            <IconButton type="submit" sx={{ marginLeft: '-3rem' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </ThemeProvider>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {loading ? (
          <p>loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          searchData &&
          searchData?.map((data) => {
            return (
              <Grid item>
                <Card sx={{ minWidth: 300, maxWidth: 345, margin: '2rem' }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data?.type === 'b' ? data?.title : data?.name}
                      </Typography>
                      {data?.type === 'b'
                        ? data?.authors?.map((author) => {
                            return (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {author}
                              </Typography>
                            );
                          })
                        : data?.books?.map((book) => {
                            return (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {book}
                              </Typography>
                            );
                          })}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
