import React, { useState, useEffect } from "react";
import Product from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);



  const addToWishlist = (product, added) => {
    if (added) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    } else {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((product_) => product_.id !== product.id)
      );
    }
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="cards_container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
