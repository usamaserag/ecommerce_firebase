// import React, { useContext } from "react";
// import {
//   FaMoon,
//   FaSun,
//   FaSignOutAlt,
//   FaShoppingCart,
//   FaHeart,
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import firebase from "../firebase";
// import DefaultModal from "./DefaultModal";
// import Button from "./Button";
// import { StateContext } from "../App";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const auth = firebase.auth();
//   const {
//     cartCount,
//     wishlistCount,
//     darkMode,
//     toggleDarkMode,
//     categories,
//     handleFilter,
//     selectedCategory,
//   } = useContext(StateContext);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };
//   return (
//     <nav className="navbar">
//       <div className="navbar_wrapper w-full flex flex-col gap-2">
//         <div className="top_navbar w-full flex justify-between">
//           <div className="left_nav">
//             <Link to="+9123 456 87" className="phone_nav">
//               <FaPhoneAlt className="left_nav_navbar_icon" />
//               <small>+201094647749</small>
//             </Link>
//             <Link to="creto@gmail.com" className="mail_nav">
//               <FaEnvelope className="left_nav_navbar_icon" />
//               <small>Serag@gmail.com</small>
//             </Link>
//           </div>
//           <div className="right_nav">
//             <button onClick={toggleDarkMode}>
//               {darkMode ? (
//                 <FaSun className="navbar_icon" />
//               ) : (
//                 <FaMoon className="navbar_icon" />
//               )}
//             </button>
//             <Link to="/wishlist">
//               <FaHeart className="navbar_icon" />
//               {wishlistCount > 0 && (
//                 <span className="patch">{wishlistCount}</span>
//               )}
//             </Link>
//             <Link to="/user">
//               <FaUser className="navbar_icon" />
//             </Link>
//             <Link to="/cart">
//               <FaShoppingCart className="navbar_icon" />
//               {cartCount > 0 && <span className="patch">{cartCount}</span>}
//             </Link>
//             <DefaultModal
//               text={<FaSignOutAlt className="navbar_icon" />}
//               handleOkModal={handleLogout}
//               modalTitle="Are you sure you want log out!"
//             />
//           </div>
//         </div>
//         <div className="main_navbar w-full">
//           <div className="left_nav">
//             <Link to="/">
//               <div className="navbar_logo">Serag</div>
//             </Link>
//           </div>
//           {/* <div className="right_nav">
//             <Button
//               text="All"
//               handleClick={() => handleFilter("all")}
//               btn_class={`${selectedCategory === "all" && "selected_category"}`}
//             />
//             {categories.map((item, index) => (
//               <Button
//                 key={index}
//                 text={item}
//                 handleClick={() => handleFilter(item)}
//                 btn_class={`${
//                   selectedCategory === item && "selected_category"
//                 }`}
//               />
//             ))}
//           </div> */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import Modal from "./Modal";
import userImage from "../assets/images/user.jpg";
import { motion } from "framer-motion";
import { debounce } from "lodash";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = firebase.auth();
  const { cartCount, wishlistCount, cart, totalCart, user } =
    useContext(StateContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    }, 50); // Adjust the debounce time as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrollPosition < 130 ? (
        <div className="shadow-md bg-white h-20">
          <div className="container m-auto flex items-center justify-between h-full navbar_btn">
            <div className="">
              <Link to="/">
                <div className="navbar_logo text-3xl font-bold tracking-wider text-orange-500">Serag</div>
              </Link>
            </div>
            <div className="flex items-center gap-8">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <span className="relative flex items-center justify-center">
                    <FaShoppingCart className="text-2xl hover:text-primary" />
                    {cartCount > 0 && (
                      <span className="absolute text-xs top-[-15px] right-[-15px] w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </span>
                </label>
                <div
                  tabIndex={0}
                  className="z-[1] card card-compact dropdown-content w-60 shadow border bg-white rounded-md mt-8 overflow-y-auto max-h-[80vh]"
                >
                  <div className="card-body">
                    {cartCount > 0 && (
                      <span className="font-medium text-lg">
                        {cartCount} Items
                      </span>
                    )}
                    {cart.length < 1
                      ? "No products in your cart"
                      : cart.map((item) => (
                          <div
                            className="flex flex-col gap-1 border-b py-1"
                            key={item.id}
                          >
                            <div className="w-8 h-8">
                              <img src={item.image} alt="product_image" />
                            </div>
                            <h5 className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                              {item.title}
                            </h5>
                            <div className="flex items-center gap-2 justify-between">
                              <div className="flex items-center gap-2">
                                <span className="cart_item_price">
                                  {item.quantity}
                                </span>
                                <small>x</small>
                                <b className="cart_item_price_total">
                                  {item.price}
                                </b>
                              </div>
                              <b>{item.quantity * item.price}</b>
                            </div>
                          </div>
                        ))}
                    {totalCart > 0 && (
                      <span className="flex items-center justify-between mt-4">
                        <span className="font-semibold">Subtotal:</span>{" "}
                        <b className="text-primary">{totalCart.toFixed(2)}</b>
                      </span>
                    )}
                    {totalCart > 0 && (
                      <Link
                        to="/cart"
                        className="bg-primary hover:bg-primaryHover text-white py-2 px-6 m-auto rounded-md mt-4"
                      >
                        View cart
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full">
                    {user && user.photoURL ? (
                      <img alt="user" src={user.photoURL} />
                    ) : (
                      <img alt="default" src={userImage} />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-5 z-[1] p-2 shadow rounded-md w-52 bg-white"
                >
                  {!user && (
                    <Link
                      to="/login"
                      className="bg-primary hover:bg-primaryHover text-sm text-white py-2 px-6 m-auto block my-2 rounded-md w-fit"
                    >
                      SIGN IN
                    </Link>
                  )}
                  <Link
                    to="/user"
                    className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200"
                  >
                    <FaUser className="text-sm" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200"
                  >
                    <FaHeart className="text-sm" />
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="text-xs w-5 h-5 bg-primary text-white flex items-center justify-center rounded-md">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  {user && (
                    <Modal
                      modalConfirmFunction={handleLogout}
                      modalText={
                        <div className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200 w-full">
                          <FaSignOutAlt className="text-sm" />
                          <span>Logout</span>
                        </div>
                      }
                      modalId="logout_modal"
                      modalTitle="Are you sure you want log out ?"
                      modalConfirmText="log out"
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.nav
          className="fixed top-0 left-0 right-0 shadow-md bg-white h-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: scrollPosition > 130 ? 1 : 0,
            y: scrollPosition > 130 ? 0 : -30,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            damping: 15,
            stiffness: 500,
          }}
        >
          <div className="container m-auto flex items-center h-full navbar_btn">
            <div className="flex-1">
              <Link to="/">
                <div className="navbar_logo text-3xl font-bold tracking-wider text-orange-500">Serag</div>
              </Link>
            </div>
            <div className="flex items-center gap-8">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <span className="relative flex items-center justify-center">
                    <FaShoppingCart className="text-2xl hover:text-primary" />
                    {cartCount > 0 && (
                      <span className="absolute text-xs top-[-15px] right-[-15px] w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </span>
                </label>
                <div
                  tabIndex={0}
                  className="z-[1] card card-compact dropdown-content w-60 shadow bg-white rounded-md mt-8 overflow-y-auto max-h-[80vh]"
                >
                  <div className="card-body">
                    {cartCount > 0 && (
                      <span className="font-medium text-lg">
                        {cartCount} Items
                      </span>
                    )}
                    {cart.length < 1
                      ? "No products in your cart"
                      : cart.map((item) => (
                          <div
                            className="flex flex-col gap-1 border-b py-1"
                            key={item.id}
                          >
                            <div className="w-8 h-8">
                              <img src={item.image} alt="product_image" />
                            </div>
                            <h5 className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                              {item.title}
                            </h5>
                            <div className="flex items-center gap-2 justify-between">
                              <div className="flex items-center gap-2">
                                <span className="cart_item_price">
                                  {item.quantity}
                                </span>
                                <small>x</small>
                                <b className="cart_item_price_total">
                                  {item.price}
                                </b>
                              </div>
                              <b>{item.quantity * item.price}</b>
                            </div>
                          </div>
                        ))}
                    {totalCart > 0 && (
                      <span className="flex items-center justify-between mt-4">
                        <span className="font-semibold">Subtotal:</span>{" "}
                        <b className="text-primary">{totalCart.toFixed(2)}</b>
                      </span>
                    )}
                    {totalCart > 0 && (
                      <Link
                        to="/cart"
                        className="bg-primary hover:bg-primaryHover text-white py-2 px-6 m-auto rounded-md mt-4"
                      >
                        View cart
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full">
                    {user && user.photoURL ? (
                      <img alt="user" src={user.photoURL} />
                    ) : (
                      <img alt="default" src={userImage} />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-5 z-[1] p-2 shadow rounded-md w-52 bg-white"
                >
                  {!user && (
                    <Link
                      to="/login"
                      className="bg-primary hover:bg-primaryHover text-sm text-white py-2 px-6 m-auto block my-2 rounded-md w-fit"
                    >
                      SIGN IN
                    </Link>
                  )}
                  <Link
                    to="/user"
                    className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200"
                  >
                    <FaUser className="text-sm" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200"
                  >
                    <FaHeart className="text-sm" />
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="text-xs w-5 h-5 bg-primary text-white flex items-center justify-center rounded-md">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  {user && (
                    <Modal
                      modalConfirmFunction={handleLogout}
                      modalText={
                        <div className="p-1 flex items-center gap-2 rounded-md hover:bg-gray-200 w-full">
                          <FaSignOutAlt className="text-sm" />
                          <span>Logout</span>
                        </div>
                      }
                      modalId="logout_modal"
                      modalTitle="Are you sure you want log out ?"
                      modalConfirmText="log out"
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;
