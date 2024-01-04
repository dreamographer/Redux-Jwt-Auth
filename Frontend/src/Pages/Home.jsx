import React from 'react'
import { useNavigate,Link} from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";
const Home = () => {
    const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();  
  const dispatch=useDispatch()
const logoutHandler =() => { 
      dispatch(logoutUser()).then((res)=>{
        dispatch(logout())
        navigate("/login");
      })
  };
  return (
    <div>
      {userInfo ? (
        <>
          <p onClick={logoutHandler}>Logout</p>
          <Link to={"/profile"}>
            <p>Profile</p>
          </Link>
        </>
      ) : (
        <Link to={"/login"}>
          <p>Login</p>
        </Link>
      )}
    </div>
  );
}

export default Home