import React, { useContext } from "react";
import { StateContext } from "../App";

const Cart = () => {
  const { cart } = useContext(StateContext);

  return (
    <div className="content">
      {cart.length < 1
        ? "No products in your cart"
        : cart.map((item) => (
            <div className="cart_item" key={item.id}>
              <h5>{item.title}</h5>
              <p className="cart_item_price">{Math.floor(item.price)}</p>
              <b className="cart_item_price_total">
                {item.quantity * Math.floor(item.price)}
              </b>
            </div>
          ))}
    </div>
  );
};

export default Cart;
