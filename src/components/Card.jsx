import React, { useState, useContext } from "react";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { StateContext } from "../App";
import Button from "../components/Button";

const Card = () => {
  const { cartCount, setCartCount, wishlistCount, setWishlistCount } =
    useContext(StateContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDecreaseCart = () => {
    if (cartCount === 0) {
      return;
    } else {
      setCartCount(cartCount - 1);
    }
  };

  const handleWishlist = () => {
    if (!isFavorite) {
      setWishlistCount(wishlistCount + 1);
      setIsFavorite(!isFavorite);
    } else {
      setWishlistCount(wishlistCount - 1);
      setIsFavorite(!isFavorite);
    }
  };
  return (
    <div className="card">
      <h4>Product</h4>
      <div>
        <Button
          text={<FaPlus />}
          handleClick={() => setCartCount(cartCount + 1)}
        />
        <Button text={<FaMinus />} handleClick={() => handleDecreaseCart()} />
        <Button
          text={<FaHeart className={`${!isFavorite ? "" : "coloredHeart"}`} />}
          handleClick={() => handleWishlist()}
        />
      </div>
    </div>
  );
};

export default Card;
