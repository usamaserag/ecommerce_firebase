import React from "react";

const Profile = ({ user }) => {
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
