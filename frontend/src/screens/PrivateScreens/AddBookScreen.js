import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Snackbar } from '@mui/material';

import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../actions/bookActions';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../reducers/bookReducer';

//Screen for adding books, private to only authorized users
export default function AddBookScreen(props) {
  const { error, added } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const navigate = useNavigate();
  //Dispatch addbook action with given form data on submit
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBook({ id, title, authors }));
  };
  //Reset added state after successfull addition
  const handleALertClose = () => {
    dispatch(reset());
  };
  return (
    <>
      <Snackbar
        open={!(added === null)}
        onClose={handleALertClose}
        autoHideDuration={3000}
        message={added}
      />
      <Snackbar
        open={!(error === null)}
        onClose={handleALertClose}
        autoHideDuration={3000}
        message={error}
      />
      <Button
        onClick={() => navigate('/management')}
        color="secondary"
        sx={{ marginTop: '1rem', marginLeft: '1rem' }}
      >
        Back to managament
      </Button>
      <div className="container-stack">
        <form className="form" onSubmit={submitHandler}>
          <Stack spacing={3}>
            <TextField
              onChange={(e) => setId(e.target.value)}
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
              label="Book ID"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{
                width: '20rem',
                '& .MuiInputBase-root': {
                  borderRadius: '24px',
                },
              }}
              color="secondary"
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setAuthors(e.target.value)}
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '24px',
                },
              }}
              color="secondary"
              fullWidth
              id="author"
              label="Authors"
              variant="outlined"
            />
          </Stack>
          <Button type="submit" color="success">
            Add
          </Button>
        </form>
      </div>
    </>
  );
}
