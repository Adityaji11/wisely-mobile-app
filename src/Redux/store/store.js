import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import profileReducer from '../Slices/profileSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:profileReducer
  },
});

export default store;
