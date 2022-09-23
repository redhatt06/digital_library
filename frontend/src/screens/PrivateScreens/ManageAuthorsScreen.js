import React, { useEffect, useState } from 'react';
import '../../App.css';
import { resetOps } from '../../reducers/authorReducer';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  Box,
  Snackbar,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAuthor,
  listAuthors,
  updateAuthor,
} from '../../actions/authorActions.js';
import { useNavigate } from 'react-router-dom';

//Screen for managing authors, private to only authorized users
export default function ManageAuthorsScreen(props) {
  const { loading, error, response, deleted, updated } = useSelector(
    (state) => state.author
  );
  const [updating, setUpdating] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Dispatch the list of books when page loads
  useEffect(() => {
    dispatch(listAuthors());
    return () => {
      //
    };
  }, [dispatch, deleted]);
  //Dispatch delete author action with given id
  const handleDelete = (id) => {
    dispatch(deleteAuthor(id));
    dispatch(listAuthors());
  };
  //Dispatch update author action with given form data and dispatch the updated list of authors
  const submitHandler = (e) => {
    e.preventDefault();
    setUpdating(false);
    dispatch(updateAuthor({ id, name }));
    dispatch(listAuthors());
  };
  //When update button is clicked render the update form
  const handleUpdate = (id) => {
    setId(id);
    setUpdating(true);
  };
  //Reset the update state after successfull update
  const handleALertClose = () => {
    dispatch(resetOps());
  };
  return (
    <>
      <Button
        onClick={() => navigate('/management')}
        color="secondary"
        sx={{ marginTop: '1rem', marginLeft: '1rem' }}
      >
        Back to managament
      </Button>
      <Snackbar
        open={!(updated === null)}
        onClose={handleALertClose}
        autoHideDuration={3000}
        message={updated}
      />
      <Snackbar
        open={!(error === null)}
        onClose={handleALertClose}
        autoHideDuration={3000}
        message={error}
      />
      <div className="container-table">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <Paper
              sx={{
                overflowY: 'auto',
                height: '300px',
              }}
              component="div"
            >
              <TableContainer>
                <Table
                  stickyHeader
                  sx={{ height: '5rem' }}
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Operations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <p>loading...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      response &&
                      response?.map((author) => (
                        <TableRow
                          key={author?.author_id + '_row'}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {author?.author_id}
                          </TableCell>
                          <TableCell align="right">{author?.name}</TableCell>
                          <TableCell align="right">
                            <Button
                              color="primary"
                              onClick={() => handleUpdate(author?.author_id)}
                            >
                              Update
                            </Button>
                            <Button
                              color="error"
                              onClick={() => handleDelete(author?.author_id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {updating && (
              <Box sx={{ width: '100%', marginTop: '4rem' }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <div
                      style={{ marginTop: 0, paddingTop: 0 }}
                      className="container-update"
                    >
                      <form className="form" onSubmit={submitHandler}>
                        <Stack spacing={3}>
                          <TextField
                            required
                            sx={{
                              width: '20rem',
                              '& .MuiInputBase-root': {
                                borderRadius: '24px',
                              },
                            }}
                            color="secondary"
                            fullWidth
                            id="id"
                            hiddenLabel
                            variant="outlined"
                            disabled
                            placeholder={id.toString()}
                          />
                          <TextField
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{
                              width: '20rem',
                              '& .MuiInputBase-root': {
                                borderRadius: '24px',
                              },
                            }}
                            color="secondary"
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                          />
                        </Stack>
                        <Button type="submit" color="success">
                          Update
                        </Button>
                      </form>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
