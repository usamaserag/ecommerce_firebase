import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const Profile = () => {
  const { user } = useContext(StateContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="container m-auto py-4">
      <div className="flex items-center gap-2">
        <p>Welcome <span className="text-primary"> {user?.displayName}</span></p>
      </div>
    </div>
  );
};

export default Profile;
