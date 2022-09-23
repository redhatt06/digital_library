import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Author Actions - Fetching data related to authors

//Fetches the whole author list through the api
const listAuthors = createAsyncThunk(
  'authors/list',
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get('api/authors', config);

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
//Fetches an author by its id through API
//Returns an author object with its books
const getAuthorById = createAsyncThunk(
  'authors/id',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`api/authors/${id}`, config);

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

//Fetches the authors with most books written through the api
//Returns Array of author objects
const getAuthorsWithMostBooks = createAsyncThunk(
  'authors/query/mostbooks',
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get('api/authors/query/mostbooks', config);

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

//Adds an author to the database through the api
//Parameters:  name: String, author's books: String
//Returns created author: Object
const addAuthor = createAsyncThunk(
  'authors/add',
  async ({ name, books }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      var { data } = await axios.post(
        'api/authors/add',
        { name, books },
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
//Deletes an author through the api
//Parameters: author_id : Integer
//Returns Postgres response
const deleteAuthor = createAsyncThunk(
  'authors/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`api/authors/${id}`, config);

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
//Updates an author through the api
//Parameters: author_id Integer, name: String, author's books: String
//Returns Postgres response
const updateAuthor = createAsyncThunk(
  'authors/update',
  async ({ id, name }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.userToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put('api/authors', { id, name }, config);

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
  addAuthor,
  listAuthors,
  deleteAuthor,
  updateAuthor,
  getAuthorsWithMostBooks,
  getAuthorById,
};
