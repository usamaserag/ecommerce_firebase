import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../App";
import StarRating from "../components/StarRating";
import Loading from "../components/Loading";
import { FaShoppingCart } from "react-icons/fa";
import QuantityButton from "../components/QuantityButton";
import Breadcrumbs from "../components/Breadcrumbs"

const ProductPage = () => {
  const { addToCart, handleRemoveFromCart, products, cart } = useContext(StateContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const itemSelected = products.find(item => parseInt(item.id) === parseInt(id));
    const cartItem = cart.find(item => item.id === itemSelected?.id);
    const updatedProduct = { ...itemSelected, quantity: cartItem?.quantity || 0 };
    setProduct(updatedProduct);
  }, [id, products, cart]);

  useEffect(() => {
    console.log(">>>", product)
  },[product])


  if (!product) {
    return <Loading />;
  }

  return (
    <div className="py-4 container m-auto">
      <Breadcrumbs product={product} />
      <div className="flex items-start gap-4 mt-2">
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white w-60 h-60 border flex items-center justify-center rounded-md">
            <img
              src={product.image}
              alt="product_img"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg">{product.title}</h4>
          <h3 className="text-2xl font-semibold">{product.price}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <StarRating rating={product.rating.rate} />
          {product.quantity > 0 ? (
            <QuantityButton
              productQuantity={product.quantity}
              handleIncrement={() => addToCart(product)}
              handleDecrement={() => handleRemoveFromCart(product.id)}
              isInProductPage={true}
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
