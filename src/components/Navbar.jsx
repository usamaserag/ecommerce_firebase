import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [returnToTop, setReturnToTop] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const auth = firebase.auth();

  const getUserName = (user) => {
    if (user && user !== null) {
      return user.email.substring(0, user.email.indexOf("@"));
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", function () {
      const scrollHeight = window.scrollY;
      if (scrollHeight > 200) {
        setIsScroll(true);
        setReturnToTop(false);
      } else {
        setIsScroll(false);
        setReturnToTop(true);
      }
    });

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <nav
      className={`navbar ${isScroll && "navbar_bg"} ${
        returnToTop && "navbar_to_top"
      }`}
    >
      <div className="navbar_wrapper">
        <Link to="/">
          <div className="navbar_logo">Serag</div>
        </Link>
        <ul className="navbar_list">
          <div
            className="user-icon-container"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <div className="navbar_item">
              <h5>User</h5>
              <UserOutlined className="navbar_icon" />
            </div>
            <div
              className={`dropdown-content ${isDropdownOpen ? "active" : ""}`}
            >
              <Link to="/user">
                <div className="dropdown-item">{getUserName(user)}</div>
              </Link>

              <div className="dropdown-item" onClick={handleLogout}>
                Log out
              </div>
            </div>
          </div>

          <Link to="/wishlist">
            <div className="navbar_item">
              <h5>Wishlist</h5>
              <HeartOutlined className="navbar_icon" />
            </div>
          </Link>
          <Link to="/cart">
            <div className="navbar_item">
              <h5>Cart</h5>
              <ShoppingCartOutlined className="navbar_icon" />
            </div>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
