import React, { useEffect, useState, useContext } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import Button from "./Button";
import { StateContext } from "../App";

const Product = ({ product }) => {
  const { addToWishlist, addToCart, handleRemoveFromCart, wishlist, cart, userId } =
    useContext(StateContext);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  );
  const [isInCart, setIsInCart] = useState(
    cart.some((item_) => item_.id === product.id)
  );

  useEffect(() => {
    if (userId) {
      setIsInWishlist(wishlist.some((item) => item.id === product.id));
      setIsInCart(cart.some((item_) => item_.id === product.id));
    }
  }, [wishlist, product, userId, cart]);

  const toggleWishlist = () => {
    const updatedWishlist = !isInWishlist;
    setIsInWishlist(updatedWishlist);
    addToWishlist(product, updatedWishlist);
  };


  const handleAddToCart = () => {
    setIsInWishlist(true)
    addToCart(product);
  };

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <div className="product_img_container">
          <div className="product_img">
            <img src={product.image} alt="product_img" />
          </div>
        </div>
      </Link>
      <h4 className="product_title">{product.title}</h4>
      <p className="product_description">{product.description}</p>
      <h3 className="product_price">{product.price}</h3>
      <StarRating rating={product.rating.rate} />
      <Button
        text={<FaHeart className={`${isInWishlist ? "coloredHeart heart_icon" : "heart_icon"}`} />}
        handleClick={toggleWishlist}
      />
      <div className="cart_btns_container">
        <Button text={<FaPlus />} handleClick={handleAddToCart} />
        {cartQuantity >= 1 && <p>{cartQuantity}</p>}
        {isInCart && <Button text={<FaMinus />} handleClick={() => handleRemoveFromCart(product.id)} />}
      </div>
    </div>
  );
};

export default Product;
