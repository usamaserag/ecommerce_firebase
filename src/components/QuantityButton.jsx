import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const QuantityButton = ({
  productQuantity,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          disabled={productQuantity === 1}
          className={`p-2 rounded-md ${
            productQuantity === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          onClick={handleDecrement}
        >
          <FaMinus />
        </button>
        <span className="w-6 text-center">{productQuantity}</span>
        <button
          className="bg-primary text-white p-2 rounded-md"
          onClick={handleIncrement}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
