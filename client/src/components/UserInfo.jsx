import React from "react";
import './style/UserInfo.css';

const UserInfo = () => {

  const userData = JSON.parse(localStorage.getItem('data'));

  return(
    <div className="userInfo">
      {userData[0].username}
    </div>
  )
};

export default UserInfo;
