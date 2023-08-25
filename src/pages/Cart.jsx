import React, { useContext } from "react";
import { StateContext } from "../App";

const Cart = () => {
  const { cart } = useContext(StateContext);

  return (
    <div className="content">
      {cart.map((item) => (
        <div className="cart_item">
          <h5>{item.title}</h5>
          <p className="cart_item_price">{item.price}</p>
          <b className="cart_item_price_total">{item.quantity * item.price}</b>
        </div>
      ))}
    </div>
  );
};

export default Cart;
