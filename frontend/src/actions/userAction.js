import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//User actions - Fetching Data related to users
//Login, logout operations

//Posts login data to api and verify user login
//Parameters: username: String, password: String
//Returns userInfo: Object, jwt.Token(userInfo: {userToken: token}) for api authentication
const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'api/users/login',
        { username, password },
        config
      );
      localStorage.setItem('userToken', data.userToken);
      localStorage.setItem('userInfo', data);
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

//Performs logout operation by removing userInfo and userToken from the local storage
const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userToken');
});

// const userRegister = createAsyncThunk(
//   'user/register',
//   async ({ username, password, firstName, lastName }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(
//         'api/users/register',
//         { username, password, firstName, lastName },
//         config
//       );
//       localStorage.setItem('userToken', data.userToken);
//       return data;
//     } catch (err) {
//       if (err.response && err.response.data.message) {
//         return rejectWithValue(err.response.data.message);
//       } else {
//         return rejectWithValue(err.message);
//       }
//     }
//   }
// );

// const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async (arg, { getState, rejectWithValue }) => {
//     try {
//       const user = getState();
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.userToken}`,
//         },
//       };

//       const { data } = await axios.post(
//         `api/users/getUserInfo/${user.userInfo.username}`,
//         config
//       );
//       return data;
//     } catch (err) {
//       if (err.response && err.response.data.message) {
//         return rejectWithValue(err.response.data.message);
//       } else {
//         return rejectWithValue(err.message);
//       }
//     }
//   }
// );

export { userLogin, logout };
