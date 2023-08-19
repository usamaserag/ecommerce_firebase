import React, { useContext } from "react";
import { StateContext } from "../App";

const Profile = () => {
  const { user } = useContext(StateContext);
  const getUserName = () => {
    if (user && user !== null) {
      return user.email.substring(0, user.email.indexOf("@"));
    }
  };

  return (
    <div className="content">
      <p>Welcome {getUserName()}</p>
    </div>
  );
};

export default Profile;
