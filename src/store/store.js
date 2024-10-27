import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other slices here as needed
  },
});

export default store;
