import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const Profile = () => {
  const { user } = useContext(StateContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="content">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={user?.photoURL}
            alt="userImage"
          />
        </div>
        <p>Welcome <span className="text-primary"> {user?.displayName}</span></p>
      </div>
    </div>
  );
};

export default Profile;
