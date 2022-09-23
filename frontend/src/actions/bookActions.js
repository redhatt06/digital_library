import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Book Actions - Fetching data related to authors

//Fetches the whole book list through the api
const listBooks = createAsyncThunk(
  'books/list',
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get('api/books', config);

      if (data.error) {
        return rejectWithValue(data.error);
      }

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

//Fetches a book with by its id through API
//Returns a book object with its autors
const getBookById = createAsyncThunk(
  'books/id',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`api/books/${id}`, config);

      if (data.error) {
        return rejectWithValue(data.error);
      }

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

//Fetches the books with more than three authors through the api
//Returns Array of book objects
const getBooksWithMoreThanThreeAuthors = createAsyncThunk(
  'books/query/more_than_three_authors',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        'api/books/query/more_than_three_authors',
        config
      );

      if (data.error) {
        return rejectWithValue(data.error);
      }

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

//Adds a book to the database through the api
//Parameters: id:Integer title: String, book's authors: String(comma seperated)
//Returns created author: Object
const addBook = createAsyncThunk(
  'books/add',
  async ({ id, title, authors }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      var { data } = await axios.post(
        'api/books/add',
        { id, title, authors },
        config
      );
      if (data.error) {
        return rejectWithValue(data.error);
      }

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

//Deletes a book through the api
//Parameters: book_id : Integer
//Returns Postgres response
const deleteBook = createAsyncThunk(
  'books/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`api/books/${id}`, config);

      if (data.error) {
        return rejectWithValue(data.error);
      }

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

//Updates a book through the api
//Parameters: book_id Integer, title: String, book's authors: String(comma seperated)
//Returns Postgres response
const updateBook = createAsyncThunk(
  'books/update',
  async ({ id, title, authors }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        'api/books',
        { id, title, authors },
        config
      );
      if (data.error) {
        return rejectWithValue(data.error);
      }

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

export {
  addBook,
  listBooks,
  deleteBook,
  updateBook,
  getBooksWithMoreThanThreeAuthors,
  getBookById,
};
