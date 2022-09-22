//User Reducer - Manages the states of user storage to be able to render data coming from the api through user actions

import { createSlice } from '@reduxjs/toolkit';
import { userLogin, logout } from '../actions/userAction.js';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

//Set initial state of user slice
const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
};

//create user slice with required reducers and initial state
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.userInfo = null;
      state.userToken = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // [userRegister.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [userRegister.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true;
    // },
    // [userRegister.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    // [getUserInfo.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getUserInfo.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    // },
    // [getUserInfo.rejected]: (state, { payload }) => {
    //   state.loading = false;
    // },
    [logout.fulfilled]: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
