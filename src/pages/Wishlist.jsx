import React, { useContext } from "react";
import { StateContext } from "../App";

const Wishlist = () => {
  const { wishlist } = useContext(StateContext);

  return (
    <div className="content">
      {wishlist.length < 1
        ? "No products in your wishlist"
        : wishlist.map((item) => (
            <div>
              <h5>{item.title}</h5>
              <p>{item.price}</p>
            </div>
          ))}
    </div>
  );
};

export default Wishlist;
