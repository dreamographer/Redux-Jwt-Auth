import { configureStore } from '@reduxjs/toolkit';
import userReducer  from '../slices/userSlice';
import authReducer from '../slices/authSlice'; // add this line

const store = configureStore({ 
  reducer: {
    user: userReducer,
    auth: authReducer, 
  }
});

export default store;
 