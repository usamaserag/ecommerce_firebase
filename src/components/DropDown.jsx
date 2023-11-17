import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ title, dropdownItems }) => {
  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="">
        {title}
      </label>
      <ul
        tabIndex={0}
        className={dropdownItems ? 'dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-base-1y00' : 'none'}
      >
        {dropdownItems && dropdownItems.map((item) => (
          <Link to={item.url} className="flex items-center gap-2 p-2">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
