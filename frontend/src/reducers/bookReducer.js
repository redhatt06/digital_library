//Book Reducer - Manages the states of book storage to be able to render data coming from the api through book actions

import { createSlice } from '@reduxjs/toolkit';
import {
  addBook,
  deleteBook,
  getBookById,
  getBooksWithMoreThanThreeAuthors,
  listBooks,
  updateBook,
} from '../actions/bookActions.js';

//Set initial state of book slice
const initialState = {
  loading: false,
  response: null,
  deleted: null,
  updated: null,
  added: null,
  error: null,
  success: false,
};
//create book slice with required reducers and initial state
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.deleted = null;
      state.updated = null;
      state.added = null;
      state.response = null;
    },
    resetOps: (state) => {
      state.deleted = null;
      state.updated = null;
      state.added = null;
    },
  },
  extraReducers: {
    [addBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addBook.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
      state.added = 'Book is successfully created.';
    },
    [addBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.added = payload;
    },
    [listBooks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [listBooks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [listBooks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getBooksWithMoreThanThreeAuthors.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getBooksWithMoreThanThreeAuthors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [getBooksWithMoreThanThreeAuthors.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getBookById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getBookById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.response = payload;
    },
    [getBookById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateBook.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.updated = payload;
    },
    [updateBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.deleted = payload;
    },
    [deleteBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { reset, resetOps } = bookSlice.actions;
export default bookSlice.reducer;
