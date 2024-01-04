import { Outlet } from "react-router-dom";
import React from "react";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default App;
