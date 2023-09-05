import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const Profile = () => {
  const { user } = useContext(StateContext);
  useEffect(()=>{
    console.log(user)
  },[user])
  return (
    <div className="content">
      <p>Welcome {user.displayName}</p>
    </div>
  );
};

export default Profile;
