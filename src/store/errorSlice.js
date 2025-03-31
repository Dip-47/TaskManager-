import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null, // 'error', 'warning', 'info'
  timestamp: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'error';
      state.timestamp = new Date().toISOString();
    },
    clearError: (state) => {
      state.message = null;
      state.type = null;
      state.timestamp = null;
    }
  }
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = (state) => state.error;

export default errorSlice.reducer;