import React, { useEffect, useState, useContext } from "react";
// import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { FaHeart, FaPlus, FaMinus, FaRegHeart } from "react-icons/fa";
import Button from "./Button";
import { StateContext } from "../App";

const Product = ({ product }) => {
  const {
    addToWishlist,
    addToCart,
    handleRemoveFromCart,
    wishlist,
    cart,
    userId,
  } = useContext(StateContext);
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
    setIsInWishlist(true);
    addToCart(product);
  };

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product rounded-md bg-white transition-all duration-200 ease-in shadow-sm hover:shadow-cardShadow">
      <Link to={`/product/${product.id}`}>
        <div className="product_img_container rounded-md">
          <div className="w-20 h-20 m-auto">
            <img
              src={product.image}
              alt="product_img"
              className="object-contain"
            />
          </div>
        </div>
      </Link>
      <h4 className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">{product.title}</h4>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full text-xs">{product.description}</p>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{product.price}</h3>
        {isInWishlist ? (
          <Button
            text={<FaHeart className="text-primary text-lg" />}
            handleClick={toggleWishlist}
          />
        ) : (
          <Button
            text={<FaRegHeart className="text-gray-400 text-lg" />}
            handleClick={toggleWishlist}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button text={<FaPlus />} handleClick={handleAddToCart} />
        {cartQuantity >= 1 && <p>{cartQuantity}</p>}
        {isInCart && (
          <Button
            text={<FaMinus />}
            handleClick={() => handleRemoveFromCart(product.id)}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
