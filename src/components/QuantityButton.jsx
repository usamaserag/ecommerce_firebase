import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const QuantityButton = ({
  productQuantity,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 border border-primary p-2">
        <button onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span className="w-6 text-center">{productQuantity}</span>
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
