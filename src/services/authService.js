import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLocalStorageItem, removeLocalStorageItem } from './localStorageHelper';

// Enhanced mock user data
const MOCK_USER = {
  id: '1',
  username: 'dipthakur139@gmail.com',
  password: 'Dip1234$',
  tokenExpiry: Date.now() + 3600000 // 1 hour expiration
};

// Enhanced mock login API call
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === MOCK_USER.username && password === MOCK_USER.password) {
        const token = btoa(`${MOCK_USER.id}:${Date.now()}`);
        const authData = {
          user: { ...MOCK_USER, token },
          token,
          expiresAt: MOCK_USER.tokenExpiry
        };
        setLocalStorageItem('auth', authData);
        return authData;
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mock logout API call
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    removeLocalStorageItem('authToken');
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
);