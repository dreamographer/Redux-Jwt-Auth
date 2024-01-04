import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../slices/userSlice';
import authReducer from '../slices/authSlice'; // add this line
import adminReducer from '../slices/adminSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
 