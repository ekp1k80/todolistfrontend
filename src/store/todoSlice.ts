// store/todoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
    completed: boolean
    createdAt: string
    deletedAt: string
    id: number
    task: string
    updatedAt: string
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

console.log(process.env)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, task }: { id: number; task: string }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_SERVER_URI}/api/todos/${id}`, {
          task,
          completed: false,
        });
        return { id, task: response.data.task };
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to update todo');
      }
    }
  );

// Thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URI}/api/todos`);
      return response.data; // Assuming the API returns an array of todos
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch todos');
    }
  }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER_URI}/api/todos/${id}`);
        return id; // Retorna el ID del todo eliminado
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to delete todo');
      }
    }
  );

  export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (task: string, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER_URI}/api/todos`, { task });
        return response.data; // Suponiendo que el backend devuelve el todo creado
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error adding todo');
      }
    }
  );

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<{ id: number; task: string }>) => {
        const { id, task } = action.payload;
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.task = task;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // Agrega el nuevo todo al estado
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
