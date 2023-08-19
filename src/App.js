import React, { useState, useEffect, createContext } from "react";
import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./firebase";
import ForgetPassword from "./pages/ForgetPassword";
import Loading from "./components/Loading";

export const StateContext = createContext(null);

const App = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div className={darkMode ? "dark-mode full_page" : "full_page"}>
        <Loading />
      </div>
    );
  }

  return (
    <StateContext.Provider value={{ user, cartCount, setCartCount, wishlistCount, setWishlistCount }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <Router>

          <div className={darkMode ? "dark-mode full_page" : "full_page"}>
            <div className="container">
              {user && (
                <Navbar
                  changeColors={toggleDarkMode}
                  darkMode={darkMode}
                />
              )}
              <Routes>
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/"
                  element={user ? <Products /> : <Navigate to="/login" />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ConfigProvider>
    </StateContext.Provider>
  );
};

export default App;
