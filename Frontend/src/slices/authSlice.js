import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    updateImage: (state, action) => {
      const updatedUserInfo = {
        ...state.userInfo,
        image: action.payload,
      };
      state.userInfo = updatedUserInfo;
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials,updateImage, logout } = authSlice.actions;

export default authSlice.reducer;
