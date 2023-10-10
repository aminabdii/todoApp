import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "  http://localhost:5000",
});

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("todos");
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        id: Date.now(),
        title: payload.title,
        isCompleted: false,
      });
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`, { id: payload.id });
      return { id: payload.id };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodo = createAsyncThunk(
  "todos/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch(`/todos/${payload.id}`, {
        id: payload.id,
        isCompleted: payload.isCompleted,
      });
      console.log(payload);
      return { id: payload.id, isCompleted: payload.isCompleted };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: { isLoading: false, todos: [], error: "" },
  reducers: {
    addTodo: (state, { payload }) => {
      const newTodo = {
        id: Date.now(),
        title: payload["title"],
        isCompleted: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
    toggleTodo: (state, { payload }) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(payload.id)
      );
      selectedTodo.isCompleted = !selectedTodo.isCompleted;
    },
  },
  extraReducers: {
    // ... get todo
    [getAsyncTodos.pending]: (state, _) => {
      state.isLoading = true;
      state.todos = [];
      state.error = "";
    },
    [getAsyncTodos.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = payload;
      state.error = "";
    },
    [getAsyncTodos.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = [];
      state.error = payload;
    },
    // ... post todo
    [addAsyncTodo.pending]: (state, _) => {
      state.isLoading = true;
    },
    [addAsyncTodo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todos.push(payload);
      state.error = "";
    },
    [addAsyncTodo.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    // ...delete todo
    [deleteAsyncTodo.pending]: (state, _) => {
      state.isLoading = true;
    },
    [deleteAsyncTodo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
      state.error = "";
    },
    [deleteAsyncTodo.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = [];
      state.error = payload;
    },
    // ..toggle todo
    [toggleAsyncTodo.pending]: (state, _) => {
      state.isLoading = true;
    },
    [toggleAsyncTodo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(payload.id)
      );
      selectedTodo.isCompleted = payload.isCompleted;
    },
    [toggleAsyncTodo.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.todos = [];
      state.error = payload;
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
