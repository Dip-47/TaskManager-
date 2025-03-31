import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherData } from '../services/weatherService';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  lastUpdated: null
};

export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (location, { rejectWithValue }) => {
    try {
      const weatherData = await getWeatherData(location);
      return {
        data: weatherData,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default weatherSlice.reducer;