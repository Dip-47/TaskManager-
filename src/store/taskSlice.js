import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalStorageItem, setLocalStorageItem } from '../services/localStorageHelper';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null
};

// Helper function to generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Load tasks from localStorage
const loadTasks = () => {
  const savedTasks = getLocalStorageItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Mock async thunk for adding a task
export const addTask = createAsyncThunk(
  'tasks/add',
  async ({ title, priority }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTask = {
        id: generateId(),
        title,
        priority,
        createdAt: new Date().toISOString()
      };
      return newTask;
    } catch (error) {
      return rejectWithValue('Failed to add task');
    }
  }
);

// Mock async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return taskId;
    } catch (error) {
      return rejectWithValue('Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    ...initialState,
    tasks: loadTasks()
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [...state.tasks, action.payload];
        setLocalStorageItem('tasks', JSON.stringify(state.tasks));
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        setLocalStorageItem('tasks', JSON.stringify(state.tasks));
      });
  }
});

export default taskSlice.reducer;