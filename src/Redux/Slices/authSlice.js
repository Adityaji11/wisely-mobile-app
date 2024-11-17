import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Async actions
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data.data; // Access token and refresh token
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const signupUser = createAsyncThunk('auth/signup', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, credentials);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Signup failed');
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
  try {
    const { refreshToken } = getState().auth;
    const response = await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken });
    return response.data.data.accessToken;
  } catch (error) {
    return rejectWithValue('Failed to refresh token');
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
