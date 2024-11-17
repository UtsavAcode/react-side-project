import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (page) => {
    const response = await axios.get(
      `https://gorest.co.in/public/v1/users?page=${page}`
    );
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
  },
  reducers: {
    addMessage: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;

        state.items = [...state.items, ...action.payload.data.reverse()];

        state.currentPage = action.payload.meta.pagination.page;
        state.hasMore =
          action.payload.meta.pagination.page <
          action.payload.meta.pagination.pages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
