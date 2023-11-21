import React, { useContext } from "react";
import Product from "../components/Product";
import { StateContext } from "../App";
import Loading from "../components/Loading";

const Products = () => {
  const { products, filteredProducts } = useContext(StateContext);

  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container m-auto py-4">
      <div className="cards_container">
        {filteredProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
