import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Search Actions - Fetching data related to search

//Given a search string fetches either an author by his/her name or book by its title throguh api
//Parameters: seatchValue: String
//Returns a book or an author object
const getSearchData = createAsyncThunk(
  'search/get',
  async (searchValue, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(
        `api/search/${encodeURIComponent(searchValue)}`,
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

export { getSearchData };
