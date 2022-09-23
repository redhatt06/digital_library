import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../actions/userAction';
import { reset } from '../../reducers/userReducer.js';
//Login Screen with a simple login form
export default function LoginScreen(props) {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //if login is successfull navigate to management page
  useEffect(() => {
    if (userInfo) {
      navigate('/management');
    }
    return () => {
      //
    };
  }, [navigate, userInfo]);

  //Login the user if the login is successfull
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  };
  const handleALertClose = () => {
    dispatch(reset());
  };
  return (
    <>
      <Snackbar
        open={error}
        onClose={handleALertClose}
        autoHideDuration={3000}
        message={error}
      />
      <div className="container-stack">
        <form className="form" onSubmit={submitHandler}>
          <Stack spacing={3}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                width: '20rem',
                '& .MuiInputBase-root': {
                  borderRadius: '24px',
                },
              }}
              color="secondary"
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '24px',
                },
              }}
              color="secondary"
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
            />
          </Stack>
          <Button type="submit" color="success">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
