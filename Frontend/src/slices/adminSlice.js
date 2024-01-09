import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ADMIN_USERS_URL = "http://localhost:5000/api/admin/users";

// Async actions
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(ADMIN_USERS_URL, {
    withCredentials: true,
  });
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async userData => {
    const response = await axios.post(ADMIN_USERS_URL, userData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async id => {
  const response = await axios.delete(`${ADMIN_USERS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }) => {
    const response = await axios.put(`${ADMIN_USERS_URL}/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: "idle", error: "" },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createUser.pending, state => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          user => action.payload._id!==(user._id)
        );
      })
      .addCase(deleteUser.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editUser.pending, state => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          user => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default usersSlice.reducer;
