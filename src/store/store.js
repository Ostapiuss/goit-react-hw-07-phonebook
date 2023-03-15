import { configureStore } from "@reduxjs/toolkit";

import phoneBookReducer from './slices/phonebookSlice';

const store = configureStore({
  name: 'phonebook',
  reducer: {
    phonebook: phoneBookReducer,
  }
});

export default store;
