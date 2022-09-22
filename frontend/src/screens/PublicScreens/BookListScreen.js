import React, { useEffect, useState } from 'react';
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
  TextField,
  Grid,
  Box,
  Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooksWithMoreThanThreeAuthors,
  listBooks,
} from '../../actions/bookActions';

//Public screen for displaying the book list and also the books with more than 3 authors
export default function BookListScreen(props) {
  const { loading, error, response } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  //Dispatch list of books when the page loads
  useEffect(() => {
    dispatch(listBooks());
    return () => {
      //
    };
  }, [dispatch]);

  //dispatch all books
  const handleAll = () => {
    dispatch(listBooks());
  };
  //dispatch books with more than 3 authors
  const handleMore = () => {
    dispatch(getBooksWithMoreThanThreeAuthors());
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
                  sx={{ height: '5rem', minWidth: '20rem' }}
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Title</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <p>loading...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      response &&
                      response.map((book) => (
                        <TableRow
                          key={book.book_id + '_row'}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {book.book_id}
                          </TableCell>
                          <TableCell align="right">{book.title}</TableCell>
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
            <Button color="secondary" onClick={handleMore}>
              Books with more than 3 authors{' '}
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
