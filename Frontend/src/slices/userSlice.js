import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const USERS_URL = "http://localhost:5000/api/users";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data) => {
    const response = await axios.post(`${USERS_URL}/auth`, data,{
    withCredentials: true,
  });
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await axios.post(`${USERS_URL}/logout`);
  return response.status === 200;
});

export const registerUser = createAsyncThunk("user/register", async data => {
  const response = await axios.post(`${USERS_URL}`, data, {
    withCredentials: true,
  });
  const user = response.data;
  return user;
});

export const updateUser = createAsyncThunk("user/update", async data => {
  const response = await axios.put(`${USERS_URL}/profile`, data, {
    withCredentials: true,
  });
  const user = response.data;
  return user;
});


const userSlice = createSlice({
  name: "user",
  initialState: { loading: "idle", error: "" },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "idle";
        // state.user.push(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = "Invalid email or password";
      })
      .addCase(logoutUser.pending, state => {
        state.loading = "loading";
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = "idle";
        // state.user = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, state => {
        state.loading = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "idle";
        // state.user.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, state => {
        state.loading = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = "idle";
        // state.user =action.payload 
       
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
