// profileSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to handle profile creation/update
export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (profileData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (key === 'interestedIn') {
          formData.append(key, JSON.stringify(profileData[key]));
        } else if (key === 'socialLinks') {
          formData.append(key, JSON.stringify(profileData[key]));
        } else if (key === 'profileImage' && profileData[key]) {
          formData.append('profileImage', {
            uri: profileData[key],
            type: 'image/jpeg',
            name: 'profile.jpg',
          });
        } else {
          formData.append(key, profileData[key]);
        }
      });

      const response = await axios.post(
        'http://192.168.31.50:5000/api/user-profile',
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to save profile');
    }
  },
);

// Fetch profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'http://192.168.31.50:5000/api/user-profile',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    bio: '',
    age: '',
    gender: '',
    interestedIn: [],
    socialLinks: {instagram: '', facebook: ''},
    profileImage: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setProfileField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetProfile: state => {
      return {
        bio: '',
        age: '',
        gender: '',
        interestedIn: [],
        socialLinks: {instagram: '', facebook: ''},
        profileImage: null,
        status: 'idle',
        error: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(saveProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {setProfileField, resetProfile} = profileSlice.actions;
export default profileSlice.reducer;
