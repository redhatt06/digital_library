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
      if (data.error) {
        return rejectWithValue(data.error);
      }

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

export { userLogin, logout };
