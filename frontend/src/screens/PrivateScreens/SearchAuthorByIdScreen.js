import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  createTheme,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { reset } from '../../reducers/authorReducer.js';
import { getAuthorById } from '../../actions/authorActions.js';
import { useNavigate } from 'react-router-dom';
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
export default function SearchAuthorByIdScreen(props) {
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state) => state.author);
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  //Dispatch the results of search
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAuthorById(id));
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <Button
        onClick={() => navigate('/management')}
        color="secondary"
        sx={{ marginTop: '1rem', marginLeft: '1rem' }}
      >
        Back to managament
      </Button>
      <div className="container-flex">
        <ThemeProvider theme={theme}>
          <Paper
            component="form"
            onSubmit={submitHandler}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              required
              color="secondary"
              id="search-bar"
              label="Author ID"
              variant="outlined"
              onChange={(e) => setId(e.target.value)}
            >
              {/* <button style={{ color: 'red' }}>Hey</button> */}
            </TextField>
            <IconButton type="submit" sx={{ marginLeft: '-3rem' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </ThemeProvider>
        <div className="searchDisplay">
          {loading ? (
            <p>loading</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            response && (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {response?.author?.name}
                    </Typography>
                    {response?.books?.map((book) => {
                      return (
                        <Typography variant="body2" color="text.secondary">
                          {book?.title}
                        </Typography>
                      );
                    })}
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          )}
        </div>
      </div>
    </>
  );
}
