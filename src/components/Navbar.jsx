import React, { useContext } from "react";
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
// import DropDown from "./DropDown";
import DefaultModal from "./DefaultModal";
import Button from "./Button";
import { StateContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = firebase.auth();
  const {
    cartCount,
    wishlistCount,
    darkMode,
    toggleDarkMode,
    categories,
    handleFilter,
    selectedCategory
  } = useContext(StateContext);

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
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <FaSun className="navbar_icon" />
              ) : (
                <FaMoon className="navbar_icon" />
              )}
            </button>
            <Link to="/wishlist">
              <FaHeart className="navbar_icon" />
              {wishlistCount > 0 && (
                <span className="patch">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/user">
              <FaUser className="navbar_icon" />
            </Link>
            <Link to="/cart">
              <FaShoppingCart className="navbar_icon" />
              {cartCount > 0 && <span className="patch">{cartCount}</span>}
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
            <Button text="All" handleClick={() => handleFilter("all")} btn_class={`${selectedCategory === "all" && 'selected_category'}`} />
            {categories.map((item, index) => (
              <Button
                key={index}
                text={item}
                handleClick={() => handleFilter(item)}
                btn_class={`${selectedCategory === item && 'selected_category'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
