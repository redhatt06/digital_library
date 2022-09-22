import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';

//Private Route component to wrap screens that we want to be private to only authorized users
const PrivateRoute = () => {
  const { loading, userToken } = useSelector((state) => state.user);

  return loading ? (
    <div>loading...</div>
  ) : userToken ? (
    <Outlet />
  ) : (
    <div className="container-flex" style={{ textAlign: 'center' }}>
      <h1 className="black">Unauthorized </h1>
      <span>
        <NavLink className="black underline" to={'/login'}>
          Login
        </NavLink>{' '}
        to gain access.
      </span>
    </div>
  );
};

export default PrivateRoute;
