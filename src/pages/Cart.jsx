import React, { useContext } from "react";
import { StateContext } from "../App";

const Cart = () => {
  const { cart } = useContext(StateContext);

  return (
    <div className="content">
      {cart.length < 1
        ? "No products in your cart"
        : cart.map((item) => (
            <div className="flex items-center gap-2 border-b py-2 border-primary" key={item.id}>
              <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center">
                <div className="w-14 h-14">
                  <img src={item.image} alt="product_image" />
                </div>
              </div>
              <div>
                <h5 className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">{item.title}</h5>
                <p className="cart_item_price">{Math.floor(item.price)}</p>
                <b className="cart_item_price_total">
                  {item.quantity * Math.floor(item.price)}
                </b>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Cart;
