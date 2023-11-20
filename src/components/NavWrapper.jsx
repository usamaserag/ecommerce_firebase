import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavWrapper = ({ children }) => {
  const [isInLogin, setIsInLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsInLogin(false);
    } else {
      setIsInLogin(true);
    }
  }, [location]);

  return <div>{isInLogin && children}</div>;
};

export default NavWrapper;
