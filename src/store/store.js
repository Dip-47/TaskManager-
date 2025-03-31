import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import weatherReducer from './weatherSlice';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    weather: weatherReducer,
    error: errorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;