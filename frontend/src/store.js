import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer.js';
import searchReducer from './reducers/searchReducer.js';
import bookReducer from './reducers/bookReducer.js';
import authorReducer from './reducers/authorReducer.js';

//Redux storage configuration for storage management
const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    book: bookReducer,
    author: authorReducer,
  },
});

export default store;
