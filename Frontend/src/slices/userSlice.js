import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const USERS_URL = "http://localhost:5000/api/users";

export const loginUser = createAsyncThunk("user/login", async (data, thunkAPI) => {
  // try {
    const response = await axios.post(`${USERS_URL}/auth`, data);
    return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
  
//   }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await axios.post(`${USERS_URL}/logout`);
  return response.status === 200;
});

export const registerUser = createAsyncThunk("user/register", async data => {
  const response = await axios.post(`${USERS_URL}`, data);
  const user = response.data;
  return user;
});

export const updateUser = createAsyncThunk("user/update", async data => {
  const response = await axios.put(`${USERS_URL}/profile`, data);
  const user = response.data;
  return user;
});


const userSlice = createSlice({
  name: "user",
  initialState: { user: [], loading: "idle",error:'' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
          console.log("peding");
          state.loading = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          console.log("completer");
        state.loading = "idle";
        state.error = "";
        state.user.push(action.payload);
      })
      .addCase(loginUser.rejected, (state,action )=> {
        console.log("erer");
        state.loading = "";
        state.error="Invalid email or password"
      })
      .addCase(registerUser.pending);
    // Handle other cases for logoutUser, registerUser, and updateUser similarly
  },
});

export default userSlice.reducer;
