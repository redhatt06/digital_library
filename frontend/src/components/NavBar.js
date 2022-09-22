import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../reducers/userReducer.js';
import { logout } from '../actions/userAction.js';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//Navbar component is the navigation bar on top of the pages
export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, userToken } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: '#B5A7B6',
          boxShadow: 'none',
          padding: '0.5rem',
          fontWeight: '600',
          color: '#fff',
        }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">
              <img
                alt="logo"
                src="./images/logo-cropped.png"
                style={{
                  display: 'inline-flex',
                  height: '5rem',
                  margin: '0.5rem',
                }}
              />
            </NavLink>
          </Typography>

          <div className="links">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to={'/books'}>Books</NavLink>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to={'/authors'}>Authors</NavLink>
            </Typography>
            {userInfo ? (
              <div className="links">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <NavLink to={'/management'}>Managament</NavLink>
                </Typography>

                <button
                  style={{ background: 'none', border: 'unset', color: '#fff' }}
                  onClick={logoutHandler}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                  >
                    Logout
                  </Typography>
                </button>
              </div>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
