import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import SignUp from './Pages/SignUp.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AuthorizedRoute from './components/AuthorizedRoute.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import { Toaster } from "react-hot-toast";
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AuthorizedRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      </Route>
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
