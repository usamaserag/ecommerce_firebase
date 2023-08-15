import React from "react";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import DropDown from "./DropDown";
import DefaultModal from "./DefaultModal";

const Navbar = ({ user, changeColors, darkMode }) => {
  const navigate = useNavigate();
  const auth = firebase.auth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar_wrapper">
        <div className="top_navbar">
          <div className="left_nav">
            <Link to="+9123 456 87" className="phone_nav">
              <FaPhoneAlt className="left_nav_navbar_icon" />
              <small>+9123 456 87</small>
            </Link>
            <Link to="creto@gmail.com" className="mail_nav">
              <FaEnvelope className="left_nav_navbar_icon" />
              <small>creto@gmail.com</small>
            </Link>
          </div>
          <div className="right_nav">
            <button onClick={changeColors}>
              {darkMode ? (
                <FaSun className="navbar_icon" />
              ) : (
                <FaMoon className="navbar_icon" />
              )}
            </button>
            <Link to="/wishlist">
              <FaHeart className="navbar_icon" />
            </Link>
            <Link to="/user">
              <FaUser className="navbar_icon" />
            </Link>
            <Link to="/cart">
              <FaShoppingCart className="navbar_icon" />
            </Link>
            <DefaultModal
              darkMode={darkMode}
              text={<FaSignOutAlt className="navbar_icon" />}
              handleOkModal={handleLogout}
              modalTitle="Are you sure you want log out!"
            />
          </div>
        </div>
        <div className="main_navbar">
          <div className="left_nav">
            <Link to="/">
              <div className="navbar_logo">Serag</div>
            </Link>
          </div>
          <div className="right_nav">
            <DropDown text="Home" />
            <Link className="main_nav_item">
              <p className="main_nav_item_text">Services</p>
            </Link>
            <Link className="main_nav_item">
              <p className="main_nav_item_text">Shop</p>
            </Link>
            <Link className="main_nav_item">
              <p className="main_nav_item_text">Gallery</p>
            </Link>
            <Link className="main_nav_item">
              <p className="main_nav_item_text">Pages</p>
            </Link>
            <Link className="main_nav_item">
              <p className="main_nav_item_text">Contacts</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;