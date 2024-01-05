import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../slices/authSlice";   
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";
const NavBar = () => {
  const { userInfo } = useSelector(state => state.auth);
    const[menu,setMenu]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser()).then(res => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <header className="lg:px-16 px-4 fixed font-medium z-50 w-screen bg-white/40 drop-shadow-md backdrop-blur-sm flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </div>

      <label
        onClick={() => setMenu(!menu)}
        htmlFor="menu-toggle"
        className="pointer-cursor md:hidden block"
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" />

      <div
        className={`${
          !menu && "hidden"
        } md:flex md:items-center md:w-auto w-full transition-all duration-500 ease-in-out`}
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            {userInfo ? (
              <>
                <li className="cursor-pointer mr-5" onClick={logoutHandler}>
                  Logout
                </li>
                <Link to={"/profile"}>
                  <li className="mr-5">Profile </li>
                </Link>
                {userInfo.isAdmin && (
                  <Link to={"/admin/dashboard"}>
                    {" "}
                    <li>Admin Dashboard</li>
                  </Link>
                )}
              </>
            ) : (
              <Link to={"/login"}>
                <li>Login</li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
