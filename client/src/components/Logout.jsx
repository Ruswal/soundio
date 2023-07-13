import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.jsx";
import './style/logout.css';

const Logout = () => {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.onLogout();
    navigate('/login');
  }

  return(

    <div className='logout-container'>
      <div className='logout-handler' onClick = {handleLogout}> Logout </div>
    </div>

  );

}

export default Logout;
