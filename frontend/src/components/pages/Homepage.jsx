import React, { useEffect } from 'react';
import Register from "../auth/register/Register";
import Login from '../auth/login/Login';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
        navigate("/chats");
    }
  }, [navigate]);
  return (
    <div className='container'>
    <Login/>
    <Register/>
    </div>
  )
}

export default Homepage;
