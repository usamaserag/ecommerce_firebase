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
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import NavWrapper from "./components/NavWrapper.jsx";
import TopSmallNavbar from "./components/TopSmallNavbar.jsx"

import firebase from "./firebase";
import ForgetPassword from "./pages/ForgetPassword";
import Loading from "./components/Loading";

export const StateContext = createContext(null);

const App = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const userId = user?.uid;
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("darkMode") === "true"
  );
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    // get all categories from API
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const updatedData = data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setProducts(updatedData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      const storedWishlist =
        sessionStorage.getItem(`wishlist_${userId}`) || "[]";
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
      const storedCart = sessionStorage.getItem(`cart_${userId}`) || "[]";
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
      setWishlistCount(wishlist.length);
      sessionStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
      setCartCount(cart.length);
    }
    const totalCartValue = cart.reduce((acc, val) => {
      acc += val.price * val.quantity;
      return acc;
    }, 0);
    setTotalCart(totalCartValue);
  }, [wishlist, setWishlistCount, userId, cart]);

  useEffect(() => {
    sessionStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToWishlist = (product, added) => {
    if (added) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    } else {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((product_) => product_.id !== product.id)
      );
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const handleDeleteCartItem = (productId) => {
    const updatedCartItems = cart.filter((item) => item.id !== productId);
    setCart(updatedCartItems);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <div className={darkMode ? "dark-mode full_page" : "full_page"}>
        <Loading />
      </div>
    );
  }

  return (
    <StateContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        products,
        categories,
        handleFilter,
        filteredProducts,
        selectedCategory,
        userId,
        user,
        cartCount,
        setCartCount,
        wishlist,
        cart,
        totalCart,
        setCart,
        setWishlist,
        wishlistCount,
        setWishlistCount,
        addToWishlist,
        addToCart,
        handleRemoveFromCart,
        handleDeleteCartItem,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <Router>
          <div
            className={
              !darkMode
                ? "full_page bg-gray-200"
                : "full_page bg-gray-200"
            }
          >
            <div className="min-h-screen">
              <NavWrapper children={<div><TopSmallNavbar /><Navbar /></div>} />

              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/wishlist"
                  element={user ? <Wishlist /> : <Navigate to="/login" />}
                />
                <Route
                  path="/user"
                  element={user ? <Profile /> : <Navigate to="/login" />}
                />

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
