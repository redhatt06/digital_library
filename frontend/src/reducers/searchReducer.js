//Search Reducer - Manages the states of search storage to be able to render data coming from the api through search actions

import { createSlice } from '@reduxjs/toolkit';
import { getSearchData } from '../actions/searchActions.js';

//Set initial state of search slice
const initialState = {
  loading: false,
  searchData: null,
  error: null,
  success: false,
  type: null,
  multiple: false,
};

//create search slice with required reducers and initial state
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.searchData = null;
    },
  },
  extraReducers: {
    [getSearchData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSearchData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchData = payload.data[0];
      state.type = payload.type;
      state.multiple = payload.multiple;
    },
    [getSearchData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
