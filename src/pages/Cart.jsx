import React, { useContext } from "react";
import { StateContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Modal from "../components/Modal";
import QuantityButton from "../components/QuantityButton";

const Cart = () => {
  const { cart, handleDeleteCartItem, addToCart, handleRemoveFromCart } =
    useContext(StateContext);

  return (
    <div className="content">
      <AnimatePresence>
        {cart.length === 0 ? (
          <p>No products in your cart</p>
        ) : (
          cart.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              key={item.id}
            >
              <div
                className={`flex items-center gap-4 py-2 border-primary ${
                  index < cart.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center flex-none">
                  <div className="w-14 h-14">
                    <img src={item.image} alt="product_image" />
                  </div>
                </div>
                <div className="h-20 flex flex-col justify-around max-w-[200px] w-full">
                  <h5 className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="cart_item_price">{item.quantity}</span>
                      <small>x</small>
                      <b className="cart_item_price_total">{item.price}</b>
                    </div>
                    <b>{item.quantity * item.price}</b>
                  </div>
                </div>
                <QuantityButton
                  productQuantity={item.quantity}
                  handleIncrement={() => addToCart(item)}
                  handleDecrement={() => handleRemoveFromCart(item.id)}
                />
                <Modal
                  modalText={
                    <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center justify-self-end">
                      <FaTimes />
                    </span>
                  }
                  modalId={`remove_cart_item${item.id}`}
                  modalTitle="Are you sure delete this item from your cart ?"
                  modalConfirmFunction={() => handleDeleteCartItem(item.id)}
                  modalConfirmText="Delete"
                />
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
