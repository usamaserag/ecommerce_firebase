import React from "react";
import { FaMobile, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopSmallNavbar = () => {
  return (
    <nav className="w-full py-2">
      <div className="container m-auto">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2">
            <FaMobile className="text-xs text-primary" />
            <small className="text-xs font-medium">+201094647749</small>
          </Link>
          <Link className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-xs text-primary" />
            <small className="text-xs font-medium">6th of October</small>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopSmallNavbar;
