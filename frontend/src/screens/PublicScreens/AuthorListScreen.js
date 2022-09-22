import React, { useEffect } from 'react';
import '../../App.css';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthorsWithMostBooks,
  listAuthors,
} from '../../actions/authorActions.js';

//Public screen for displaying the author list and also the authors with most books written
export default function AuthorListScreen(props) {
  const { loading, error, response } = useSelector((state) => state.author);
  const dispatch = useDispatch();

  //Dispatch list of authors when the page loads
  useEffect(() => {
    dispatch(listAuthors());
    return () => {
      //
    };
  }, [dispatch]);

  //Dispatch all authors
  const handleAll = () => {
    dispatch(listAuthors());
  };
  //Dispatch authors with most books written
  const handleMost = () => {
    dispatch(getAuthorsWithMostBooks());
  };
  return (
    <>
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
                  sx={{ height: '5rem', minWidth: '30rem' }}
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <p>loading...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      response &&
                      response.map((author) => (
                        <TableRow
                          key={author.author_id + '_row'}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {author.author_id}
                          </TableCell>
                          <TableCell align="right">{author.name}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          sx={{ marginTop: '2rem' }}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} lg={6}>
            <Button color="secondary" onClick={handleMost}>
              Authors with Most Books{' '}
            </Button>
          </Grid>
          <Grid item xs={6} lg={6}>
            <Button color="secondary" onClick={handleAll}>
              All Books
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
