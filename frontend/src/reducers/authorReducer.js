//Author Reducer - Manages the states of author storage to be able to render data coming from the api through author actions

import { createSlice } from '@reduxjs/toolkit';
import {
  addAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthorsWithMostBooks,
  listAuthors,
  updateAuthor,
} from '../actions/authorActions.js';

//Set initial state of author slice
const initialState = {
  loading: false,
  response: null,
  deleted: null,
  updated: null,
  error: null,
  success: false,
};

//create author slice with required reducers and initial state
const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.deleted = null;
      state.updated = null;
      state.response = null;
    },
    resetOps: (state) => {
      state.deleted = null;
      state.updated = null;
    },
  },
  extraReducers: {
    [addAuthor.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addAuthor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [addAuthor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [listAuthors.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [listAuthors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [listAuthors.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAuthorsWithMostBooks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAuthorsWithMostBooks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [getAuthorsWithMostBooks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAuthorById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAuthorById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [getAuthorById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateAuthor.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateAuthor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.updated = payload;
    },
    [updateAuthor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteAuthor.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteAuthor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.deleted = payload;
    },
    [deleteAuthor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { reset, resetOps } = authorSlice.actions;
export default authorSlice.reducer;
