import { Outlet } from "react-router-dom";
import React from "react";

import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
 
      <Outlet />
    </>
  );
};

export default App;
