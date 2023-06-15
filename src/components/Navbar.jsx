import React from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo_page.png";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Navbar = ({user}) => {
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
        <img className="navbar_logo" src={logoImage} alt="logo_image" />
        <ul className="navbar_list">
          <SearchOutlined className="navbar_icon" />
          <Link to="/user">
            <UserOutlined className="navbar_icon" />
          </Link>
          <Link to="/wishlist">
            <HeartOutlined className="navbar_icon" />
          </Link>
          <Link to="/cart">
            <ShoppingCartOutlined className="navbar_icon" />
          </Link>
          {/* <Link to="/signup">Sign up</Link> */}
          {user ? <Link onClick={handleLogout}>Log out</Link> : <Link to="/login">Log in</Link>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
