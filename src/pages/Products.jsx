import React, { useState, useEffect } from "react";
import Product from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  if (products.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="content">
      <div className="cards_container">
        {products.map((product) => (
          <Product key={product.id} product={product} products={products} />
        ))}
      </div>
    </div>
  );
};

export default Products;
