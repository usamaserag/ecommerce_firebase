import React from "react";

const TotalCart = ({ totalCart }) => {
  return (
    <div className="md:col-span-1 sm:col-span-2 col-span-4 shadow-xl bg-white p-4 rounded-lg h-fit">
      <div className="">
        <h2 className="text-center font-medium text-base">CART SUMMARY</h2>
        <p className="flex items-center justify-between my-4">
          <span>Subtotal:</span>
          <span className="font-semibold">{totalCart}</span>
        </p>
        <div className="card-actions">
          <button className="bg-primary text-white w-full p-2 rounded-md">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default TotalCart;
