import React, { useContext } from "react";
import { StateContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../components/Modal";
import QuantityButton from "../components/QuantityButton";
import TotalCart from "../components/TotalCart";
import emptyCart from "../assets/images/empty_cart.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    handleDeleteCartItem,
    addToCart,
    handleRemoveFromCart,
    totalCart,
  } = useContext(StateContext);

  return (
    <div className="container m-auto py-4">
      <div className={`${cart.length > 0 && "grid grid-cols-4 gap-4"}`}>
        <div className="md:col-span-3 col-span-4">
          <AnimatePresence>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24">
                  <img src={emptyCart} alt="empty_cart" className="object-contain" />
                </div>
                <p>Your cart is empty!</p>
                <small>
                  Browse our categories and discover our best deals!
                </small>
                <Link
                  to="/"
                  className="bg-primary hover:bg-primaryHover text-white py-2 px-6 m-auto rounded-md mt-4"
                >
                  START SHOPPING
                </Link>
              </div>
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
                    className={`flex flex-wrap gap-2 items-center justify-between p-2 border-primary ${
                      index < cart.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="md:w-20 md:h-20 w-14 h-14 bg-white rounded-md flex items-center justify-center flex-none">
                      <img
                        className="md:w-14 md:h-14 w-10 h-10"
                        src={item.image}
                        alt="product_image"
                      />
                    </div>
                    <div className="h-20 flex flex-col justify-around max-w-[200px] w-full">
                      <h5 className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {item.title}
                      </h5>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <span className="cart_item_price">
                            {item.quantity}
                          </span>
                          <small>x</small>
                          <b className="cart_item_price_total">{item.price}</b>
                        </div>
                        <b className="md:hidden block">
                          {item.quantity * item.price}
                        </b>
                      </div>
                    </div>
                    <b className="md:block hidden">
                      {item.quantity * item.price}
                    </b>

                      <QuantityButton
                        productQuantity={item.quantity}
                        handleIncrement={() => addToCart(item)}
                        handleDecrement={() => handleRemoveFromCart(item.id)}
                      />

                    <Modal
                      modalText={
                        <span className="bg-red-500 text-white p-2 text-sm rounded-md flex items-center justify-center gap-2">
                          <FaRegTrashAlt className="text-xs" />
                          <span className="md:block hidden text-xs">REMOVE</span>
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
        {totalCart > 0 && <TotalCart totalCart={totalCart.toFixed(2)} />}
      </div>
    </div>
  );
};

export default Cart;
