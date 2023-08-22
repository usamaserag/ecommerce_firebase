import React, { useEffect, useState, useContext } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Button from "./Button";
import { StateContext } from "../App";


const Product = ({ product, wishlist, addToWishlist }) => {
  const { setWishlistCount } = useContext(StateContext);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
    setWishlistCount(JSON.parse(localStorage.getItem("wishlist")).length)
  }, [wishlist, product, setWishlistCount]);

  const toggleWishlist = () => {
    const updatedWishlist = !isInWishlist;
    setIsInWishlist(updatedWishlist);
    addToWishlist(product, updatedWishlist);
  };

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
        text={<FaHeart className={`${isInWishlist ? "coloredHeart" : ""}`} />}
        handleClick={toggleWishlist}
      />
    </div>
  );
};

export default Product;