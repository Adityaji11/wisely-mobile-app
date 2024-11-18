import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const API_BASE = 'http://10.0.2.2:5000/api/auth/'; // Replace with your backend URL

// Thunk for Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({firstName, lastName, email, password}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data.message; // success message from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  },
);

// Thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/login`, {email, password});
      return response.data.message; // success message from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

// Thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/logout`, {
        refreshToken: 'dummy_token',
      }); // Send refresh token if needed
      return response.data.message; // success message from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  },
);

// Thunk for refreshing session
export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/refresh-token`, {
        refreshToken: 'dummy_token',
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Session refresh failed',
      );
    }
  },
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, state => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
