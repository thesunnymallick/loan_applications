import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import toggleSidebarReducer from '../features/toggleSidebarSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, // Add other slices here as needed
    mobileSidebar:toggleSidebarReducer,
  },
});

export default store;
