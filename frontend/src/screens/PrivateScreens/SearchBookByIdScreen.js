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
import { reset } from '../../reducers/bookReducer.js';
import { getBookById } from '../../actions/bookActions.js';
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
export default function SearchBookByIdScreen(props) {
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state) => state.book);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  //Dispatch the results of search
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getBookById(id));
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
              label="Book ID"
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
                      {response?.book?.title}
                    </Typography>
                    {response?.authors?.map((author) => {
                      return (
                        <Typography variant="body2" color="text.secondary">
                          {author?.name}
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
