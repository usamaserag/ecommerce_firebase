import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./firebase";

const App = () => {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="page_content">
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user ? <Products /> : <Navigate to="/login" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
