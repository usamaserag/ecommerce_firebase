import React, { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
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

const App = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    // You can also add additional logic here to update any other parts of your app when the mode changes.
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
                user={user}
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
            </Routes>
          </div>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;
