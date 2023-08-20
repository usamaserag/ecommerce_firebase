import React, { useState, useEffect, useContext } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { StateContext } from "../App";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import Button from "./Button";

const Product = ({ product }) => {
    const { setWishlistCount } =
    useContext(StateContext);
  const localStorageKeyWishlist = `wishlist_${product.id}`;
  //   const localStorageKeyCart = `cart_${id}`;

  const [isInWishlist, setIsInWishlist] = useState(
    localStorage.getItem(localStorageKeyWishlist) === "true"
  );
  //   const [isInCart, setIsInCart] = useState(
  //     localStorage.getItem(localStorageKeyCart) === 'true'
  //   );

  useEffect(() => {
    localStorage.setItem(localStorageKeyWishlist, isInWishlist);
    //   localStorage.setItem(localStorageKeyCart, isInCart);
  }, [isInWishlist, localStorageKeyWishlist]);

  const toggleWishlist = () => {
    setIsInWishlist((prevState) => !prevState);
    setWishlistCount((prevCount) =>
      isInWishlist ? prevCount - 1 : prevCount + 1
    );
  };

  //   const toggleCart = () => {
  //     setIsInCart(prevState => !prevState);
  //   };

  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <div className="product_img">
          <img src={product.image} alt="product_img" />
        </div>
      </Link>
      <h4 className="product_title">{product.title}</h4>
      <p className="product_description">{product.description}</p>
      <h3 className="product_price">{product.price}</h3>
      <StarRating rating={product.rating.rate} />
      <Button
        text={<FaHeart className={`${!isInWishlist ? "" : "coloredHeart"}`} />}
        handleClick={() => toggleWishlist()}
      />
    </div>
  );
};

export default Product;
