import React from 'react'
import { useNavigate,Link} from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";

const Home = () => {

  return (
    <div className='overflow-hidden'>
      <img
        src="/1694.jpg"
        alt="School"
        className="absolute -z-20 w-screen h-screen "
      />
      <div className=" justify-center bg-black/30  h-screen items-center  flex">
        <p className="text-white  font-[poppins] text-6xl shadow-lg font-black">
          WElcome to the Home Page
        </p>

      </div>
    </div>
  );
}

export default Home