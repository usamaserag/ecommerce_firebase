import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../App";
import StarRating from "../components/StarRating";
import Loading from "../components/Loading";
import { FaShoppingCart } from "react-icons/fa";
import QuantityButton from "../components/QuantityButton";

const ProductPage = () => {
  const { addToCart, handleRemoveFromCart, products } = useContext(StateContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const itemSelected = products.find(item => parseInt(item.id) === parseInt(id))
    setProduct(itemSelected)
  }, [id, products])

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="py-4 container m-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 col-span-1">
          <div className="p-4 bg-white h-80 border border-primary flex items-center justify-center rounded-xl">
            <img
              src={product.image}
              alt="product_img"
              className="h-full w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 col-span-2">
          <h4 className="text-lg">{product.title}</h4>
          <h3 className="text-2xl font-semibold">{product.price}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <StarRating rating={product.rating.rate} />
          {product.quantity > 0 ? (
            <QuantityButton
              productQuantity={product.quantity}
              handleIncrement={() => addToCart(product)}
              handleDecrement={() => handleRemoveFromCart(product.id)}
            />
          ) : (
            <button onClick={() => addToCart(product)} className="bg-primary hover:bg-primaryHover text-white py-3 rounded-md flex items-center justify-center gap-2">
              <FaShoppingCart className="text-xl" />
              <span>ADD TO CART</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
