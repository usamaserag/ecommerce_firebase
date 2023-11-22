import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const QuantityButton = ({
  productQuantity,
  handleIncrement,
  handleDecrement,
  isInProductPage,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {isInProductPage ? (
          <button
            className="md:p-2 p-1 rounded-md bg-primary text-white"
            onClick={handleDecrement}
          >
            <FaMinus className="text-sm" />
          </button>
        ) : (
          <button
            disabled={productQuantity === 1}
            className={`md:p-2 p-1 rounded-md ${
              productQuantity === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white"
            }`}
            onClick={handleDecrement}
          >
            <FaMinus className="text-sm" />
          </button>
        )}

        <span className="w-6 text-center">{productQuantity}</span>
        <button
          className="bg-primary text-white md:p-2 p-1 rounded-md"
          onClick={handleIncrement}
        >
          <FaPlus className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
