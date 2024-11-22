import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// const API_BASE = 'http://10.0.2.2:5000/api/auth/'; // Replace with your backend URL
const API_BASE = 'http://192.168.31.50:5000/api/auth/'; // Replace with your backend URL

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
      const response = await axiosInstance.post(`${API_BASE}/login`, {
        email,
        password,
      });
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
      const response = await axiosInstance.post(`${API_BASE}/logout`);
      return response.data.message; // success message from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  },
);

export const verifySession = createAsyncThunk(
  'auth/verifySession',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      // Dispatch the refreshAccessToken action to get a new access token
      const result = await dispatch(refreshSession());

      // If the refresh token action fails (rejected)
      if (result.type === 'auth/refreshAccessToken/rejected') {
        return rejectWithValue('Failed to refresh session');
      }

      // If the refresh token action succeeded, access the new access token
      const accessToken = result.payload.data.accessToken;

      // Now use the access token to verify the session
      const sessionResponse = await axiosInstance.post(
        `${API_BASE}/verify-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token for session verification
          },
        },
      );

      // Return the user data if session is valid
      return sessionResponse.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Session invalid',
      );
    }
  },
);

// Thunk for refreshing session (when access token expires)
export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/refresh-token`);
      return response.data; // Return the access token, not user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Session refresh failed',
      );
    }
  },
);

// Thunk to update user location
export const updateUserLocation = createAsyncThunk(
  'user/updateLocation',
  async ({ coordinates }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/update-location`, { coordinates });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update location.');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    location: null,
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
      })
      .addCase(verifySession.pending, state => {
        state.status = 'loading';
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(verifySession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Refreshing session (for expired access token)
      .addCase(refreshSession.pending, state => {
        state.status = 'loading';
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
