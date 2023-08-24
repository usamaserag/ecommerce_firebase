import React, { useContext } from "react";
import Product from "../components/Product";
import { StateContext } from "../App";

const Products = () => {
  const { products } = useContext(StateContext);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className="cards_container">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
