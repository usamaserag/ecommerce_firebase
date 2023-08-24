import React, { useContext } from "react";
import { StateContext } from "../App";

const Wishlist = () => {
  const { wishlist } = useContext(StateContext);

  return <div className="content">
    {
      wishlist.map((item) => (
        <div>
          <h3>{item.title}</h3>
        </div>
      ))
    }
  </div>;
};

export default Wishlist;
